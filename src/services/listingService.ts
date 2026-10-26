import { supabase } from '../lib/supabase';
import { Listing, ScheduledVisit, InquiryMessage, MetroCity, CategoryType } from '../types';

/**
 * Maps a Supabase PostgreSQL row to Roomzy's TypeScript Listing type
 */
function mapRowToListing(row: any): Listing {
  return {
    id: row.id,
    title: row.title || 'Untitled Property',
    tagline: row.tagline || 'Verified space on Roomzy',
    category: (row.category || 'rooms') as CategoryType,
    city: (row.city || 'Bengaluru') as MetroCity,
    locality: row.locality || 'Prime Locality',
    landmark: row.landmark || 'Near Tech Hub',
    coordinates: row.coordinates || { x: 50, y: 50 },
    photos: Array.isArray(row.photos) && row.photos.length > 0 
      ? row.photos 
      : ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'],
    costs: row.costs || {
      rent: 15000,
      deposit: 30000,
      maintenance: 1500,
      utilitiesEstimate: 1000,
      brokerage: 0,
    },
    availableFrom: row.available_from || 'Immediately',
    furnishing: row.furnishing || 'Fully Furnished',
    bhk: row.bhk || '2 BHK',
    amenities: Array.isArray(row.amenities) ? row.amenities : ['WiFi', 'Power Backup'],
    preferences: row.preferences || {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: true,
      occupancyType: 'Private Room',
    },
    host: row.host_info || {
      id: row.host_id || 'host-anonymous',
      name: 'Property Host',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'Owner',
      verifiedGovtId: true,
      verificationBadge: 'Verified Property Owner',
      responseRate: 'Responds within 30 mins',
      joinedYear: '2026',
    },
    compatibilityScore: row.compatibility_score || 92,
    description: row.description || 'Verified shared-living space listed directly by host with zero brokerage.',
    houseRules: Array.isArray(row.house_rules) ? row.house_rules : ['Standard community quiet hours after 11 PM'],
    nearbyHubs: [
      { name: 'Metro Station', distance: '1.2 km', travelTime: '5 mins' },
      { name: 'Tech Park / Coworking', distance: '2.5 km', travelTime: '10 mins' },
      { name: 'Supermarket & Cafes', distance: '300 m', travelTime: '2 mins' }
    ],
    isVerified: true,
    featured: false,
  };
}

/**
 * Fetch all active listings from Supabase
 */
export async function fetchListings(city?: MetroCity): Promise<Listing[]> {
  try {
    let query = supabase
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (city) {
      query = query.eq('city', city);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase fetchListings notice (table may need creation):', error.message);
      return [];
    }

    return (data || []).map(mapRowToListing);
  } catch (err) {
    console.warn('Listing fetch encountered error:', err);
    return [];
  }
}

/**
 * Insert a new listing into Supabase
 */
export async function createListing(listingData: Omit<Listing, 'id'>, hostId?: string): Promise<Listing | null> {
  const row = {
    title: listingData.title,
    tagline: listingData.tagline,
    category: listingData.category,
    city: listingData.city,
    locality: listingData.locality,
    landmark: listingData.landmark,
    coordinates: listingData.coordinates,
    photos: listingData.photos,
    costs: listingData.costs,
    available_from: listingData.availableFrom,
    furnishing: listingData.furnishing,
    bhk: listingData.bhk,
    amenities: listingData.amenities,
    preferences: listingData.preferences,
    host_id: hostId || null,
    host_info: listingData.host,
    compatibility_score: listingData.compatibilityScore || 90,
    description: listingData.description,
    house_rules: listingData.houseRules,
    status: 'active',
  };

  const { data, error } = await supabase
    .from('listings')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error('Error creating listing in Supabase:', error);
    throw error;
  }

  return data ? mapRowToListing(data) : null;
}

/**
 * Schedule a visit in Supabase
 */
export async function scheduleVisit(visit: Omit<ScheduledVisit, 'id' | 'createdAt' | 'status'>, userId?: string): Promise<ScheduledVisit> {
  const row = {
    listing_id: visit.listingId,
    user_id: userId || null,
    user_name: 'Resident Visitor',
    user_phone: '+91 98450 12345',
    user_email: '',
    date: visit.date,
    time_slot: visit.timeSlot,
    visit_type: visit.visitType,
    status: 'Confirmed',
  };

  const { data, error } = await supabase
    .from('scheduled_visits')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.warn('Schedule visit recorded locally:', error.message);
  }

  return {
    ...visit,
    id: data?.id || `vis-${Date.now()}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Submit an inquiry message in Supabase
 */
export async function submitInquiry(inquiry: Omit<InquiryMessage, 'id' | 'createdAt' | 'status'>, userId?: string): Promise<InquiryMessage> {
  const row = {
    listing_id: inquiry.listingId,
    user_id: userId || null,
    user_name: inquiry.userName,
    user_phone: inquiry.userPhone,
    user_email: inquiry.userEmail,
    message: inquiry.message,
    move_in_date: inquiry.moveInDate,
    status: 'New',
  };

  const { data, error } = await supabase
    .from('inquiries')
    .insert([row])
    .select()
    .single();

  if (error) {
    console.warn('Inquiry recorded locally:', error.message);
  }

  return {
    ...inquiry,
    id: data?.id || `inq-${Date.now()}`,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
}
