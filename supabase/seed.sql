-- ==============================================================================
-- ROOMZY — 15 VERIFIED STARTER LISTINGS SEED DATA
-- Top Indian Metro Tech Corridors: Bengaluru, Mumbai, Delhi-NCR, Pune, Hyderabad
-- 100% Zero Brokerage, 1-Month Deposit Standard, Aadhaar Verified Hosts
-- ==============================================================================

INSERT INTO public.listings (
  id, title, tagline, category, city, locality, landmark, coordinates,
  photos, costs, available_from, furnishing, bhk, amenities, preferences,
  host_info, compatibility_score, description, house_rules, status
) VALUES
-- -----------------------------------------------------------------------------
-- 1. BENGALURU — Koramangala
-- -----------------------------------------------------------------------------
(
  'blr-kora-01',
  'Sunlit Master Suite with Private Balcony & High-Speed Fiber',
  'Private bedroom in luxury 3BHK flatshare opposite Sony World Junction',
  'rooms',
  'Bengaluru',
  'Koramangala 4th Block',
  'Opposite Sony World Junction & Third Wave Coffee',
  '{"x": 48, "y": 62}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 22000, "deposit": 22000, "maintenance": 2000, "utilitiesEstimate": 1500, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  '3 BHK',
  ARRAY['300 Mbps Fiber WiFi', 'Attached Bathroom', 'Queen Bed & Ortho Mattress', 'AC in Room', 'Cook Included', 'Power Backup', 'Daily Housekeeping'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Ananya Sharma", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Product Lead", "company": "Razorpay", "responseRate": "Within 15 mins", "joinedYear": "2024"}'::jsonb,
  96,
  'Spacious master bedroom in a quiet gated society right in Koramangala 4th Block. Walking distance to Wework, Starbucks, and gyms. Zero broker fee, 1-month refundable security deposit.',
  ARRAY['Respect quiet hours after 11 PM on weekdays', 'Smoking in balcony only', 'Friends and overnight guests welcome on weekends'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 2. BENGALURU — Indiranagar
-- -----------------------------------------------------------------------------
(
  'blr-indi-02',
  'Minimalist Studio Room in Designer Rowhouse',
  'Boutique urban room steps away from 100ft Road nightlife & Metro',
  'flatmates',
  'Bengaluru',
  'Indiranagar 100ft Road',
  'Behind Toit Brewery & 500m to CMH Metro',
  '{"x": 65, "y": 38}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 24500, "deposit": 24500, "maintenance": 1500, "utilitiesEstimate": 1200, "brokerage": 0}'::jsonb,
  'From 1st Next Month',
  'Fully Furnished',
  '2 BHK',
  ARRAY['Gigabit Wi-Fi', 'Smart TV with Netflix', 'In-Unit Washer', 'Modular Kitchen', 'Dedicated Work Desk', '24/7 Security'],
  '{"dietary": "Flexible", "smoking": "No Smoking", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": true, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Rohan Deshmukh", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Senior Frontend Dev", "company": "Swiggy", "responseRate": "Within 30 mins", "joinedYear": "2023"}'::jsonb,
  94,
  'Designer rowhouse shared with 1 friendly tech professional. Features Scandinavian interiors, high-speed mesh Wi-Fi, fully equipped kitchen with double-door fridge, and pet-friendly backyard.',
  ARRAY['Strictly no indoor smoking', 'Keep kitchen tidy after midnight cooking', 'Pet-friendly flatmate preferred'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 3. BENGALURU — HSR Layout
-- -----------------------------------------------------------------------------
(
  'blr-hsr-03',
  'Executive Co-Living Suite with All-Inclusive Services',
  'Managed room in gated high-tech complex with gym, rooftop lounge & meals',
  'pgs',
  'Bengaluru',
  'HSR Layout Sector 2',
  'Near 27th Main Food Street & Cult.Fit',
  '{"x": 58, "y": 74}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 19000, "deposit": 19000, "maintenance": 0, "utilitiesEstimate": 0, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  'PG Room',
  ARRAY['3 Meals Included (North/South Indian)', 'Gym & Yoga Deck', 'Biometric Entry', 'Daily Housekeeping', '300 Mbps Wi-Fi', 'Power Backup'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Non-Drinker", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "HSR Living Spaces", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80", "role": "PG Manager", "verifiedGovtId": true, "verificationBadge": "Verified Property Partner", "occupation": "Community Host", "company": "Roomzy Verified", "responseRate": "Instant (5 mins)", "joinedYear": "2024"}'::jsonb,
  91,
  'Zero hassle living for founders and software engineers moving to Bengaluru. Includes chef-prepared wholesome meals, high-speed fiber connection, daily cleaning, and zero utility bills.',
  ARRAY['No loud parties after 10:30 PM inside residential wings', 'Visitors registered at front biometric gate'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 4. BENGALURU — Whitefield
-- -----------------------------------------------------------------------------
(
  'blr-whit-04',
  'Premium 3BHK Gated Society Flat Formation (Find Together™)',
  'Team up with 2 engineers to lease a 1,800 sq ft society flat with pool',
  'groups',
  'Bengaluru',
  'Whitefield',
  'Inside Prestige Shantiniketan, 3 mins walk to ITPL',
  '{"x": 84, "y": 42}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 16500, "deposit": 16500, "maintenance": 2500, "utilitiesEstimate": 1000, "brokerage": 0}'::jsonb,
  'Next 15 Days',
  'Fully Furnished',
  '3 BHK',
  ARRAY['Olympic Pool', 'Tennis Court', 'Clubhouse & Gym', 'Covered Car Parking', 'Piped Gas', 'Modular Kitchen'],
  '{"dietary": "Flexible", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Vikram Sen", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", "role": "Room Seeker", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Cloud Architect", "company": "Amazon AWS", "responseRate": "Within 10 mins", "joinedYear": "2024"}'::jsonb,
  97,
  'Looking for 2 verified flatmates to lease an expansive 1,800 sq ft 3BHK apartment directly from owner. Save ₹1,20,000 annually per person compared to individual rentals. 1-month deposit.',
  ARRAY['Equal division of society maintenance and shared groceries', 'Respect common living spaces'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 5. MUMBAI — Bandra West
-- -----------------------------------------------------------------------------
(
  'mum-band-05',
  'Sea-Facing Heritage Loft Room in Bandra West',
  'Sun-drenched private bedroom in Pali Hill with vintage wooden floors',
  'rooms',
  'Mumbai',
  'Bandra West',
  'Near Pali Village Cafe & Carter Road Promenade',
  '{"x": 32, "y": 45}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 38000, "deposit": 38000, "maintenance": 3000, "utilitiesEstimate": 2000, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  '2 BHK',
  ARRAY['Sea Breeze Balcony', 'Silent Split AC', 'Washing Machine', 'Super-Fast Wi-Fi', 'Gated Society', 'Housemaid Daily'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": true, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Pooja Mehta", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Creative Director", "company": "Viacom18", "responseRate": "Within 20 mins", "joinedYear": "2023"}'::jsonb,
  95,
  'Rare Bandra gem! A peaceful 2BHK flat in Pali Hill with sea breeze and trees. No broker commission, 1 month refundable deposit instead of Mumbai standard 10-month lock-in.',
  ARRAY['Keep balcony plants watered', 'Society quiet hours from midnight', 'Respectful of work-from-home focus'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 6. MUMBAI — Powai
-- -----------------------------------------------------------------------------
(
  'mum-powa-06',
  'High-Floor Lake View Flatmate Opening',
  'Lake-facing room in Hiranandani Gardens, 5 mins from IIT Bombay & Powai Plaza',
  'flatmates',
  'Mumbai',
  'Powai',
  'Hiranandani Gardens near Galleria Shopping Arcade',
  '{"x": 68, "y": 30}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502005229762-ee1b2da97c0f?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 28000, "deposit": 28000, "maintenance": 2500, "utilitiesEstimate": 1500, "brokerage": 0}'::jsonb,
  'From Next Monday',
  'Fully Furnished',
  '3 BHK',
  ARRAY['Powai Lake View', 'High-Speed Wi-Fi', 'Modular Kitchen with Dishwasher', 'Gym & Clubhouse Access', 'Piped Natural Gas'],
  '{"dietary": "Pure Veg", "smoking": "No Smoking", "drinking": "Non-Drinker", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Arjun Singhal", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Quant Researcher", "company": "Morgan Stanley", "responseRate": "Within 15 mins", "joinedYear": "2024"}'::jsonb,
  93,
  'Looking for a vegetarian flatmate to occupy a sunny private bedroom with views of Powai Lake. Modern European furnishings, air-conditioning in all rooms, and direct owner contract.',
  ARRAY['Pure veg kitchen only', 'No smoking anywhere inside building premises'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 7. MUMBAI — Andheri West
-- -----------------------------------------------------------------------------
(
  'mum-andh-07',
  'Modern Executive Suite near Metro Line 2A & DN Nagar',
  'Spacious master bedroom with en-suite bath in Lokhandwala Complex',
  'rooms',
  'Mumbai',
  'Andheri West',
  'Lokhandwala Back Road, 5 mins from Metro Station',
  '{"x": 28, "y": 38}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 29000, "deposit": 29000, "maintenance": 2000, "utilitiesEstimate": 1200, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  '2 BHK',
  ARRAY['Attached Washroom', 'AC in Room', '300 Mbps Wi-Fi', 'Smart TV', 'Washing Machine', 'Cook Available'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Kunal Kapoor", "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80", "role": "Owner", "verifiedGovtId": true, "verificationBadge": "Verified Property Owner", "occupation": "Entrepreneur", "company": "Fintech", "responseRate": "Within 1 hour", "joinedYear": "2023"}'::jsonb,
  91,
  'Prime Lokhandwala flat in a peaceful lane. Walkable to cafes, grocery stores, and metro. Includes full home appliances and zero broker commission.',
  ARRAY['Cleanliness in shared common areas', 'Guests welcome with mutual notice'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 8. DELHI-NCR — Cyber City Gurgaon
-- -----------------------------------------------------------------------------
(
  'del-cyb-08',
  'Luxury High-Rise Penthouse Room opposite DLF Cyber City',
  'Modern sky apartment with panoramic expressway views, 2 mins to Rapid Metro',
  'rooms',
  'Delhi-NCR',
  'Cyber City Gurgaon',
  'DLF Phase 2 near CyberHub & Belvedere Towers',
  '{"x": 42, "y": 55}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 26000, "deposit": 26000, "maintenance": 2500, "utilitiesEstimate": 1500, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  '3 BHK',
  ARRAY['Expressway Sky Views', 'Daikin Inverter AC', 'Dual-Band 300 Mbps WiFi', 'Housekeeping Daily', 'Power Backup 100%', 'Gated Multi-Tier Security'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Aditya Varma", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Strategy Consultant", "company": "McKinsey & Co", "responseRate": "Within 10 mins", "joinedYear": "2024"}'::jsonb,
  96,
  'Prime DLF Phase 2 apartment 5 minutes walk from CyberHub offices. 100% full power backup during peak summer, modern modular kitchen, and zero broker markup.',
  ARRAY['Strictly non-smoking inside bedrooms', 'Respect work hours during WFH days'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 9. DELHI-NCR — Golf Course Road
-- -----------------------------------------------------------------------------
(
  'del-golf-09',
  'Designer Golf Course Road Flatmate Opening (Prestige High-Rise)',
  'Private bedroom with walk-in closet in Sector 54 Gurgaon near Sector 54 Metro',
  'flatmates',
  'Delhi-NCR',
  'Golf Course Road',
  'Opposite Horizon Center & One Horizon Plaza',
  '{"x": 48, "y": 68}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 28000, "deposit": 28000, "maintenance": 3000, "utilitiesEstimate": 1800, "brokerage": 0}'::jsonb,
  'From 1st Next Month',
  'Fully Furnished',
  '3 BHK',
  ARRAY['Walk-In Wardrobe', 'Swimming Pool & Squash Court', 'Attached Washroom', 'Gigabit WiFi', 'Covered Parking', 'Cook & Maid Included'],
  '{"dietary": "Flexible", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": true, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Sneha Roy", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Senior Legal Counsel", "company": "Google India", "responseRate": "Within 20 mins", "joinedYear": "2023"}'::jsonb,
  94,
  'Premium gated community on Golf Course Road. Walk to Horizon Center and Starbucks. Includes chef-cooked meals, clubhouse membership, and zero brokerage.',
  ARRAY['Cleanliness in living room and kitchen', 'Respectful community lifestyle'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 10. DELHI-NCR — Noida Sector 62
-- -----------------------------------------------------------------------------
(
  'del-noid-10',
  'Affordable Turnkey Co-Living Studio near Electronic City Metro',
  'Managed room in modern tech co-living facility with cafeteria & 24/7 power',
  'pgs',
  'Delhi-NCR',
  'Noida Sector 62',
  'Near Stellar IT Park & Fortis Hospital',
  '{"x": 75, "y": 42}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 14000, "deposit": 14000, "maintenance": 0, "utilitiesEstimate": 0, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  'PG Room',
  ARRAY['All 3 Meals Included', 'Silent AC', 'Daily Cleaning', 'High-Speed Wi-Fi', 'Biometric Security', 'No Maintenance Bills'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "No Smoking", "drinking": "Non-Drinker", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Noida Tech Living", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", "role": "PG Manager", "verifiedGovtId": true, "verificationBadge": "Verified Property Partner", "occupation": "Host", "company": "Roomzy Verified", "responseRate": "Instant (5 mins)", "joinedYear": "2024"}'::jsonb,
  90,
  'Stress-free living for techies in Noida Sector 62. All-inclusive rent covers food, electricity, air conditioning, and superfast Wi-Fi. 1-month deposit only.',
  ARRAY['No smoking inside room premises', 'ID check mandatory at check-in'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 11. PUNE — Viman Nagar
-- -----------------------------------------------------------------------------
(
  'pun-viman-11',
  'Sun-Filled Garden View Room in Viman Nagar',
  'Quiet residential flatshare 5 mins from Phoenix Marketcity & Eon Free Zone',
  'rooms',
  'Pune',
  'Viman Nagar',
  'Near Symbiosis Campus & Phoenix Marketcity',
  '{"x": 62, "y": 38}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 15000, "deposit": 15000, "maintenance": 1200, "utilitiesEstimate": 1000, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  '2 BHK',
  ARRAY['Balcony Garden View', 'AC in Bedroom', 'In-Unit Washing Machine', '300 Mbps Fiber WiFi', 'Covered Two-Wheeler Parking'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Kavita Nair", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "UX Designer", "company": "Barclays Pune", "responseRate": "Within 15 mins", "joinedYear": "2024"}'::jsonb,
  95,
  'Charming and clean 2BHK flat in prime Viman Nagar. Walking distance to supermarkets, cafes, and easy commute to Yerwada & Kharadi IT parks. No brokerage, 1-month deposit.',
  ARRAY['Keep shared kitchen clean', 'Quiet hours after 11 PM'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 12. PUNE — Hinjewadi Phase 1
-- -----------------------------------------------------------------------------
(
  'pun-hinj-12',
  'Executive Shared Living Suite opposite Infosys Circle',
  'Modern gated society apartment with clubhouse, pool & shuttle to IT park',
  'flatmates',
  'Pune',
  'Hinjewadi',
  'Opposite Infosys Gate 1 & Wipro Campus',
  '{"x": 25, "y": 55}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 13500, "deposit": 13500, "maintenance": 1500, "utilitiesEstimate": 1000, "brokerage": 0}'::jsonb,
  'From 1st Next Month',
  'Fully Furnished',
  '3 BHK',
  ARRAY['Attached Washroom', 'AC & Ceiling Fan', 'Smart TV in Hall', 'Washing Machine', 'Gym & Pool', 'Cook Service Active'],
  '{"dietary": "Flexible", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Abhishek Patil", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Software Engineer", "company": "TCS", "responseRate": "Within 15 mins", "joinedYear": "2023"}'::jsonb,
  92,
  'Looking for a flatmate to occupy a sunny private room in Megapolis / Blue Ridge Hinjewadi Phase 1. 2 minutes walk to Infosys and Tata Technologies. Zero broker commission.',
  ARRAY['Clean up kitchen after cooking', 'Smoking restricted to balcony'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 13. HYDERABAD — Gachibowli
-- -----------------------------------------------------------------------------
(
  'hyd-gach-13',
  'Premium High-Rise Suite near Financial District & Microsoft',
  'Expansive room with private bath in luxury gated society with golf simulator',
  'rooms',
  'Hyderabad',
  'Gachibowli',
  'Near WaveRock & Financial District Hub',
  '{"x": 38, "y": 62}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 19500, "deposit": 19500, "maintenance": 2000, "utilitiesEstimate": 1200, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  '3 BHK',
  ARRAY['Clubhouse & Swimming Pool', '300 Mbps Fiber Wi-Fi', 'Attached Bathroom', 'In-Unit Washer & Dryer', '100% Power Backup', 'Covered Parking'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "Balcony Only", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Siddharth Rao", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Systems Architect", "company": "Microsoft", "responseRate": "Within 10 mins", "joinedYear": "2024"}'::jsonb,
  96,
  'Luxury flatshare in Gachibowli 5 mins from Financial District. Features high ceilings, modern split ACs, high-speed fiber internet, and panoramic city views. 1-month deposit, 0 brokerage.',
  ARRAY['Respect quiet society guidelines', 'Smoking strictly on balcony'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 14. HYDERABAD — Hitec City
-- -----------------------------------------------------------------------------
(
  'hyd-hite-14',
  'Designer Flatmate Opening near Cyber Towers & Inorbit Mall',
  'Chic urban apartment with modern modular kitchen and coworking lounge',
  'flatmates',
  'Hyderabad',
  'Hitec City',
  'Behind Cyber Towers, 5 mins walk to Durgam Cheruvu Metro',
  '{"x": 52, "y": 48}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502005229762-ee1b2da97c0f?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 18000, "deposit": 18000, "maintenance": 1800, "utilitiesEstimate": 1100, "brokerage": 0}'::jsonb,
  'From 1st Next Month',
  'Fully Furnished',
  '2 BHK',
  ARRAY['Attached Washroom', 'AC in Room', '300 Mbps Fiber WiFi', 'Smart 4K TV', 'Housekeeping Service', 'Covered Parking'],
  '{"dietary": "Flexible", "smoking": "No Smoking", "drinking": "Social", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": true, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Deepika Reddy", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80", "role": "Flatmate", "verifiedGovtId": true, "verificationBadge": "Aadhaar KYC Verified", "occupation": "Data Scientist", "company": "Deloitte", "responseRate": "Within 20 mins", "joinedYear": "2023"}'::jsonb,
  94,
  'Sunny 2BHK flat in prime Madhapur / Hitec City. 500m to Metro and walkable to tech parks. Gated security, lift, inverter power backup, and turnkey appliances.',
  ARRAY['No indoor smoking', 'Pet friendly flatmate appreciated'],
  'active'
),

-- -----------------------------------------------------------------------------
-- 15. HYDERABAD — Kondapur
-- -----------------------------------------------------------------------------
(
  'hyd-kond-15',
  'Managed Tech Co-Living Room with Wholesome Meals',
  'All-inclusive PG room near Google & Botanical Garden Road',
  'pgs',
  'Hyderabad',
  'Kondapur',
  'Near Botanical Garden & 10 mins to Google Campus',
  '{"x": 45, "y": 35}'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
  ],
  '{"rent": 15000, "deposit": 15000, "maintenance": 0, "utilitiesEstimate": 0, "brokerage": 0}'::jsonb,
  'Immediately',
  'Fully Furnished',
  'PG Room',
  ARRAY['3 Meals Everyday', 'Gym Access', 'Daily Room Cleaning', 'Fast Fiber Wi-Fi', 'Biometric Gate Access', 'Zero Electricity Surcharge'],
  '{"dietary": "Veg / Non-Veg Friendly", "smoking": "No Smoking", "drinking": "Non-Drinker", "genderPreference": "Any", "wfhFriendly": true, "petFriendly": false, "lateNightsAllowed": true, "occupancyType": "Private Room"}'::jsonb,
  '{"name": "Kondapur Suites", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", "role": "PG Manager", "verifiedGovtId": true, "verificationBadge": "Verified Property Partner", "occupation": "Host", "company": "Roomzy Verified", "responseRate": "Instant (5 mins)", "joinedYear": "2024"}'::jsonb,
  91,
  'Modern managed shared-living room for tech professionals in Kondapur. High-speed Wi-Fi, chef-cooked meals, daily housekeeping, and 24/7 security. 1-month deposit only.',
  ARRAY['Visitors allowed in lobby lounge', 'Quiet hours after 11 PM'],
  'active'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  costs = EXCLUDED.costs,
  photos = EXCLUDED.photos,
  status = EXCLUDED.status,
  updated_at = NOW();
