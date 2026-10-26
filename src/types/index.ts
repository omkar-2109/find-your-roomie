export type CategoryType = 
  | 'rooms' 
  | 'flatmates' 
  | 'wanted' 
  | 'groups' 
  | 'flats' 
  | 'pgs';

export type MetroCity = 
  | 'Bengaluru' 
  | 'Mumbai' 
  | 'Delhi-NCR' 
  | 'Pune' 
  | 'Hyderabad';

export type UserCategory = 
  | 'student' 
  | 'working_professional' 
  | 'job_seeker' 
  | 'founder_freelancer';

export interface CostBreakdown {
  rent: number;
  deposit: number;
  maintenance: number;
  utilitiesEstimate: number;
  brokerage: number; // Always 0 in Roomzy
}

export interface LifestylePreferences {
  dietary: 'Pure Veg' | 'Veg / Non-Veg Friendly' | 'Flexible';
  smoking: 'No Smoking' | 'Balcony Only' | 'Allowed';
  drinking: 'Non-Drinker' | 'Social' | 'Allowed';
  genderPreference: 'Male' | 'Female' | 'Any';
  wfhFriendly: boolean;
  petFriendly: boolean;
  lateNightsAllowed: boolean;
  occupancyType: 'Private Room' | 'Shared Room' | 'Whole Flat';
}

export interface HostProfile {
  id: string;
  name: string;
  avatar: string;
  role: 'Flatmate' | 'Owner' | 'PG Manager' | 'Room Seeker';
  age?: number;
  occupation?: string;
  company?: string;
  verifiedGovtId: boolean;
  verificationBadge: string;
  responseRate: string;
  joinedYear: string;
}

export interface Listing {
  id: string;
  title: string;
  tagline: string;
  category: CategoryType;
  city: MetroCity;
  locality: string;
  landmark: string;
  coordinates: { x: number; y: number }; // Relative map positioning 0-100%
  photos: string[];
  costs: CostBreakdown;
  availableFrom: string;
  furnishing: 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';
  bhk: '1 RK' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'PG Room';
  amenities: string[];
  preferences: LifestylePreferences;
  host: HostProfile;
  compatibilityScore?: number;
  description: string;
  houseRules: string[];
  nearbyHubs: { name: string; distance: string; travelTime: string }[];
  isVerified: boolean;
  featured?: boolean;
  // Group specific
  groupMembers?: { name: string; avatar: string; role: string; budget: number }[];
  groupLookingFor?: string;
}

export interface ScheduledVisit {
  id: string;
  listingId: string;
  listingTitle: string;
  locality: string;
  date: string;
  timeSlot: string;
  visitType: 'In-Person' | 'Video Call';
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface InquiryMessage {
  id: string;
  listingId: string;
  listingTitle: string;
  hostName: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  moveInDate: string;
  message: string;
  status: 'New' | 'Contacted' | 'Visit Booked' | 'Closed';
  createdAt: string;
}

export interface VerificationRequest {
  id: string;
  userName: string;
  userRole: string;
  idType: 'Aadhaar (Masked)' | 'Passport' | 'Electricity Bill';
  submittedDate: string;
  documentPreview: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  role: 'tenant' | 'host' | 'admin';
  company?: string;
  isAadhaarVerified: boolean;
  city: MetroCity;
  userCategory?: UserCategory;
}

export type PendingActionType = 'visit' | 'inquiry' | 'save' | 'host';

export interface PendingAction {
  type: PendingActionType;
  listingId?: string;
  payload?: any;
}

export interface FlatmateProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  city: MetroCity;
  targetLocalities: string[];
  budgetMax: number;
  moveInDate: string;
  lookingForBHK: '1 Room in Shared Flat' | '2 BHK' | '3 BHK' | 'Any';
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Any';
  occupation: string;
  userCategory: UserCategory;
  companyOrCollege: string;
  isAadhaarVerified: boolean;
  lifestyle: LifestylePreferences;
  bio: string;
  compatibilityScore?: number;
  lookingForFlatmateGender?: 'Male' | 'Female' | 'Any';
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  createdAt: string;
  type?: 'text' | 'teamup_proposal';
  metadata?: {
    listingId?: string;
    listingTitle?: string;
    rentPerPerson?: number;
    locality?: string;
    bhk?: string;
    photo?: string;
    accepted?: boolean;
  };
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: Record<string, string>;
  participantAvatars: Record<string, string>;
  participantRoles: Record<string, string>;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  listingId?: string;
  listingTitle?: string;
}

