import { Listing, VerificationRequest } from '../types';

/**
 * Live Listings - Empty initial state.
 * Real property posts are loaded directly from the Supabase 'listings' table.
 */
export const INITIAL_LISTINGS: Listing[] = [];

/**
 * Live Verification Requests - Empty initial state.
 * Populated from Supabase verification queue.
 */
export const INITIAL_VERIFICATIONS: VerificationRequest[] = [];

/**
 * Major Indian Metro Hubs & Localities
 */
export const INDIAN_METROS = [
  { 
    name: 'Bengaluru', 
    activeCount: 0, 
    tag: 'Silicon Valley of India', 
    localities: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Bellandur', 'Whitefield', 'Electronic City'] 
  },
  { 
    name: 'Mumbai', 
    activeCount: 0, 
    tag: 'Maximum City', 
    localities: ['Bandra West', 'Powai', 'Andheri West', 'Juhu', 'Worli', 'Thane West'] 
  },
  { 
    name: 'Delhi-NCR', 
    activeCount: 0, 
    tag: 'Capital Hub', 
    localities: ['Cyber City Gurgaon', 'Golf Course Road', 'Noida Sector 62', 'Hauz Khas', 'Saket'] 
  },
  { 
    name: 'Pune', 
    activeCount: 0, 
    tag: 'Oxford of the East', 
    localities: ['Koregaon Park', 'Hinjewadi', 'Viman Nagar', 'Kalyani Nagar', 'Baner'] 
  },
  { 
    name: 'Hyderabad', 
    activeCount: 0, 
    tag: 'Cyberabad', 
    localities: ['Gachibowli', 'Hitec City', 'Madhapur', 'Kondapur', 'Jubilee Hills'] 
  }
];
