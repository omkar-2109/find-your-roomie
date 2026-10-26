-- ==============================================================================
-- ROOMZY SUPABASE DATABASE & STORAGE SCHEMA
-- Project: knpcnaanzirifithdgbj
-- Run this script in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/knpcnaanzirifithdgbj/sql/new
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PUBLIC PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  role TEXT NOT NULL DEFAULT 'tenant' CHECK (role IN ('tenant', 'host', 'admin')),
  company TEXT,
  city TEXT DEFAULT 'Bengaluru',
  is_aadhaar_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role, avatar_url, company, city)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), 'Roomzy Resident'),
    NEW.email,
    COALESCE(NEW.phone, NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'tenant'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'),
    COALESCE(NEW.raw_user_meta_data->>'company', 'Verified Resident'),
    COALESCE(NEW.raw_user_meta_data->>'city', 'Bengaluru')
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    role = EXCLUDED.role,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. PROPERTY LISTINGS TABLE
CREATE TABLE IF NOT EXISTS public.listings (
  id TEXT PRIMARY KEY DEFAULT ('listing-' || floor(extract(epoch from now()) * 1000)::text),
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL CHECK (category IN ('rooms', 'flatmates', 'wanted', 'groups', 'flats', 'pgs')),
  city TEXT NOT NULL CHECK (city IN ('Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad')),
  locality TEXT NOT NULL,
  landmark TEXT,
  coordinates JSONB DEFAULT '{"x": 50, "y": 50}'::jsonb,
  photos TEXT[] NOT NULL DEFAULT '{}',
  costs JSONB NOT NULL DEFAULT '{"rent": 15000, "deposit": 30000, "maintenance": 1500, "utilitiesEstimate": 1000, "brokerage": 0}'::jsonb,
  available_from TEXT DEFAULT 'Immediately',
  furnishing TEXT DEFAULT 'Fully Furnished',
  bhk TEXT DEFAULT '2 BHK',
  amenities TEXT[] DEFAULT '{}',
  preferences JSONB DEFAULT '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  host_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  host_info JSONB NOT NULL DEFAULT '{"name": "Property Host", "role": "Owner", "verifiedGovtId": true, "verificationBadge": "Verified Property Owner"}'::jsonb,
  compatibility_score INTEGER DEFAULT 90,
  description TEXT,
  house_rules TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'pending', 'rented', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast geo and category filtering
CREATE INDEX IF NOT EXISTS idx_listings_city ON public.listings(city);
CREATE INDEX IF NOT EXISTS idx_listings_category ON public.listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);

-- 4. SCHEDULED VISITS TABLE
CREATE TABLE IF NOT EXISTS public.scheduled_visits (
  id TEXT PRIMARY KEY DEFAULT ('vis-' || floor(extract(epoch from now()) * 1000)::text),
  listing_id TEXT REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_email TEXT,
  date TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  visit_type TEXT DEFAULT 'In-Person',
  status TEXT DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Completed', 'Cancelled', 'Rescheduled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INQUIRIES & LEAD MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT ('inq-' || floor(extract(epoch from now()) * 1000)::text),
  listing_id TEXT REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_email TEXT,
  message TEXT,
  move_in_date TEXT,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read basic profile info; user can update their own profile
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Listings: Everyone can view active listings
CREATE POLICY "Active listings are viewable by everyone" 
  ON public.listings FOR SELECT 
  USING (status = 'active');

CREATE POLICY "Authenticated users can create listings" 
  ON public.listings FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Hosts can update their own listings" 
  ON public.listings FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = host_id OR host_id IS NULL);

CREATE POLICY "Hosts can delete their own listings" 
  ON public.listings FOR DELETE 
  TO authenticated 
  USING (auth.uid() = host_id OR host_id IS NULL);

-- Scheduled Visits: Users can view their own visits; hosts can view visits for their listings
CREATE POLICY "Users can view their visits" 
  ON public.scheduled_visits FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can schedule visits" 
  ON public.scheduled_visits FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Inquiries: Users can insert inquiries and view their inquiries
CREATE POLICY "Users can view their inquiries" 
  ON public.inquiries FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit inquiries" 
  ON public.inquiries FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- 7. STORAGE BUCKET CONFIGURATION (roomzy-media)
-- Insert public bucket 'roomzy-media' into storage.buckets if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'roomzy-media',
  'roomzy-media',
  true,
  10485760, -- 10MB per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

-- Storage Policies: Public read access
CREATE POLICY "Public Access to roomzy-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'roomzy-media');

-- Storage Policies: Authenticated users can upload to roomzy-media
CREATE POLICY "Authenticated users can upload to roomzy-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'roomzy-media');

CREATE POLICY "Users can update and delete their own uploads"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'roomzy-media' AND (auth.uid())::text = (storage.foldername(name))[2]);
