import { Listing, VerificationRequest } from '../types';

export const INITIAL_LISTINGS: Listing[] = [
  // --- BENGALURU: ROOMS ---
  {
    id: 'blr-room-1',
    title: 'Sunlit Master Bedroom with Balcony & Attached Bath in 3BHK',
    tagline: 'Quiet green lane, 5 mins walk to 100ft road cafes',
    category: 'rooms',
    city: 'Bengaluru',
    locality: 'Koramangala 4th Block',
    landmark: 'Behind Sony World Signal',
    coordinates: { x: 54, y: 58 },
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 18500,
      deposit: 45000,
      maintenance: 1800,
      utilitiesEstimate: 1200,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '3 BHK',
    amenities: ['Attached Washroom', 'Private Balcony', 'High-Speed WiFi', 'Cook / Maid Service', 'Power Backup', 'Washing Machine', 'Air Conditioning'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-blr-1',
      name: 'Aditya Kashyap',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 27,
      occupation: 'Senior Product Designer',
      company: 'Razorpay',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 30 mins',
      joinedYear: '2023'
    },
    compatibilityScore: 94,
    description: 'Looking for a chill, responsible flatmate to take over the master bedroom in our spacious 3BHK flat in Koramangala 4th Block. The room is fully furnished with a king bed, custom wardrobe, ergonomic work desk, and an attached balcony facing gulmohar trees. High-speed 300 Mbps broadband, domestic cook who makes incredible South and North Indian meals, and a dedicated parking slot.',
    houseRules: [
      'Quiet hours after 11:30 PM on weekdays',
      'Smoking strictly restricted to private room balcony',
      'Overnight guests welcome with mutual heads-up',
      'Shared expenses split equally via Splitwise'
    ],
    nearbyHubs: [
      { name: 'Sony World Junction', distance: '400m', travelTime: '5 mins walk' },
      { name: 'Koramangala BDA Complex', distance: '1.1 km', travelTime: '4 mins ride' },
      { name: 'Embassy GolfLinks (EGL)', distance: '4.2 km', travelTime: '18 mins drive' }
    ],
    isVerified: true,
    featured: true
  },
  {
    id: 'blr-room-2',
    title: 'Cozy Private Room in Gated High-Rise Society',
    tagline: 'Clubhouse, swimming pool & gym included',
    category: 'rooms',
    city: 'Bengaluru',
    locality: 'HSR Layout Sector 2',
    landmark: 'Near 27th Main NIFT',
    coordinates: { x: 62, y: 68 },
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 16000,
      deposit: 35000,
      maintenance: 2200,
      utilitiesEstimate: 1100,
      brokerage: 0
    },
    availableFrom: '1st Nov 2026',
    furnishing: 'Fully Furnished',
    bhk: '3 BHK',
    amenities: ['Gym & Pool Access', 'Gated 24/7 Security', 'Covered Parking', 'High-Speed WiFi', 'Washing Machine', 'Cook Available'],
    preferences: {
      dietary: 'Pure Veg',
      smoking: 'No Smoking',
      drinking: 'Non-Drinker',
      genderPreference: 'Male',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: false,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-blr-2',
      name: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 26,
      occupation: 'Software Engineer',
      company: 'Flipkart',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 1 hour',
      joinedYear: '2024'
    },
    compatibilityScore: 88,
    description: 'One private bedroom available in our semi-luxury 3BHK flat inside a gated society in HSR Sector 2. Perfect for IT folks working near Bellandur or Sarjapur Road. The society has gym, tennis court, running track, and 100% power backup. Pure vegetarian household.',
    houseRules: [
      'Pure vegetarian kitchen only',
      'Strictly non-smoking property',
      'Friends visit allowed during daytime'
    ],
    nearbyHubs: [
      { name: 'HSR 27th Main Market', distance: '600m', travelTime: '7 mins walk' },
      { name: 'EcoSpace Bellandur', distance: '3.8 km', travelTime: '15 mins' }
    ],
    isVerified: true
  },

  // --- BENGALURU: FLATMATES WANTED ---
  {
    id: 'blr-flatmate-1',
    title: 'Looking for 1 Chill Flatmate in 2BHK Penthouse',
    tagline: 'Terrace garden with sunset view, near 12th Main',
    category: 'flatmates',
    city: 'Bengaluru',
    locality: 'Indiranagar 100ft Road',
    landmark: 'Behind Toit Brewpub',
    coordinates: { x: 58, y: 46 },
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 22000,
      deposit: 50000,
      maintenance: 1500,
      utilitiesEstimate: 1500,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '2 BHK',
    amenities: ['Rooftop Terrace', 'Smart TV / Projector', 'Air Conditioning', 'Dishwasher', 'Cook / Maid Service', 'Attached Bath'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Allowed',
      genderPreference: 'Female',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-blr-3',
      name: 'Ananya Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 28,
      occupation: 'Brand Lead',
      company: 'Swiggy',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 15 mins',
      joinedYear: '2022'
    },
    compatibilityScore: 96,
    description: 'Hey! I am a brand marketer living in this gorgeous top-floor 2BHK flat in Indiranagar. Looking for a female flatmate who is clean, easygoing, and loves pets (I have a very well-behaved golden retriever named Chai). The flat has a private terrace garden, modular kitchen, and full home theater setup.',
    houseRules: [
      'Must love dogs',
      'Keep common kitchen and living area tidy',
      'Open communication on flat chores'
    ],
    nearbyHubs: [
      { name: 'Indiranagar Metro Station', distance: '700m', travelTime: '8 mins walk' },
      { name: '100 Feet Road Retail Strip', distance: '300m', travelTime: '4 mins walk' }
    ],
    isVerified: true,
    featured: true
  },

  // --- BENGALURU: ROOMMATE REQUIREMENTS (WANTED) ---
  {
    id: 'blr-wanted-1',
    title: 'Senior Frontend Dev Looking for Private Room in HSR / Bellandur',
    tagline: 'Quiet, hygienic, veg-friendly, budget up to ₹25k',
    category: 'wanted',
    city: 'Bengaluru',
    locality: 'HSR Layout or Bellandur',
    landmark: 'Near Outer Ring Road',
    coordinates: { x: 65, y: 64 },
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 24000,
      deposit: 50000,
      maintenance: 2000,
      utilitiesEstimate: 1500,
      brokerage: 0
    },
    availableFrom: '15th Nov 2026',
    furnishing: 'Fully Furnished',
    bhk: '2 BHK',
    amenities: ['High-Speed WiFi', 'Attached Washroom', 'AC in Room', 'Quiet Environment'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'No Smoking',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-blr-4',
      name: 'Karan Mehra',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      role: 'Room Seeker',
      age: 27,
      occupation: 'Tech Lead',
      company: 'Cred',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Instant response',
      joinedYear: '2024'
    },
    compatibilityScore: 91,
    description: 'Looking to join an existing flat or team up with 1-2 people to rent a premium 2BHK/3BHK in HSR Layout Sectors 1-6 or Green Glen Layout, Bellandur. I work in tech, spend most weekdays focused on work, and spend weekends reading, running, or exploring cafes. Very neat and prompt with bills.',
    houseRules: [
      'Prompt Splitwise settlements on the 1st of every month',
      'Looking for non-smoking roommates',
      'Respectful of work-from-home focus hours'
    ],
    nearbyHubs: [
      { name: 'EcoWorld Tech Park', distance: '2.5 km', travelTime: '10 mins' },
      { name: 'HSR Club', distance: '1.2 km', travelTime: '5 mins' }
    ],
    isVerified: true
  },

  // --- BENGALURU: FIND TOGETHER / GROUPS ---
  {
    id: 'blr-group-1',
    title: 'Find Together: 2 Founders Teaming Up to Rent 3BHK Villa Flat',
    tagline: 'Looking for 3rd companion to lease in Koramangala',
    category: 'groups',
    city: 'Bengaluru',
    locality: 'Koramangala 3rd Block',
    landmark: 'Near 12th Main Cafe Strip',
    coordinates: { x: 50, y: 55 },
    photos: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 21000, // per person share of 63,000
      deposit: 60000,
      maintenance: 2500,
      utilitiesEstimate: 1800,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Semi Furnished',
    bhk: '3 BHK',
    amenities: ['Dedicated Workstations', 'High-Speed Fiber (Dual ISP)', 'Private Garden', 'In-House Cook', 'Power Backup'],
    preferences: {
      dietary: 'Flexible',
      smoking: 'Balcony Only',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-blr-5',
      name: 'Nikhil & Prateek',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      role: 'Room Seeker',
      age: 29,
      occupation: 'AI Startup Founders',
      company: 'Stealth AI',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 20 mins',
      joinedYear: '2023'
    },
    groupMembers: [
      { name: 'Nikhil R.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80', role: 'Founder & CEO', budget: 22000 },
      { name: 'Prateek S.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', role: 'CTO', budget: 22000 }
    ],
    groupLookingFor: '1 Renter to complete 3-person team for pre-vetted ₹63,000 independent villa flat',
    compatibilityScore: 95,
    description: 'We have shortlisted a stunning independent 3BHK flat with a private patio in Koramangala 3rd block. Total rent is ₹63k/month (split equally to ₹21,000 per person). We are building a tech startup, work hard, love coffee, and want a like-minded working professional to lease this place with us starting next month.',
    houseRules: [
      'Respectful noise levels during pitch calls',
      'Weekly home cleaning routine with cook & maid',
      'No broker involvement — direct landlord lease'
    ],
    nearbyHubs: [
      { name: 'Koramangala 3rd Block Park', distance: '150m', travelTime: '2 mins walk' },
      { name: 'Nexus Mall Koramangala', distance: '1.4 km', travelTime: '6 mins' }
    ],
    isVerified: true,
    featured: true
  },

  // --- BENGALURU: WHOLE FLATS ---
  {
    id: 'blr-flat-1',
    title: 'Modern 3BHK Designer Apartment in Gated Community',
    tagline: 'Ideal for 3 flatmates or small group leasing together',
    category: 'flats',
    city: 'Bengaluru',
    locality: 'Bellandur ORR',
    landmark: 'Opposite RMZ Ecoworld',
    coordinates: { x: 70, y: 62 },
    photos: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 54000, // ₹18,000/person for 3 people
      deposit: 120000,
      maintenance: 4500,
      utilitiesEstimate: 3000,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '3 BHK',
    amenities: ['Olympic Pool & Gym', 'Badminton Court', 'EV Charging Station', 'Full Power Backup', 'Covered Car Parking (2)'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Allowed',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Whole Flat'
    },
    host: {
      id: 'host-blr-6',
      name: 'Vikas Swaminathan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      role: 'Owner',
      verifiedGovtId: true,
      verificationBadge: 'RERA & Property Verified',
      responseRate: 'Responds within 2 hours',
      joinedYear: '2021'
    },
    compatibilityScore: 92,
    description: 'Direct from NRI Owner with zero brokerage. Spacious 1,850 sq.ft 3BHK flat on 8th floor of prestigious gated society. All 3 bedrooms have attached bathrooms and wooden flooring. Large modular kitchen with dishwasher and piped gas. Looking for a verified group of working professionals.',
    houseRules: [
      'Society bylaws strictly maintained regarding clubhouse usage',
      'Lease duration minimum 11 months with 2 months notice period',
      'Direct owner rent transfer with GST invoice if needed'
    ],
    nearbyHubs: [
      { name: 'RMZ Ecoworld Gate 1', distance: '800m', travelTime: '3 mins' },
      { name: 'Bellandur Central Mall', distance: '1.2 km', travelTime: '5 mins' }
    ],
    isVerified: true
  },

  // --- BENGALURU: PGs & CO-LIVING ---
  {
    id: 'blr-pg-1',
    title: 'Roomzy Premier Co-Living: Managed Private & Twin Rooms',
    tagline: '3 meals/day, daily housekeeping, 1Gbps WiFi, zero deposit lock-in',
    category: 'pgs',
    city: 'Bengaluru',
    locality: 'Koramangala 5th Block',
    landmark: 'Near Jyoti Nivas College Road',
    coordinates: { x: 52, y: 60 },
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 14500,
      deposit: 14500, // 1 month deposit only
      maintenance: 0,
      utilitiesEstimate: 0, // All inclusive
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: 'PG Room',
    amenities: ['3 Fresh Meals Daily', 'Daily Housekeeping', '1Gbps Gaming WiFi', 'Coworking Lounge', 'Laundry Service', 'Biometric Entry', 'Community Events'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Allowed in Lounge',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-blr-7',
      name: 'Roomzy Managed Living',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'PG Manager',
      verifiedGovtId: true,
      verificationBadge: 'Roomzy Certified Property',
      responseRate: 'Instant auto-confirm',
      joinedYear: '2020'
    },
    compatibilityScore: 97,
    description: 'Hassle-free shared living designed for young urban professionals. Single private rooms and twin sharing available. Rent includes chef-prepared breakfast, lunch, and dinner, high-speed WiFi, laundry machines, and weekly rooftop movie nights. Just bring your suitcase.',
    houseRules: [
      'Biometric access 24/7 with zero curfew',
      'Meals served during scheduled dining hours with packed lunch options',
      'Visitor policy: Day visitors allowed in coworking lounge'
    ],
    nearbyHubs: [
      { name: 'Jyoti Nivas College Bus Stop', distance: '200m', travelTime: '2 mins walk' },
      { name: 'Koramangala Club', distance: '800m', travelTime: '10 mins walk' }
    ],
    isVerified: true,
    featured: true
  },

  // --- MUMBAI: ROOMS & FLATMATE ---
  {
    id: 'mum-room-1',
    title: 'Sea-Breeze Private Bedroom in Bandra West Heritage Lane',
    tagline: 'Artistic flat with wooden beams, 500m from Carter Road',
    category: 'rooms',
    city: 'Mumbai',
    locality: 'Bandra West',
    landmark: 'Near Pali Village & Carter Road',
    coordinates: { x: 35, y: 48 },
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 32000,
      deposit: 75000,
      maintenance: 2500,
      utilitiesEstimate: 2000,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '2 BHK',
    amenities: ['Air Conditioning', 'High-Speed WiFi', 'Cook / Maid Service', 'Balcony', 'Heritage Architecture'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Allowed',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-mum-1',
      name: 'Pooja Bhattacharya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 30,
      occupation: 'Film & Media Producer',
      company: 'Creative Studio',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 1 hour',
      joinedYear: '2023'
    },
    compatibilityScore: 93,
    description: 'Looking for a flatmate in our dreamy, sunlit Bandra West 2BHK flat. High ceilings, teakwood furniture, modern kitchen with air fryer and espresso machine. Walking distance to the best coffee shops and Carter Road promenade.',
    houseRules: [
      'Respectful of creative working hours',
      'Balcony smoking only',
      'Party with prior notice to flatmate'
    ],
    nearbyHubs: [
      { name: 'Carter Road Promenade', distance: '500m', travelTime: '6 mins walk' },
      { name: 'Bandra Railway Station', distance: '1.8 km', travelTime: '10 mins' }
    ],
    isVerified: true,
    featured: true
  },
  {
    id: 'mum-flat-1',
    title: 'Hiranandani Powai Lake View 2BHK for Co-Leasing',
    tagline: 'Neo-classical building, Italian marble flooring',
    category: 'flats',
    city: 'Mumbai',
    locality: 'Powai Hiranandani Gardens',
    landmark: 'Near Galleria Shopping Mall',
    coordinates: { x: 55, y: 40 },
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 62000, // ₹31,000 each for 2 flatmates
      deposit: 150000,
      maintenance: 5000,
      utilitiesEstimate: 3000,
      brokerage: 0
    },
    availableFrom: '1st Nov 2026',
    furnishing: 'Fully Furnished',
    bhk: '2 BHK',
    amenities: ['Clubhouse & Gym', 'Powai Lake View', 'Piped Gas', 'Multi-Tier Security', 'Covered Car Parking'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: true,
      occupancyType: 'Whole Flat'
    },
    host: {
      id: 'host-mum-2',
      name: 'Ashwin Godrej',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      role: 'Owner',
      verifiedGovtId: true,
      verificationBadge: 'Verified Owner',
      responseRate: 'Responds within 3 hours',
      joinedYear: '2022'
    },
    compatibilityScore: 90,
    description: 'Well-maintained 2BHK flat in the heart of Hiranandani Gardens, Powai. Ideal for 2 tech or finance professionals working in Powai or BKC. Comes with imported modular kitchen, 3 ACs, and panoramic lake view.',
    houseRules: [
      'Family-friendly society, moderate music volume',
      'Registered rent agreement with police verification'
    ],
    nearbyHubs: [
      { name: 'Galleria Mall Powai', distance: '300m', travelTime: '4 mins walk' },
      { name: 'IIT Bombay Main Gate', distance: '1.2 km', travelTime: '5 mins' }
    ],
    isVerified: true
  },

  // --- DELHI-NCR: ROOMS & FIND TOGETHER ---
  {
    id: 'delhi-room-1',
    title: 'Spacious Room in DLF Phase 5 Luxury Flat',
    tagline: '5 mins to Cyber City & Rapid Metro Sector 54',
    category: 'rooms',
    city: 'Delhi-NCR',
    locality: 'Cyber City / Golf Course Road',
    landmark: 'Near One Horizon Centre',
    coordinates: { x: 42, y: 32 },
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 21000,
      deposit: 42000,
      maintenance: 3000,
      utilitiesEstimate: 2000,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '3 BHK',
    amenities: ['Clubhouse & Pool', 'Central Air Conditioning', 'Cook & Maid Included', '24/7 Concierge', 'Attached Bath'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Allowed',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-del-1',
      name: 'Samarjit Oberoi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 28,
      occupation: 'Investment Banker',
      company: 'Goldman Sachs',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 30 mins',
      joinedYear: '2023'
    },
    compatibilityScore: 92,
    description: 'One master bedroom with dressing room and attached bath available in our 3BHK high-rise in DLF Phase 5. Flatmates are 2 consultants who are mostly working during the week. 100% power backup and domestic cook.',
    houseRules: [
      'Cleanliness in common dining area',
      'No loud music past midnight on weeknights'
    ],
    nearbyHubs: [
      { name: 'One Horizon Center', distance: '600m', travelTime: '7 mins walk' },
      { name: 'Sector 54 Rapid Metro', distance: '400m', travelTime: '5 mins walk' }
    ],
    isVerified: true
  },

  // --- PUNE: FLATMATE & PG ---
  {
    id: 'pune-room-1',
    title: 'Private Room with Lush Green Balcony in Koregaon Park',
    tagline: 'Quiet leafy lane, walking distance to Osho Teerth Park',
    category: 'rooms',
    city: 'Pune',
    locality: 'Koregaon Park Lane 7',
    landmark: 'Near German Bakery',
    coordinates: { x: 38, y: 72 },
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 14000,
      deposit: 28000,
      maintenance: 1200,
      utilitiesEstimate: 900,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '2 BHK',
    amenities: ['Lush Balcony', 'WiFi', 'Cook & Maid', 'Washing Machine', 'Pet Friendly'],
    preferences: {
      dietary: 'Flexible',
      smoking: 'Balcony Only',
      drinking: 'Allowed',
      genderPreference: 'Female',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-pun-1',
      name: 'Tanvi Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 26,
      occupation: 'Architect',
      company: 'Studio KP',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 45 mins',
      joinedYear: '2024'
    },
    compatibilityScore: 94,
    description: 'Looking for a female flatmate to share this tranquil 2BHK flat in Koregaon Park. Lots of plants, warm sunlight, reliable broadband, and home-cooked Maharashtrian food prepared daily by our lovely cook.',
    houseRules: [
      'Plant lovers appreciated',
      'Respectful of each other’s personal time'
    ],
    nearbyHubs: [
      { name: 'German Bakery KP', distance: '350m', travelTime: '4 mins walk' },
      { name: 'Kalyani Nagar Bridge', distance: '1.5 km', travelTime: '5 mins' }
    ],
    isVerified: true
  },

  // --- HYDERABAD: ROOMS & PG ---
  {
    id: 'hyd-room-1',
    title: 'Executive Room in Financial District Gated Society',
    tagline: '10 mins to Google, Microsoft, and Amazon campuses',
    category: 'rooms',
    city: 'Hyderabad',
    locality: 'Gachibowli / Financial District',
    landmark: 'Near Wipro Circle',
    coordinates: { x: 74, y: 78 },
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef3?auto=format&fit=crop&w=1000&q=80'
    ],
    costs: {
      rent: 15500,
      deposit: 30000,
      maintenance: 1800,
      utilitiesEstimate: 1200,
      brokerage: 0
    },
    availableFrom: 'Immediately',
    furnishing: 'Fully Furnished',
    bhk: '3 BHK',
    amenities: ['Clubhouse & Gym', 'Badminton Court', 'AC in Bedroom', 'Cook Available', 'Covered Car Park'],
    preferences: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'Balcony Only',
      drinking: 'Social',
      genderPreference: 'Male',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    host: {
      id: 'host-hyd-1',
      name: 'Srikanth Reddy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      role: 'Flatmate',
      age: 27,
      occupation: 'Cloud Engineer',
      company: 'Microsoft',
      verifiedGovtId: true,
      verificationBadge: 'Aadhaar Verified',
      responseRate: 'Responds within 30 mins',
      joinedYear: '2023'
    },
    compatibilityScore: 90,
    description: 'Looking for 1 male flatmate to occupy a master bedroom in our 3BHK flat in a premier gated community in Gachibowli. Walking distance to supermarkets and food courts. All flatmates work in tech.',
    houseRules: [
      'Rent & utility payments on 1st of every month',
      'Non-smokers preferred'
    ],
    nearbyHubs: [
      { name: 'Microsoft Campus Gate 2', distance: '1.2 km', travelTime: '4 mins' },
      { name: 'Wipro Circle', distance: '900m', travelTime: '3 mins' }
    ],
    isVerified: true
  }
];

export const INITIAL_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 'verif-1',
    userName: 'Aditya Kashyap',
    userRole: 'Flatmate Lister',
    idType: 'Aadhaar (Masked)',
    submittedDate: '18 Oct 2026',
    documentPreview: 'UIDAI-AADHAAR-XXXX-XXXX-9482 (Front & Back Masked)',
    status: 'Approved',
    notes: 'Verified via DigiLocker OTP'
  },
  {
    id: 'verif-2',
    userName: 'Karan Mehra',
    userRole: 'Room Seeker',
    idType: 'Aadhaar (Masked)',
    submittedDate: '19 Oct 2026',
    documentPreview: 'UIDAI-AADHAAR-XXXX-XXXX-3190 (Masked OCR verified)',
    status: 'Pending',
    notes: 'Pending final review of name match'
  },
  {
    id: 'verif-3',
    userName: 'Vikas Swaminathan',
    userRole: 'Property Owner',
    idType: 'Electricity Bill',
    submittedDate: '17 Oct 2026',
    documentPreview: 'BESCOM-CA-102948291-KORAMANGALA (Matches title deed)',
    status: 'Approved',
    notes: 'Property ownership verified against BESCOM record'
  }
];

export const INDIAN_METROS = [
  { name: 'Bengaluru', activeCount: 840, tag: 'Silicon Valley of India', localities: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Bellandur', 'Whitefield', 'Electronic City'] },
  { name: 'Mumbai', activeCount: 620, tag: 'Maximum City', localities: ['Bandra West', 'Powai', 'Andheri West', 'Juhu', 'Worli', 'Thane West'] },
  { name: 'Delhi-NCR', activeCount: 710, tag: 'Capital Hub', localities: ['Cyber City Gurgaon', 'Golf Course Road', 'Noida Sector 62', 'Hauz Khas', 'Saket'] },
  { name: 'Pune', activeCount: 430, tag: 'Oxford of the East', localities: ['Koregaon Park', 'Hinjewadi', 'Viman Nagar', 'Kalyani Nagar', 'Baner'] },
  { name: 'Hyderabad', activeCount: 510, tag: 'Cyberabad', localities: ['Gachibowli', 'Hitec City', 'Madhapur', 'Kondapur', 'Jubilee Hills'] }
];
