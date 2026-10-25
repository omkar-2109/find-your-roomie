import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/marketplace/ListingCard';
import { 
  Search, 
  MapPin, 
  Home, 
  Users, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  IndianRupee, 
  Lock,
  Star,
  Check,
  X,
  Zap,
  Coffee,
  Wifi,
  ChevronRight,
  Tv,
  Refrigerator,
  WashingMachine,
  Microwave,
  Droplets,
  Key,
  FileCheck,
  Award,
  Heart,
  Clock,
  Compass,
  Sliders,
  Globe2,
  Video,
  CheckCheck,
  BadgePercent
} from 'lucide-react';
import { CategoryType, MetroCity } from '../types';
import { INDIAN_METROS } from '../data/mockListings';

// ============================================================================
// GLOBAL-GRADE PLATFORM DATA CONSTANTS
// ============================================================================

interface ComparisonRow {
  feature: string;
  traditional: string;
  roomzy: string;
  highlight: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Brokerage Fee',
    traditional: '1 to 2 months rent (₹25k - ₹60k lost forever)',
    roomzy: '100% Zero Brokerage (Direct tenant to verified lister)',
    highlight: 'Save ₹35,000+'
  },
  {
    feature: 'Security Deposit',
    traditional: '6 to 10 months lock-in (₹1.5L - ₹3.5L cash tied up)',
    roomzy: 'Standard 1-Month Deposit only',
    highlight: '85% Less Cash'
  },
  {
    feature: 'Furnishing & Appliances',
    traditional: 'Unfurnished or damaged, unverified secondhand appliances',
    roomzy: 'Brand-name Smart TV, Double Door Fridge, Auto Washer & Wi-Fi',
    highlight: 'Move-in Ready'
  },
  {
    feature: 'Roommate Vetting',
    traditional: 'Total strangers assigned by brokers without background checks',
    roomzy: 'Aadhaar KYC + Corporate email verification + Lifestyle matching',
    highlight: '96%+ Match'
  },
  {
    feature: 'Lease Lock-In & Exit',
    traditional: 'Strict 11-month lock-in; heavy forfeiture penalties',
    roomzy: 'Flexible stay with clear 30-day exit notice and instant refund',
    highlight: 'Fair Policy'
  },
  {
    feature: 'Maintenance & Repairs',
    traditional: 'Endless landlord follow-ups; tenants blamed for routine repairs',
    roomzy: 'Dedicated resolution support with SLA within 24 hours',
    highlight: '24hr SLA'
  }
];

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Discover & 3D Walkthrough',
    description: 'Explore verified private rooms, flatmate openings, or co-living spaces with transparent pricing and verified high-res photo galleries.',
    icon: Search,
    pill: 'Zero Brokerage'
  },
  {
    step: '02',
    title: 'Schedule a Visit or Video Tour',
    description: 'Book a free in-person tour or instant live video walkthrough directly with the host at your preferred time slot.',
    icon: Calendar,
    pill: 'Instant Confirmation'
  },
  {
    step: '03',
    title: '5-Minute Digital KYC',
    description: 'Complete masked Aadhaar verification and corporate email authentication securely without physical broker paperwork.',
    icon: FileCheck,
    pill: '100% Paperless'
  },
  {
    step: '04',
    title: 'Move In with Just Your Suitcase',
    description: 'Walk into your spotless room with high-speed 300 Mbps Wi-Fi, fresh bedding, and all appliances active on Day 1.',
    icon: Key,
    pill: 'Luggage Only'
  }
];

const AMENITIES_SHOWCASE = [
  {
    icon: Tv,
    title: '43" 4K Smart TV',
    subtitle: 'Pre-installed OTT streaming apps (Netflix, Prime, Hotstar) for weekend lounge nights',
    highlight: 'Included'
  },
  {
    icon: Refrigerator,
    title: 'Double-Door Refrigerator',
    subtitle: 'Frost-free, high-capacity 260L fridge with designated shelves per flatmate',
    highlight: 'In Every Flat'
  },
  {
    icon: WashingMachine,
    title: 'Fully Automatic Washer',
    subtitle: 'Modern top-load washer with drying area, zero coin-op or laundromat charges',
    highlight: 'Unlimited Use'
  },
  {
    icon: Microwave,
    title: 'Microwave & Induction',
    subtitle: 'Modular kitchen setup with reheat microwave, induction hob & cookware set',
    highlight: 'Ready to Cook'
  },
  {
    icon: Wifi,
    title: '300 Mbps Dedicated Fiber',
    subtitle: 'Dual-band Wi-Fi with UPS battery backup, tailored for seamless WFH and video calls',
    highlight: 'Zero Downtime'
  },
  {
    icon: Sparkles,
    title: 'Weekly Deep Housekeeping',
    subtitle: 'Professional team cleans bathrooms, common lounge, and kitchen surfaces weekly',
    highlight: 'Zero Extra Cost'
  },
  {
    icon: ShieldCheck,
    title: 'Biometric Access & CCTV',
    subtitle: 'Smart digital door locks for main doors with 24/7 common entrance security',
    highlight: 'Triple Security'
  },
  {
    icon: Droplets,
    title: 'RO Water Purifier',
    subtitle: 'Multi-stage RO + UV purification system with scheduled filter replacements',
    highlight: 'Fresh & Pure'
  }
];

interface NeighborhoodCard {
  name: string;
  city: MetroCity;
  tagline: string;
  avgRent: string;
  activeCount: number;
  image: string;
  tags: string[];
  commute: string;
}

const TOP_NEIGHBORHOODS: NeighborhoodCard[] = [
  {
    name: 'Indiranagar',
    city: 'Bengaluru',
    tagline: 'Craft Breweries, 100ft Road Cafes & Metro Greenery',
    avgRent: '₹18,500',
    activeCount: 42,
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    tags: ['Nightlife', '100ft Road', 'Metro Connected'],
    commute: '5 min to 100ft Rd'
  },
  {
    name: 'Koramangala',
    city: 'Bengaluru',
    tagline: 'Startup Capital, Walking to Tech Incubators & Eateries',
    avgRent: '₹16,500',
    activeCount: 58,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    tags: ['Startup Hub', '4th Block', 'Walk to Work'],
    commute: 'Walking to Sony Signal'
  },
  {
    name: 'HSR Layout',
    city: 'Bengaluru',
    tagline: 'Tree-Lined Sectors, Unicorn Offices & Active Fitness Hubs',
    avgRent: '₹15,000',
    activeCount: 49,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    tags: ['Tech Parks', 'Sector 1-7', 'Gyms & Cafes'],
    commute: '12 min to Bellandur'
  },
  {
    name: 'Bandra West',
    city: 'Mumbai',
    tagline: 'Coastal Sea Breeze, Bandstand Promenades & High Street Fashion',
    avgRent: '₹28,000',
    activeCount: 31,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    tags: ['Sea Facing', 'Pali Hill', 'Cafes & Dining'],
    commute: '8 min to Bandstand'
  },
  {
    name: 'Powai',
    city: 'Mumbai',
    tagline: 'Hiranandani Neo-Classical Towers, Lakeside Walkways & Tech Parks',
    avgRent: '₹22,000',
    activeCount: 27,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    tags: ['Hiranandani', 'Powai Lake', 'IT Parks'],
    commute: 'Inside Hiranandani'
  },
  {
    name: 'Gachibowli',
    city: 'Hyderabad',
    tagline: 'Financial District, Cyber Towers Expressway & Luxury High-Rises',
    avgRent: '₹14,000',
    activeCount: 36,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    tags: ['Financial Dist', 'Outer Ring Rd', 'Gated Societies'],
    commute: '10 min to HITEC City'
  },
  {
    name: 'Cyber City / DLF',
    city: 'Delhi-NCR',
    tagline: 'Rapid Metro Line, Fortune 500 Campuses & CyberHub Nightlife',
    avgRent: '₹17,500',
    activeCount: 34,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tags: ['CyberHub', 'Rapid Metro', 'DLF Phase 2'],
    commute: '2 min to Rapid Metro'
  },
  {
    name: 'Viman Nagar',
    city: 'Pune',
    tagline: 'Phoenix Marketcity, EON Free Zone & Cosmopolitan Youth Vibe',
    avgRent: '₹12,500',
    activeCount: 24,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    tags: ['Phoenix Mall', 'EON IT Park', 'Airport Road'],
    commute: '5 min to Phoenix Mall'
  }
];

interface ResidentStory {
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  duration: string;
  quote: string;
  rating: number;
  perk: string;
}

const RESIDENT_STORIES: ResidentStory[] = [
  {
    name: 'Priya Deshmukh',
    role: 'Lead Product Designer',
    company: 'Swiggy',
    location: 'Koramangala, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    duration: 'Resident for 14 months',
    quote: 'Moving from Pune to Bangalore, local brokers demanded ₹2.2 Lakhs as security deposit and 1 month brokerage. On Roomzy, I booked with just 1 month deposit and moved in with my suitcase. Zero brokerage, zero headaches.',
    rating: 5,
    perk: 'Saved ₹1.8L Upfront'
  },
  {
    name: 'Vikramaditya Sen',
    role: 'Staff Software Engineer',
    company: 'Google',
    location: 'Whitefield, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    duration: 'Resident for 8 months',
    quote: 'Find Together is the smartest feature in Indian renting. Two colleagues and I teamed up to lease an expansive 3BHK penthouse in a gated society with pool and gym. We pay ₹21,000 each instead of the ₹38,000 brokers quoted for cramped 1BHKs.',
    rating: 5,
    perk: '40% Lower Rent'
  },
  {
    name: 'Neha Aggarwal',
    role: 'Product Operations Lead',
    company: 'Cred',
    location: 'Indiranagar, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    duration: 'Resident for 11 months',
    quote: 'Lifestyle compatibility matching is surprisingly accurate. I specifically needed a vegetarian, non-smoking flatmate with similar hybrid WFH hours. Roomzy’s 96% match was spot-on. We have lived together for almost a year with zero friction.',
    rating: 5,
    perk: '96% Habit Match'
  },
  {
    name: 'Aditya Nair',
    role: 'Growth Lead',
    company: 'Razorpay',
    location: 'HSR Layout, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    duration: 'Resident for 6 months',
    quote: 'Scheduled a video walkthrough on a Thursday, verified Aadhaar in 3 minutes, and moved in by Saturday. The high-speed 300 Mbps Wi-Fi, double door fridge, and auto washing machine were fully operational on day one.',
    rating: 5,
    perk: 'Move-in within 48 hrs'
  }
];

export const LandingPage: React.FC = () => {
  const { 
    listings, 
    setCurrentView, 
    updateFilter, 
    filters,
    setPersona,
    navigateToListing,
    openAuthModal,
    currentUser
  } = useApp();

  const [heroCity, setHeroCity] = useState<MetroCity>(filters.city);
  const [heroLocality, setHeroLocality] = useState('');
  const [heroCategory, setHeroCategory] = useState<CategoryType | 'all'>('all');
  const [heroBudget, setHeroBudget] = useState('25000');
  const [heroMoveIn, setHeroMoveIn] = useState('any');
  const [featuredTab, setFeaturedTab] = useState<'all' | 'rooms' | 'groups' | 'pgs'>('all');
  
  // Interactive Live Savings Calculator State
  const [calcRent, setCalcRent] = useState<number>(22000);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('city', heroCity);
    if (heroLocality) updateFilter('locality', heroLocality);
    updateFilter('category', heroCategory);
    updateFilter('priceRange', [5000, Number(heroBudget)]);
    setCurrentView('marketplace');
  };

  const handleQuickLocality = (locality: string, city: MetroCity) => {
    updateFilter('city', city);
    updateFilter('locality', locality);
    setCurrentView('marketplace');
  };

  // Filtered listings
  const activeCityListings = listings.filter(l => l.city === filters.city);
  const featuredListings = (activeCityListings.length > 0 ? activeCityListings : listings)
    .filter(l => {
      if (featuredTab === 'all') return l.featured;
      return l.category === featuredTab;
    })
    .slice(0, 3);

  // Roommate profiles
  const roommateListings = listings.filter(l => l.category === 'flatmates' || l.category === 'wanted').slice(0, 3);

  // Curated PGs
  const curatedPGs = listings.filter(l => l.category === 'pgs').slice(0, 3);

  // Savings calculations
  const brokerageLost = calcRent;
  const depositLockedTraditional = calcRent * 10;
  const depositLockedRoomzy = calcRent * 1;
  const upfrontCashSaved = brokerageLost + (depositLockedTraditional - depositLockedRoomzy);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 overflow-hidden bg-dot-grid">
      
      {/* =========================================================================
          1. CINEMATIC HERO & GLOBAL-GRADE FLOATING SEARCH ISLAND
             (Ultra-Luxury Architectural Penthouse Background with Ambient Lighting)
          ========================================================================= */}
      <section className="relative isolate min-h-[640px] lg:min-h-[720px] pt-8 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden rounded-3xl sm:rounded-[40px] bg-[#071913] shadow-2xl border border-emerald-950/40 my-3 sm:my-5">
        
        {/* Cinematic Architectural Background Image with Deep Gradient Vignette */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85" 
            alt="Ultra-luxury modern penthouse living space"
            className="w-full h-full object-cover object-center scale-105 opacity-65"
          />
          {/* Multi-layered cinematic vignette overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071913]/95 via-[#0c261e]/85 to-[#071913]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071913] via-transparent to-[#071913]/60" />
          <div className="absolute inset-0 bg-dot-grid-dark opacity-20" />
          
          {/* Radiant Aurora Mesh Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/25 blur-[140px] rounded-full pointer-events-none animate-pulse-slow" />
          <div className="absolute top-1/4 -right-10 w-96 h-96 bg-amber/25 blur-[130px] rounded-full pointer-events-none animate-float-delayed" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-400/20 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Global-Grade Headline, Trust Pillars & Search */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Beacon Pill */}
            <div className="inline-flex items-center gap-2 glass-dark px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-white/95 shadow-glass border border-white/20 shimmer-pill max-w-full flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-ping" />
              <span className="text-amber-light font-bold">● GLOBAL GRADE MANAGED LIVING</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="text-white hidden sm:inline">100% Zero Brokerage</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span className="text-emerald-300 font-bold hidden sm:inline">1-Month Deposit</span>
            </div>

            {/* Editorial Headline with Gold Gradient */}
            <div className="space-y-3">
              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] drop-shadow-xl">
                Find your space. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300">
                  Find your people.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed pt-1 drop-shadow font-normal">
                Discover furnished rooms, connect with verified flatmates, and team up to rent high-rise flats across India's top tech hubs — with zero broker commission.
              </p>
            </div>

            {/* Global Relocation Badge Pill */}
            <div className="flex items-center gap-2 text-xs text-white/90 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 w-fit">
              <Globe2 className="w-3.5 h-3.5 text-amber-light shrink-0" />
              <span><strong>Expat & Tech Nomad Friendly:</strong> Digital onboarding with foreign visa & zero local guarantor.</span>
            </div>

            {/* Apple-Inspired Luminous Glass Search Island */}
            <div className="glass-hero-island rounded-3xl p-4 sm:p-5 shadow-glass-float border border-white/95">
              <form onSubmit={handleHeroSearch} className="space-y-4">
                
                {/* Upper Search Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* City Selector */}
                  <div className="p-3 rounded-2xl bg-white/90 hover:bg-white transition-all border border-ivory-border focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/15 shadow-xs">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      Metro City
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-forest shrink-0" />
                      <select 
                        value={heroCity}
                        onChange={(e) => setHeroCity(e.target.value as MetroCity)}
                        className="bg-transparent text-sm font-bold text-neutral-900 focus:outline-none w-full cursor-pointer"
                      >
                        {INDIAN_METROS.map(m => (
                          <option key={m.name} value={m.name}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Locality Input */}
                  <div className="p-3 rounded-2xl bg-white/90 hover:bg-white transition-all border border-ivory-border focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/15 shadow-xs">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      Locality / Tech Corridor
                    </label>
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input 
                        type="text"
                        placeholder="e.g. Koramangala, Bandra, HSR"
                        value={heroLocality}
                        onChange={(e) => setHeroLocality(e.target.value)}
                        className="bg-transparent text-sm font-semibold text-neutral-900 focus:outline-none w-full placeholder:text-neutral-400 placeholder:font-normal"
                      />
                    </div>
                  </div>

                  {/* Accommodation Type */}
                  <div className="p-3 rounded-2xl bg-white/90 hover:bg-white transition-all border border-ivory-border focus-within:border-forest/50 focus-within:ring-2 focus-within:ring-forest/15 shadow-xs">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      Living Style
                    </label>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-forest shrink-0" />
                      <select 
                        value={heroCategory}
                        onChange={(e) => setHeroCategory(e.target.value as CategoryType | 'all')}
                        className="bg-transparent text-sm font-bold text-neutral-900 focus:outline-none w-full cursor-pointer"
                      >
                        <option value="all">All Shared Living</option>
                        <option value="rooms">Private Rooms</option>
                        <option value="flatmates">Flatmate Openings</option>
                        <option value="groups">Find Together Teams</option>
                        <option value="pgs">Managed PGs</option>
                        <option value="flats">Whole Flats</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* Lower Row: Budget, Move-in & Submit Action */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  
                  {/* Max Budget */}
                  <div className="sm:col-span-4 p-3 rounded-2xl bg-white/90 hover:bg-white transition-all border border-ivory-border focus-within:border-forest/50 shadow-xs">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      Max Monthly Rent
                    </label>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-forest shrink-0" />
                      <select 
                        value={heroBudget}
                        onChange={(e) => setHeroBudget(e.target.value)}
                        className="bg-transparent text-sm font-bold text-neutral-900 focus:outline-none w-full cursor-pointer"
                      >
                        <option value="15000">Up to ₹15,000/mo</option>
                        <option value="20000">Up to ₹20,000/mo</option>
                        <option value="25000">Up to ₹25,000/mo</option>
                        <option value="35000">Up to ₹35,000/mo</option>
                        <option value="50000">Up to ₹50,000/mo</option>
                        <option value="75000">Flexible / Any</option>
                      </select>
                    </div>
                  </div>

                  {/* Move-in Date Availability */}
                  <div className="sm:col-span-4 p-3 rounded-2xl bg-white/90 hover:bg-white transition-all border border-ivory-border focus-within:border-forest/50 shadow-xs">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">
                      Move-In Window
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-forest shrink-0" />
                      <select 
                        value={heroMoveIn}
                        onChange={(e) => setHeroMoveIn(e.target.value)}
                        className="bg-transparent text-sm font-bold text-neutral-900 focus:outline-none w-full cursor-pointer"
                      >
                        <option value="any">Immediate & Flexible</option>
                        <option value="15days">Within 15 Days</option>
                        <option value="1month">Next 30 Days</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button with Luminous Emerald Gradient & Gold Shimmer */}
                  <div className="sm:col-span-4 flex items-center h-full">
                    <button
                      type="submit"
                      className="w-full h-full min-h-[50px] bg-gradient-to-r from-forest to-forest-light hover:from-forest-light hover:to-forest text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-soft hover:shadow-glow-emerald transition-all hover:scale-[1.02]"
                    >
                      <Search className="w-4 h-4 text-amber-light" />
                      <span>Search 2,400+ Spaces</span>
                    </button>
                  </div>

                </div>

              </form>

              {/* Quick Locality Chips & Find Together Banner */}
              <div className="mt-4 pt-3 border-t border-ivory-border/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-neutral-500 font-semibold text-[11px]">Trending in {heroCity}:</span>
                  {INDIAN_METROS.find(m => m.name === heroCity)?.localities.slice(0, 3).map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleQuickLocality(loc, heroCity)}
                      className="px-2.5 py-0.5 rounded-full bg-white hover:bg-forest-50 hover:text-forest border border-ivory-border text-neutral-700 text-[11px] font-medium transition-colors shadow-2xs"
                    >
                      {loc}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    updateFilter('category', 'groups');
                    setCurrentView('marketplace');
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-hover hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber" />
                  <span>Team up & save 40% on rent →</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Floating Interactive Proof Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
              
              {/* Main Featured Editorial Card with Video/3D Tour Badge */}
              <div 
                onClick={() => navigateToListing('blr-room-1')}
                className="group relative rounded-3xl overflow-hidden shadow-glass-float border border-white/60 aspect-[4/3] bg-neutral-900 cursor-pointer"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                  alt="Verified sunlit apartment in Indiranagar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-transparent" />
                
                {/* 3D Walkthrough Floating Pill */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 glass-panel-subtle bg-black/50 text-white px-3 py-1 rounded-xl text-xs font-semibold border border-white/25">
                  <Video className="w-3.5 h-3.5 text-amber-light animate-pulse" />
                  <span>Interactive 3D Walkthrough</span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-amber text-stone-950 px-2.5 py-1 rounded-xl text-xs font-bold shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-stone-950" />
                  <span>4.92 / 5.0</span>
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-light uppercase tracking-wider block">Verified Room</span>
                    <h4 className="font-display font-bold text-base text-white">Indiranagar 100ft Road Luxury Duplex</h4>
                    <p className="text-xs text-white/80">Attached Balcony • 300 Mbps Fiber • Maid & Cook</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-white/70 block">All inclusive</span>
                    <span className="font-display font-extrabold text-lg text-amber-light">₹18,500<span className="text-xs font-normal text-white/80">/mo</span></span>
                  </div>
                </div>
              </div>

              {/* Floating Social Compatibility Card */}
              <div 
                onClick={() => {
                  updateFilter('category', 'flatmates');
                  setCurrentView('marketplace');
                }}
                className="glass-card-floating rounded-2xl p-4 shadow-glass-float cursor-pointer hover:scale-[1.02] transition-all flex items-center justify-between gap-3 border border-white/90"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                    alt="Priya avatar" 
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-forest/20 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-bold text-xs text-neutral-900">Ananya Deshmukh</h5>
                      <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                        96% Match
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500">Lead Product Designer @ Swiggy</p>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-600 mt-0.5">
                      <span className="text-forest font-semibold">Veg Only</span> • <span>Hybrid WFH</span> • <span>Quiet Hours</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2 border-l border-ivory-border">
                  <span className="text-[9px] text-neutral-400 block">Looking in</span>
                  <span className="font-bold text-xs text-forest">Koramangala</span>
                </div>
              </div>

              {/* Floating Trust Metrics Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-panel p-3 rounded-2xl text-center shadow-xs">
                  <span className="font-display font-extrabold text-lg text-forest block">₹1.8 Cr+</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Brokerage Saved</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl text-center shadow-xs">
                  <span className="font-display font-extrabold text-lg text-forest block">100%</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Verified Homes</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl text-center shadow-xs">
                  <span className="font-display font-extrabold text-lg text-forest block">4.9 ★</span>
                  <span className="text-[10px] text-neutral-500 font-medium">Resident Rating</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. FOUR DISCOVERY CATEGORIES (Apple-Inspired Visual Editorial Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
            Curated Discovery
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
            Choose Your Living Style
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
            Four tailored paths to find the perfect rental experience across India's top tech hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Category 1: Private Rooms */}
          <button
            onClick={() => {
              updateFilter('category', 'rooms');
              setCurrentView('marketplace');
            }}
            className="group glass-luxury rounded-3xl p-6 text-left flex flex-col justify-between hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs border border-forest-100">
                <Home className="w-6 h-6 text-forest" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-forest transition-colors">
                  Private Rooms
                </h3>
                <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                  320+ Rooms
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Move into fully furnished private bedrooms in established flats with verified listers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ivory-border/70 flex items-center justify-between text-xs font-bold text-forest">
              <span>Explore Rooms</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Category 2: Find Flatmates */}
          <button
            onClick={() => {
              updateFilter('category', 'flatmates');
              setCurrentView('marketplace');
            }}
            className="group glass-luxury rounded-3xl p-6 text-left flex flex-col justify-between hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs border border-forest-100">
                <Users className="w-6 h-6 text-forest" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-forest transition-colors">
                  Find Flatmates
                </h3>
                <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                  180+ Profiles
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Connect with verified working professionals with transparent lifestyle habits and schedules.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ivory-border/70 flex items-center justify-between text-xs font-bold text-forest">
              <span>View Flatmates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Category 3: Find Together (Signature Warm Accent) */}
          <button
            onClick={() => {
              updateFilter('category', 'groups');
              setCurrentView('marketplace');
            }}
            className="group glass-luxury rounded-3xl p-6 text-left flex flex-col justify-between hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border-amber/50 bg-gradient-to-b from-amber-soft/40 to-white/90 shadow-glow-amber"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber text-stone-900 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-lg text-stone-900">
                    Find Together
                  </h3>
                  <span className="text-[10px] bg-amber text-stone-950 font-extrabold px-1.5 py-0.2 rounded">
                    NEW
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-amber-hover bg-amber-soft px-2 py-0.5 rounded-full font-bold">
                  Save 40%
                </span>
              </div>
              <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                Team up with compatible flatmates to lease entire luxury flats at 40% lower rent per person.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-amber/30 flex items-center justify-between text-xs font-bold text-stone-900">
              <span>Browse Teams</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-hover" />
            </div>
          </button>

          {/* Category 4: Managed PGs */}
          <button
            onClick={() => {
              updateFilter('category', 'pgs');
              setCurrentView('marketplace');
            }}
            className="group glass-luxury rounded-3xl p-6 text-left flex flex-col justify-between hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs border border-forest-100">
                <Building2 className="w-6 h-6 text-forest" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-forest transition-colors">
                  Managed PGs
                </h3>
                <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                  140+ PGs
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Curated student & executive PGs with 3 home-style meals, daily cleaning & zero lock-ins.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-ivory-border/70 flex items-center justify-between text-xs font-bold text-forest">
              <span>Explore PGs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE SAVINGS CALCULATOR & THE MANAGED LIVING MATRIX
             (Interactive Slider + Traditional vs Roomzy Side-by-Side Matrix)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-glass border border-white/80 relative overflow-hidden">
          
          {/* Subtle Ambient Light Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
              The Managed Living Difference
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
              Why Urban Tenants Choose Roomzy Over Traditional Renting
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
              Rent should be simple, transparent, and dignified. Compare how Roomzy reimagines every frustrating aspect of renting in India's major tech hubs.
            </p>
          </div>

          {/* Interactive Live Savings Calculator Widget */}
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-forest-900 via-forest to-forest-800 text-white shadow-lift relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-6 space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-amber text-stone-950 font-bold px-3 py-1 rounded-full text-xs">
                  <BadgePercent className="w-3.5 h-3.5" />
                  <span>Interactive Move-In Savings Calculator</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Estimate Your Cash Saved Upfront
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Adjust your expected monthly rent to see how much upfront cash stays in your bank account with Roomzy's zero-brokerage and 1-month deposit policy.
                </p>

                {/* Slider Control */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-white/70">Expected Monthly Rent:</span>
                    <span className="font-bold text-amber-light text-base">₹{calcRent.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="60000" 
                    step="2000"
                    value={calcRent}
                    onChange={(e) => setCalcRent(Number(e.target.value))}
                    className="w-full accent-amber h-2 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/60">
                    <span>₹10,000/mo</span>
                    <span>₹35,000/mo</span>
                    <span>₹60,000/mo</span>
                  </div>
                </div>
              </div>

              {/* Live Savings Calculation Cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs space-y-1">
                  <span className="text-rose-300 font-bold block text-[11px] uppercase tracking-wider">Traditional Brokerage Lost</span>
                  <div className="font-display font-extrabold text-2xl text-rose-300">
                    ₹{brokerageLost.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed">
                    1 month rent commission paid to offline brokers with zero guarantee.
                  </p>
                </div>

                <div className="bg-amber/20 p-4 rounded-2xl border border-amber/40 text-xs space-y-1">
                  <span className="text-amber-light font-bold block text-[11px] uppercase tracking-wider">Total Cash Preserved</span>
                  <div className="font-display font-extrabold text-2xl text-amber-light">
                    ₹{upfrontCashSaved.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-white/90 leading-relaxed">
                    Zero brokerage + only 1 month deposit instead of standard 10 months.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="overflow-x-auto w-full max-w-full">
            <table className="w-full text-left border-collapse min-w-[580px]">
              <thead>
                <tr className="border-b border-ivory-border/80">
                  <th className="py-3 px-4 text-xs font-bold text-neutral-500 uppercase tracking-wider w-1/4">
                    Rental Aspect
                  </th>
                  <th className="py-3 px-4 text-xs font-bold text-rose-700 uppercase tracking-wider w-3/8 bg-rose-50/50 rounded-tl-2xl">
                    Traditional Offline Renting
                  </th>
                  <th className="py-3 px-4 text-xs font-bold text-forest-emerald uppercase tracking-wider w-3/8 bg-emerald-50/60 rounded-tr-2xl">
                    Roomzy Managed Living
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-border/60 text-xs">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-600 bg-rose-50/20">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-900 font-medium bg-emerald-50/30">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-forest-emerald shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span>{row.roomzy}</span>
                          <span className="ml-2 inline-block text-[10px] font-bold text-forest-emerald bg-emerald-100/80 px-2 py-0.2 rounded-full">
                            {row.highlight}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. 4-STEP HOW IT WORKS JOURNEY (Connected Visual Timeline)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
            Frictionless Process
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
            How Roomzy Works in 4 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
            From initial discovery to moving in with just your suitcase — 100% digital, fast, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.step}
                className="glass-luxury p-6 rounded-3xl shadow-glass flex flex-col justify-between hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-forest-50 text-forest font-display font-extrabold text-sm flex items-center justify-center border border-forest-100 group-hover:scale-105 transition-transform">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-forest-emerald bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {step.pill}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-ivory-dark/70 text-forest flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-forest" />
                  </div>

                  <h3 className="font-display font-bold text-base text-neutral-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-ivory-border/70 text-[11px] font-bold text-forest-emerald flex items-center gap-1">
                  <span>Step {idx + 1} of 4</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          5. FEATURED ROOMS & ACCOMMODATION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-hover block">
              Handpicked Properties
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
              Top Verified Places in {filters.city}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Inspected listings with transparent costs and verified landlord identities.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-white/80 p-1 rounded-2xl border border-ivory-border shadow-xs text-xs">
            <button
              onClick={() => setFeaturedTab('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                featuredTab === 'all'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-neutral-600 hover:text-forest'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFeaturedTab('rooms')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                featuredTab === 'rooms'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-neutral-600 hover:text-forest'
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => setFeaturedTab('groups')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                featuredTab === 'groups'
                  ? 'bg-amber text-stone-950 font-bold shadow-xs'
                  : 'text-neutral-600 hover:text-amber-hover'
              }`}
            >
              Find Together
            </button>
            <button
              onClick={() => setFeaturedTab('pgs')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                featuredTab === 'pgs'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-neutral-600 hover:text-forest'
              }`}
            >
              PGs
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* View All Action */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-forest hover:text-white text-forest font-bold text-sm border border-ivory-border shadow-soft hover:shadow-card transition-all"
          >
            <span>View All Available Spaces in {filters.city}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          6. CO-LIVING LIVING & APPLIANCE SHOWROOM (High-Tech Suite)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-glass border border-white/80 relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
                Turnkey Living Standard
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
                Fully Equipped With Modern Everyday Appliances
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Never purchase, rent, or lug heavy appliances again. Every Roomzy verified flat and co-living home comes completely setup with high-end essentials so you can focus on work and life.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500">
                All appliances tested & maintained by Roomzy Care
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES_SHOWCASE.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white/85 hover:bg-white p-5 rounded-2xl border border-ivory-border shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center">
                        <Icon className="w-5 h-5 text-forest" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {amenity.highlight}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-neutral-900 mb-1">
                      {amenity.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {amenity.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. FIND COMPATIBLE FLATMATES (Lifestyle Compatibility Matchmaking)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-glass border border-white/70">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
                Lifestyle Compatibility
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
                Meet Verified Flatmates, Not Strangers
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                Compare dietary habits, work-from-home schedules, smoking rules, and social preferences before moving in.
              </p>
            </div>
            <button
              onClick={() => {
                updateFilter('category', 'flatmates');
                setCurrentView('marketplace');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
            >
              <span>Explore All Roommate Profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roommateListings.map(listing => (
              <div 
                key={listing.id}
                onClick={() => navigateToListing(listing.id)}
                className="bg-white/85 hover:bg-white p-5 rounded-2xl border border-ivory-border shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Host Profile Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={listing.host.avatar} 
                      alt={listing.host.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-forest/20" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-neutral-900">{listing.host.name}</h3>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          {listing.compatibilityScore || 94}% Match
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">{listing.host.occupation} @ {listing.host.company || 'Tech'}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-forest-emerald font-semibold mt-0.5">
                        <ShieldCheck className="w-3 h-3" /> Aadhaar Verified
                      </span>
                    </div>
                  </div>

                  {/* Lifestyle Compatibility Matrix */}
                  <div className="bg-ivory-dark/60 p-3 rounded-xl text-xs space-y-1.5 mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Dietary:</span>
                      <span className="font-semibold text-neutral-800">{listing.preferences.dietary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Smoking:</span>
                      <span className="font-semibold text-neutral-800">{listing.preferences.smoking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">WFH Friendly:</span>
                      <span className="font-semibold text-emerald-700">Yes (300 Mbps Fiber)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Target Locality:</span>
                      <span className="font-semibold text-neutral-800">{listing.locality}</span>
                    </div>
                  </div>

                  {/* Lister Tagline */}
                  <p className="text-xs text-neutral-600 italic line-clamp-2">
                    "{listing.tagline}"
                  </p>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="pt-4 border-t border-ivory-border flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">Target Budget</span>
                    <span className="text-xs font-bold text-forest">
                      ₹{listing.costs.rent.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                  <span className="text-xs font-bold text-forest-emerald hover:underline flex items-center gap-1">
                    Connect Profile <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. FIND A FLAT TOGETHER (Interactive Innovation Breakdown)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-lift border border-white/20">
          
          {/* Ambient Amber Glow inside dark glass */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber/25 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Explanation Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-amber text-stone-950 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Roomzy Exclusive Innovation</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
                Why rent an expensive single room when you can <span className="text-amber-light">Find Together</span>?
              </h2>

              <p className="text-ivory-dark/90 text-sm sm:text-base leading-relaxed">
                Finding a high-rise 3BHK flat together is India's smartest rental hack. Team up with 1 or 2 verified roommates with matching habits, lease directly from owners, and unlock society swimming pools, clubhouses, and master bedrooms at 40% lower rent.
              </p>

              {/* Side by side comparison pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
                  <span className="text-rose-300 font-bold text-xs uppercase tracking-wider">The Solitary 1BHK</span>
                  <div className="text-lg font-bold">₹28,000 / month</div>
                  <p className="text-[11px] text-white/70">
                    Plus ₹3,500 maintenance, 1-month brokerage fee, cramped 450 sq ft space, no amenities.
                  </p>
                </div>

                <div className="bg-amber/20 p-4 rounded-2xl border border-amber/40 space-y-1">
                  <span className="text-amber-light font-bold text-xs uppercase tracking-wider">Roomzy Find Together</span>
                  <div className="text-lg font-bold text-amber-light">₹20,000 / month</div>
                  <p className="text-[11px] text-white/80">
                    Spacious 1,850 sq ft gated flat, private bath, cook, clubhouse, pool, and <strong>₹0 brokerage</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    updateFilter('category', 'groups');
                    setCurrentView('marketplace');
                  }}
                  className="bg-amber hover:bg-amber-light text-stone-950 font-bold px-6 py-3 rounded-xl text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Explore Active Teams</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Average ₹1,44,000 saved per person every year
                </span>
              </div>
            </div>

            {/* Right Team Card Preview */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs space-y-3 shadow-glass">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-amber-light flex items-center gap-1.5 text-sm">
                    <Users className="w-4 h-4" /> Active Team Formation
                  </div>
                  <span className="bg-emerald-400 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    2/3 Flatmates Confirmed
                  </span>
                </div>

                <div className="bg-black/20 p-3.5 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-baseline font-semibold text-sm">
                    <span>Indiranagar 3BHK Penthouse</span>
                    <span className="text-emerald-300 font-bold">₹60,000 Total</span>
                  </div>
                  <p className="text-[11px] text-white/80">
                    Looking for a 3rd flatmate (Vegetarian, Non-smoker, Hybrid tech professional).
                  </p>
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10 text-[11px]">
                    <span className="text-white/60">Your share:</span>
                    <span className="font-bold text-white text-xs">₹20,000 / month</span>
                    <span className="ml-auto text-emerald-300 font-semibold">Attached bath included</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-ivory-dark/90">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Both current members verified via Aadhaar & corporate work email.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TOP NEIGHBORHOOD EXPLORER CARDS (Editorial Panoramic Views)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
              Prime Tech Corridors
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
              Top Neighborhoods Across India
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Live walking distance from India's biggest tech parks, cafes, and rapid transit.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('marketplace')}
            className="text-xs sm:text-sm font-bold text-forest hover:underline flex items-center gap-1"
          >
            <span>Explore All Localities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOP_NEIGHBORHOODS.map((hood) => (
            <div 
              key={hood.name}
              onClick={() => handleQuickLocality(hood.name, hood.city)}
              className="group bg-white rounded-3xl overflow-hidden border border-ivory-border hover:border-forest/40 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img 
                    src={hood.image} 
                    alt={hood.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-forest shadow-xs">
                    {hood.city}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-medium text-white/90 border border-white/20">
                    {hood.commute}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] text-white/80 block">Avg Room Rent</span>
                    <span className="font-display font-extrabold text-base text-amber-light">
                      {hood.avgRent}<span className="text-xs font-normal text-white/80">/mo</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-neutral-900 group-hover:text-forest transition-colors">
                      {hood.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-neutral-500 bg-ivory-dark px-2 py-0.5 rounded-full">
                      {hood.activeCount} Homes
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-snug">
                    {hood.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {hood.tags.map(tag => (
                      <span key={tag} className="text-[9px] bg-ivory-dark/90 text-neutral-700 px-2 py-0.5 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-3 border-t border-ivory-border/70 flex items-center justify-between text-xs font-bold text-forest group-hover:text-forest-dark">
                  <span>Browse {hood.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          10. PGS & CO-LIVING OPTIONS (Managed Luxury PGs)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
              Managed Living
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
              Curated Executive PGs & Co-Living
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Zero hassle: 3 home-style meals, daily housekeeping, 300 Mbps WiFi & 1-month security deposit.
            </p>
          </div>

          <button
            onClick={() => {
              updateFilter('category', 'pgs');
              setCurrentView('marketplace');
            }}
            className="text-forest font-bold text-xs sm:text-sm hover:underline flex items-center gap-1"
          >
            <span>View All PGs in {filters.city}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-center gap-2.5 text-xs">
            <Coffee className="w-4 h-4 text-amber-hover shrink-0" />
            <span className="font-semibold text-neutral-800">3 Fresh Meals Daily</span>
          </div>
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-center gap-2.5 text-xs">
            <Wifi className="w-4 h-4 text-forest-emerald shrink-0" />
            <span className="font-semibold text-neutral-800">300 Mbps Fiber WiFi</span>
          </div>
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-center gap-2.5 text-xs">
            <Zap className="w-4 h-4 text-amber shrink-0" />
            <span className="font-semibold text-neutral-800">100% Power Backup</span>
          </div>
          <div className="p-3.5 rounded-2xl glass-panel-subtle flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
            <span className="font-semibold text-neutral-800">Biometric Security</span>
          </div>
        </div>

        {/* PG Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curatedPGs.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          11. RESIDENT STORIES & REAL COMMUNITY VOICES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-forest-emerald block">
            Real Resident Voices
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-forest mt-1">
            Loved By Tech & Creative Professionals
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
            Read authentic stories from verified tenants working at India's top employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESIDENT_STORIES.map((story, idx) => (
            <div 
              key={idx}
              className="glass-luxury p-6 rounded-3xl shadow-glass flex flex-col justify-between hover:shadow-card hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber text-amber" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {story.perk}
                  </span>
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed mb-6 italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-border/70 flex items-center gap-3">
                <img 
                  src={story.avatar} 
                  alt={story.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-forest/20 shrink-0" 
                />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-neutral-900 truncate">
                    {story.name}
                  </h4>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {story.role} @ <strong className="text-neutral-700">{story.company}</strong>
                  </p>
                  <p className="text-[9px] text-forest-emerald font-semibold">
                    {story.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          12. TRUST, VERIFICATION & SAFETY (Apple Glass Pillars)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-forest block">
            Safe & Accountable
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 mt-1">
            Built on Real Verification
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            No anonymous accounts, no fabricated listings, and no surprise brokerage fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-luxury p-6 sm:p-7 rounded-3xl shadow-glass space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest flex items-center justify-center font-bold border border-forest-100">
              <ShieldCheck className="w-6 h-6 text-forest-emerald" />
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-900">
              Aadhaar & KYC Masked Checks
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every lister validates their identity with government-approved masked verification. Personal identity is verified while protecting private data.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-forest-emerald flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 100% verified lister profiles
            </div>
          </div>

          <div className="glass-luxury p-6 sm:p-7 rounded-3xl shadow-glass space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest flex items-center justify-center font-bold border border-forest-100">
              <Lock className="w-6 h-6 text-forest" />
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-900">
              Privacy-First Approximate Maps
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Exact flat numbers and residential addresses are never broadcast publicly. Coordinates are revealed only after a visit booking is confirmed.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-forest-emerald flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Protected residential privacy
            </div>
          </div>

          <div className="glass-luxury p-6 sm:p-7 rounded-3xl shadow-glass space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-forest-50 text-forest flex items-center justify-center font-bold border border-forest-100">
              <IndianRupee className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="font-display font-bold text-lg text-neutral-900">
              Transparent Expense Breakdown
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every card shows exact rent, deposit, maintenance, and estimated utilities upfront. Zero hidden landlord surcharges or unexpected exit cuts.
            </p>
            <div className="pt-2 text-[11px] font-semibold text-forest-emerald flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Zero brokerage guarantee
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          13. BENEFITS FOR OWNERS & ACCOMMODATION BUSINESSES (Architectural Luxury Card)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden bg-[#071913] border border-emerald-950/40">
          
          {/* Architectural Background with Deep Vignette */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80" 
              alt="Luxury modern apartment interior"
              className="w-full h-full object-cover object-center opacity-30 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071913]/95 via-[#0C241C]/88 to-[#071913]/85" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full" />
          </div>
          
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-amber-light">
              <Building2 className="w-3.5 h-3.5" />
              <span>For Flat Owners & PG Operators</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Fill vacant rooms <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">3x faster</span> with pre-verified corporate tenants
            </h2>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              Eliminate broker hassles, middleman commissions, and endless unanswered calls. Roomzy's dedicated host workspace gives you real-time inquiry management, digital visit scheduling, and verified tenant background checks.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setPersona('business')}
                className="bg-gradient-to-r from-amber to-amber-hover hover:from-amber-light hover:to-amber text-stone-950 font-extrabold px-7 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-glow-amber hover:scale-[1.02] transition-all"
              >
                <span>Open Host Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 glass-panel-subtle bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 space-y-4 text-xs relative z-10 shadow-glass">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <span className="text-white font-bold text-sm">Host Workspace Features</span>
              <span className="text-emerald-300 font-extrabold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">0% Commission</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-light shrink-0 mt-0.5" />
              <span><strong>Pre-screened tenants:</strong> Digital KYC & corporate work email confirmation.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-light shrink-0 mt-0.5" />
              <span><strong>Visit scheduler:</strong> Set your open slots; tenants book in 1-click.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-light shrink-0 mt-0.5" />
              <span><strong>Fastest occupancy:</strong> Average listing gets leased in 6 days.</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          14. STRONG FINAL CALL TO ACTION (Cinematic Architectural Portal)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative isolate rounded-3xl p-8 sm:p-14 text-center max-w-5xl mx-auto shadow-2xl border border-emerald-950/40 overflow-hidden bg-[#071913]">
          
          {/* Architectural Background with Ambient Lights */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80" 
              alt="Modern luxury architecture"
              className="w-full h-full object-cover object-center opacity-35 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071913]/92 via-[#0c261e]/85 to-[#071913]/95" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/25 blur-[140px] rounded-full pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-amber/20 blur-[120px] rounded-full pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md text-white mx-auto flex items-center justify-center font-display font-black text-2xl shadow-glass border border-white/20">
              R<span className="text-amber-light">.</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OVER 12,000+ HAPPY CO-LIVING RESIDENTS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Ready to find your ideal space <br className="hidden sm:inline" />
              and <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300">verified people</span>?
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed pt-1">
              Join thousands of working professionals living comfortably in India's top tech hubs with zero brokerage, 1-month deposit, and verified flatmates.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  updateFilter('category', 'all');
                  setCurrentView('marketplace');
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-forest-emerald to-forest hover:from-emerald-500 hover:to-forest-light text-white font-black text-sm shadow-glow-emerald hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-light" />
                <span>Browse All Rooms in {filters.city}</span>
              </button>

              {!currentUser ? (
                <button
                  onClick={() => openAuthModal()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber via-amber-light to-amber text-stone-950 font-black text-sm shadow-glow-amber hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Create Free Account / Sign In</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateFilter('category', 'groups');
                    setCurrentView('marketplace');
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber via-amber-light to-amber text-stone-950 font-black text-sm shadow-glow-amber hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Start a Find Together Team</span>
                </button>
              )}
            </div>

            {/* Micro Trust Pills */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Zero Brokerage
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standard 1-Month Deposit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Host Identities
              </span>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

