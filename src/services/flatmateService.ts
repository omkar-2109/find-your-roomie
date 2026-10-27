import { supabase } from '../lib/supabase';
import { FlatmateProfile, MetroCity, LifestylePreferences } from '../types';

const LOCAL_FLATMATES_KEY = 'roomzy_cached_flatmate_profiles';

export const INITIAL_DEMO_FLATMATES: FlatmateProfile[] = [
  {
    id: 'flt-ananya-sharma',
    userId: 'user-ananya-sharma',
    name: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    city: 'Bengaluru',
    targetLocalities: ['Koramangala', 'Indiranagar', 'HSR Layout'],
    budgetMax: 20000,
    moveInDate: 'Within 2 Weeks',
    lookingForBHK: '2 BHK',
    gender: 'Female',
    occupation: 'Product Designer',
    userCategory: 'working_professional',
    companyOrCollege: 'Razorpay',
    workOrCollegeEmail: 'ananya@razorpay.com',
    isWorkVerified: true,
    verificationBadge: 'Verified Professional',
    isAadhaarVerified: true,
    lifestyle: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'No Smoking',
      drinking: 'Social',
      genderPreference: 'Female',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    bio: 'Looking for a chill, clean flatmate to team up and lease a spacious 2BHK. I love plants, weekend brunches, and keep common spaces spotless.',
    compatibilityScore: 96,
    lookingForFlatmateGender: 'Female'
  },
  {
    id: 'flt-rohit-mehta',
    userId: 'user-rohit-mehta',
    name: 'Rohit Mehta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    city: 'Bengaluru',
    targetLocalities: ['HSR Layout', 'Bellandur', 'Sarjapur Road'],
    budgetMax: 22000,
    moveInDate: '1st of Next Month',
    lookingForBHK: '3 BHK',
    gender: 'Male',
    occupation: 'Backend Engineer',
    userCategory: 'working_professional',
    companyOrCollege: 'Swiggy',
    workOrCollegeEmail: 'rohit@swiggy.in',
    isWorkVerified: true,
    verificationBadge: 'Verified Professional',
    isAadhaarVerified: true,
    lifestyle: {
      dietary: 'Pure Veg',
      smoking: 'No Smoking',
      drinking: 'Non-Drinker',
      genderPreference: 'Male',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: false,
      occupancyType: 'Private Room'
    },
    bio: 'Software engineer looking for like-minded vegetarian working professionals to team up for a modern gated society in HSR with gym and power backup.',
    compatibilityScore: 92,
    lookingForFlatmateGender: 'Male'
  },
  {
    id: 'flt-priya-nair',
    userId: 'user-priya-nair',
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    city: 'Mumbai',
    targetLocalities: ['Bandra West', 'Khar', 'Santacruz'],
    budgetMax: 30000,
    moveInDate: 'Immediately',
    lookingForBHK: '2 BHK',
    gender: 'Female',
    occupation: 'Brand Strategist',
    userCategory: 'working_professional',
    companyOrCollege: 'Dentsu Creative',
    workOrCollegeEmail: 'priya@dentsu.com',
    isWorkVerified: true,
    verificationBadge: 'Verified Professional',
    isAadhaarVerified: true,
    lifestyle: {
      dietary: 'Flexible',
      smoking: 'Balcony Only',
      drinking: 'Social',
      genderPreference: 'Female',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    bio: 'Creative agency lead moving from Delhi to Mumbai. Looking for an energetic flatmate to share a sunlit flat close to cafes and train station.',
    compatibilityScore: 94,
    lookingForFlatmateGender: 'Female'
  },
  {
    id: 'flt-aditya-kulkarni',
    userId: 'user-aditya-kulkarni',
    name: 'Aditya Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    city: 'Mumbai',
    targetLocalities: ['Powai', 'Andheri East', 'Kanjurmarg'],
    budgetMax: 25000,
    moveInDate: 'Flexible',
    lookingForBHK: '2 BHK',
    gender: 'Male',
    occupation: 'AI Research Scholar',
    userCategory: 'student',
    companyOrCollege: 'IIT Bombay',
    workOrCollegeEmail: 'aditya@iitb.ac.in',
    isCollegeVerified: true,
    verificationBadge: 'Verified Student',
    isAadhaarVerified: true,
    lifestyle: {
      dietary: 'Veg / Non-Veg Friendly',
      smoking: 'No Smoking',
      drinking: 'Social',
      genderPreference: 'Male',
      wfhFriendly: true,
      petFriendly: false,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    bio: 'PhD researcher at IITB. Clean habits, quiet hours during weekdays, looking for someone respectful to share a 2BHK near Hiranandani.',
    compatibilityScore: 91,
    lookingForFlatmateGender: 'Male'
  },
  {
    id: 'flt-varun-teja',
    userId: 'user-varun-teja',
    name: 'Varun Teja',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    city: 'Hyderabad',
    targetLocalities: ['Gachibowli', 'Financial District', 'Madhapur'],
    budgetMax: 18000,
    moveInDate: 'Within 10 Days',
    lookingForBHK: '3 BHK',
    gender: 'Male',
    occupation: 'Fintech Analyst',
    userCategory: 'working_professional',
    companyOrCollege: 'Goldman Sachs',
    workOrCollegeEmail: 'varun@gs.com',
    isWorkVerified: true,
    verificationBadge: 'Verified Professional',
    isAadhaarVerified: true,
    lifestyle: {
      dietary: 'Flexible',
      smoking: 'No Smoking',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    bio: 'Analyst working at Financial District. Looking for chill flatmates who like weekend board games and keep living area organized.',
    compatibilityScore: 95,
    lookingForFlatmateGender: 'Any'
  },
  {
    id: 'flt-simran-kaur',
    userId: 'user-simran-kaur',
    name: 'Simran Kaur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    city: 'Delhi-NCR',
    targetLocalities: ['DLF Phase 5', 'Golf Course Road', 'Sector 43 Gurgaon'],
    budgetMax: 26000,
    moveInDate: '1st of Next Month',
    lookingForBHK: '2 BHK',
    gender: 'Female',
    occupation: 'Management Consultant',
    userCategory: 'working_professional',
    companyOrCollege: 'BCG Gurgaon',
    workOrCollegeEmail: 'simran@bcg.com',
    isWorkVerified: true,
    verificationBadge: 'Verified Professional',
    isAadhaarVerified: true,
    lifestyle: {
      dietary: 'Pure Veg',
      smoking: 'No Smoking',
      drinking: 'Non-Drinker',
      genderPreference: 'Female',
      wfhFriendly: false,
      petFriendly: false,
      lateNightsAllowed: false,
      occupancyType: 'Private Room'
    },
    bio: 'Consultant working in Cyber City. High hygiene standards, mostly in office on weekdays. Want a peaceful, safe high-rise apartment.',
    compatibilityScore: 93,
    lookingForFlatmateGender: 'Female'
  }
];

export function getLocalFlatmates(): FlatmateProfile[] {
  try {
    const raw = localStorage.getItem(LOCAL_FLATMATES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse local flatmate profiles:', e);
  }
  return INITIAL_DEMO_FLATMATES;
}

export function saveLocalFlatmates(profiles: FlatmateProfile[]) {
  try {
    localStorage.setItem(LOCAL_FLATMATES_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error('Failed to save local flatmate profiles:', e);
  }
}

/**
 * Calculates lifestyle compatibility match score (percentage 70% - 98%)
 */
export function calculateLifestyleMatch(
  userPref: Partial<LifestylePreferences> | undefined,
  candidatePref: Partial<LifestylePreferences> | undefined
): number {
  if (!userPref || !candidatePref) return 92;

  let score = 75;
  if (userPref.dietary === candidatePref.dietary || userPref.dietary === 'Flexible' || candidatePref.dietary === 'Flexible') {
    score += 8;
  }
  if (userPref.smoking === candidatePref.smoking) {
    score += 6;
  }
  if (userPref.petFriendly === candidatePref.petFriendly) {
    score += 5;
  }
  if (userPref.wfhFriendly === candidatePref.wfhFriendly) {
    score += 4;
  }

  return Math.min(score, 98);
}

/**
 * Fetch all flatmate profiles filtered by city
 */
export async function fetchFlatmateProfiles(city?: MetroCity): Promise<FlatmateProfile[]> {
  const localList = getLocalFlatmates();

  if (!supabase) {
    return city ? localList.filter(p => p.city === city) : localList;
  }

  try {
    let query = supabase
      .from('flatmate_profiles')
      .select('*')
      .eq('status', 'active');

    if (city) {
      query = query.eq('city', city);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return city ? localList.filter(p => p.city === city) : localList;
    }

    const mapped: FlatmateProfile[] = data.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      name: row.full_name,
      avatar: row.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      city: row.city as MetroCity,
      targetLocalities: row.target_localities || [],
      budgetMax: row.budget_max || 20000,
      moveInDate: row.move_in_date || 'Flexible',
      lookingForBHK: row.looking_for_bhk || '2 BHK',
      gender: row.gender || 'Any',
      occupation: row.occupation || 'Working Professional',
      userCategory: row.user_category || 'working_professional',
      companyOrCollege: row.company_or_college || 'Tech / Startup',
      isAadhaarVerified: true,
      lifestyle: row.lifestyle || {
        dietary: 'Flexible',
        smoking: 'No Smoking',
        drinking: 'Social',
        genderPreference: 'Any',
        wfhFriendly: true,
        petFriendly: false,
        lateNightsAllowed: true,
        occupancyType: 'Private Room'
      },
      bio: row.bio || 'Looking for a flatmate to share an apartment on Roomzy.',
      compatibilityScore: 92
    }));

    // Merge with any local user profile not yet in Supabase
    const userOwned = localList.filter(p => p.userId.startsWith('user-custom-'));
    return [...userOwned, ...mapped];
  } catch (err) {
    return city ? localList.filter(p => p.city === city) : localList;
  }
}

/**
 * Create or update the current user's Flatmate Search Profile
 */
export async function saveUserFlatmateProfile(
  profileData: Partial<FlatmateProfile>
): Promise<FlatmateProfile> {
  const all = getLocalFlatmates();
  const existingIdx = all.findIndex(p => p.userId === profileData.userId);

  const updated: FlatmateProfile = {
    id: existingIdx >= 0 ? all[existingIdx].id : 'flt-' + Date.now(),
    userId: profileData.userId || 'current-user-id',
    name: profileData.name || 'Roomzy Resident',
    avatar: profileData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    city: profileData.city || 'Bengaluru',
    targetLocalities: profileData.targetLocalities || ['Koramangala', 'HSR Layout'],
    budgetMax: profileData.budgetMax || 20000,
    moveInDate: profileData.moveInDate || 'Within 2 Weeks',
    lookingForBHK: profileData.lookingForBHK || '2 BHK',
    gender: profileData.gender || 'Any',
    occupation: profileData.occupation || 'Working Professional',
    userCategory: profileData.userCategory || 'working_professional',
    companyOrCollege: profileData.companyOrCollege || 'Tech Co',
    isAadhaarVerified: profileData.isAadhaarVerified ?? true,
    lifestyle: profileData.lifestyle || {
      dietary: 'Flexible',
      smoking: 'No Smoking',
      drinking: 'Social',
      genderPreference: 'Any',
      wfhFriendly: true,
      petFriendly: true,
      lateNightsAllowed: true,
      occupancyType: 'Private Room'
    },
    bio: profileData.bio || 'Looking to team up for a flat with verified roommates.',
    compatibilityScore: 95
  };

  if (existingIdx >= 0) {
    all[existingIdx] = updated;
  } else {
    all.unshift(updated);
  }
  saveLocalFlatmates(all);

  if (supabase && profileData.userId) {
    try {
      await supabase.from('flatmate_profiles').upsert({
        id: updated.id,
        user_id: updated.userId,
        full_name: updated.name,
        avatar_url: updated.avatar,
        city: updated.city,
        target_localities: updated.targetLocalities,
        budget_max: updated.budgetMax,
        move_in_date: updated.moveInDate,
        looking_for_bhk: updated.lookingForBHK,
        gender: updated.gender,
        occupation: updated.occupation,
        user_category: updated.userCategory,
        company_or_college: updated.companyOrCollege,
        lifestyle: updated.lifestyle,
        bio: updated.bio,
        status: 'active',
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    } catch (e) {
      console.warn('Supabase flatmate profile upsert deferred:', e);
    }
  }

  return updated;
}
