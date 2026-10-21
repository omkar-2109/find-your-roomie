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
}

export type PendingActionType = 'visit' | 'inquiry' | 'save' | 'host';

export interface PendingAction {
  type: PendingActionType;
  listingId?: string;
  payload?: any;
}

