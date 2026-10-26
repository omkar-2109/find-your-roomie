import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Listing, 
  CategoryType, 
  MetroCity, 
  ScheduledVisit, 
  InquiryMessage, 
  VerificationRequest,
  User,
  PendingAction
} from '../types';
import { INITIAL_LISTINGS, INITIAL_VERIFICATIONS } from '../data/mockListings';
import { supabase } from '../lib/supabase';

export type PersonaType = 'consumer' | 'business' | 'admin';
export type ViewType = 'landing' | 'marketplace' | 'listing-detail' | 'saved' | 'find-together';

interface FilterState {
  searchQuery: string;
  city: MetroCity;
  locality: string | null;
  category: CategoryType | 'all';
  priceRange: [number, number];
  gender: 'Any' | 'Male' | 'Female';
  dietary: 'All' | 'Pure Veg' | 'Veg / Non-Veg Friendly';
  furnishing: 'All' | 'Fully Furnished' | 'Semi Furnished';
  verifiedOnly: boolean;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest';
}

interface AppContextType {
  persona: PersonaType;
  setPersona: (p: PersonaType) => void;
  currentView: ViewType;
  setCurrentView: (v: ViewType) => void;
  selectedListingId: string | null;
  navigateToListing: (id: string) => void;
  goBackToMarketplace: () => void;
  
  // Auth & Guest State
  currentUser: User | null;
  isAuthModalOpen: boolean;
  pendingAction: PendingAction | null;
  openAuthModal: (action?: PendingAction, callback?: () => void) => void;
  closeAuthModal: () => void;
  loginWithPhone: (phone: string, otp: string) => boolean;
  loginWithGoogle: () => void;
  loginAsDemo: (role: 'tenant' | 'host' | 'admin') => void;
  logout: () => void;
  requireAuth: (action?: PendingAction, callback?: () => void) => boolean;

  // Filters & Search
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  isMapSplitOpen: boolean;
  toggleMapSplit: () => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
  
  // Data
  listings: Listing[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Actions
  scheduledVisits: ScheduledVisit[];
  bookVisit: (visit: Omit<ScheduledVisit, 'id' | 'createdAt' | 'status'>) => void;
  inquiries: InquiryMessage[];
  submitInquiry: (inquiry: Omit<InquiryMessage, 'id' | 'createdAt' | 'status'>) => void;
  addNewListing: (listing: Omit<Listing, 'id'>) => void;
  
  // Admin
  verifications: VerificationRequest[];
  approveVerification: (id: string) => void;
  rejectVerification: (id: string) => void;
  updateInquiryStatus: (id: string, status: InquiryMessage['status']) => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  city: 'Bengaluru',
  locality: null,
  category: 'all',
  priceRange: [5000, 70000],
  gender: 'Any',
  dietary: 'All',
  furnishing: 'All',
  verifiedOnly: false,
  sortBy: 'recommended',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const DEMO_USERS: Record<'tenant' | 'host' | 'admin', User> = {
  tenant: {
    id: 'usr-priya',
    name: 'Priya Sharma',
    phone: '+91 98450 12345',
    email: 'priya.sharma@cred.club',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'tenant',
    company: 'Lead Product Manager @ Cred',
    isAadhaarVerified: true,
    city: 'Bengaluru'
  },
  host: {
    id: 'usr-vikram',
    name: 'Vikram Swaminathan',
    phone: '+91 99801 88990',
    email: 'vikram.swami@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'host',
    company: 'Koramangala Living Co.',
    isAadhaarVerified: true,
    city: 'Bengaluru'
  },
  admin: {
    id: 'usr-ananya',
    name: 'Ananya Roy (Auditor)',
    phone: '+91 98800 11223',
    email: 'ananya.admin@roomzy.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    role: 'admin',
    company: 'Roomzy Trust & Safety Desk',
    isAadhaarVerified: true,
    city: 'Bengaluru'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const VALID_VIEWS: ViewType[] = ['landing', 'marketplace', 'listing-detail', 'saved', 'find-together'];
  const VALID_PERSONAS: PersonaType[] = ['consumer', 'business', 'admin'];

  // Initialize from URL search params if present with validation
  const getInitialState = () => {
    const params = new URLSearchParams(window.location.search);
    const rawP = params.get('persona') as PersonaType;
    const rawV = params.get('view') as ViewType;
    const p = VALID_PERSONAS.includes(rawP) ? rawP : 'consumer';
    const v = VALID_VIEWS.includes(rawV) ? rawV : 'landing';
    const id = params.get('id') || (v === 'listing-detail' ? 'blr-room-1' : null);
    return { p, v, id };
  };

  const initial = getInitialState();
  const [persona, setPersonaState] = useState<PersonaType>(initial.p);
  const [currentView, setCurrentViewState] = useState<ViewType>(initial.v);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(initial.id);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isMapSplitOpen, setIsMapSplitOpen] = useState<boolean>(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Sync with browser Back and Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const rawP = params.get('persona') as PersonaType;
      const rawV = params.get('view') as ViewType;
      const id = params.get('id');

      if (rawP && VALID_PERSONAS.includes(rawP)) {
        setPersonaState(rawP);
      }
      if (rawV && VALID_VIEWS.includes(rawV)) {
        setCurrentViewState(rawV);
      } else if (!rawV) {
        setCurrentViewState('landing');
      }
      if (id) {
        setSelectedListingId(id);
      } else if (rawV !== 'listing-detail') {
        setSelectedListingId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auth & Guest State (Default is null = Unauthenticated Guest)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('roomzy_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Supabase Auth Session Listener & Synchronization
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const user: User = {
          id: u.id,
          name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Roomzy Resident',
          email: u.email || '',
          phone: u.phone || '+91 98450 12345',
          avatar: u.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          role: 'tenant',
          company: u.user_metadata?.company || 'Verified Resident',
          isAadhaarVerified: true,
          city: filters.city
        };
        setCurrentUser(user);
        localStorage.setItem('roomzy_user', JSON.stringify(user));
      }
    }).catch((err) => {
      console.warn('Supabase auth session initialization:', err);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = session.user;
        const user: User = {
          id: u.id,
          name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Roomzy Resident',
          email: u.email || '',
          phone: u.phone || '+91 98450 12345',
          avatar: u.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          role: 'tenant',
          company: u.user_metadata?.company || 'Verified Resident',
          isAadhaarVerified: true,
          city: filters.city
        };
        setCurrentUser(user);
        localStorage.setItem('roomzy_user', JSON.stringify(user));
      } else if (!session && !localStorage.getItem('roomzy_user')) {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [filters.city]);

  const openAuthModal = (action?: PendingAction, callback?: () => void) => {
    if (action) setPendingAction(action);
    if (callback) setPendingCallback(() => callback);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const resumePendingAction = (user: User) => {
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    if (pendingAction) {
      if (pendingAction.type === 'visit' && pendingAction.payload) {
        bookVisit(pendingAction.payload);
      } else if (pendingAction.type === 'inquiry' && pendingAction.payload) {
        submitInquiry({
          ...pendingAction.payload,
          userName: user.name,
          userPhone: user.phone,
          userEmail: user.email
        });
      } else if (pendingAction.type === 'save' && pendingAction.listingId) {
        toggleFavorite(pendingAction.listingId);
      } else if (pendingAction.type === 'host') {
        setPersona('business');
      }
      setPendingAction(null);
    }
  };

  const loginWithPhone = (phone: string, _otp: string): boolean => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name: phone === '9845012345' || phone === '+91 98450 12345' ? 'Priya Sharma' : `Resident ${phone.slice(-4)}`,
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: `${phone.replace(/\D/g, '').slice(-10)}@user.roomzy.in`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'tenant',
      company: 'Tech Professional',
      isAadhaarVerified: true,
      city: filters.city
    };
    setCurrentUser(user);
    localStorage.setItem('roomzy_user', JSON.stringify(user));
    setIsAuthModalOpen(false);
    resumePendingAction(user);
    return true;
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch {
      // Graceful fallback to verified tenant profile if redirect URL is unconfigured
      const user: User = DEMO_USERS.tenant;
      setCurrentUser(user);
      localStorage.setItem('roomzy_user', JSON.stringify(user));
      setIsAuthModalOpen(false);
      resumePendingAction(user);
    }
  };

  const loginAsDemo = (role: 'tenant' | 'host' | 'admin') => {
    const user = DEMO_USERS[role];
    setCurrentUser(user);
    localStorage.setItem('roomzy_user', JSON.stringify(user));
    if (role === 'host') {
      setPersona('business');
    } else if (role === 'admin') {
      setPersona('admin');
    } else {
      setPersona('consumer');
    }
    setIsAuthModalOpen(false);
    resumePendingAction(user);
  };

  const logout = () => {
    supabase.auth.signOut().catch(() => {});
    setCurrentUser(null);
    localStorage.removeItem('roomzy_user');
    setPersona('consumer');
    setCurrentView('landing');
  };

  const requireAuth = (action?: PendingAction, callback?: () => void): boolean => {
    if (currentUser) {
      callback?.();
      return true;
    }
    openAuthModal(action, callback);
    return false;
  };


  const setPersona = (p: PersonaType) => {
    setPersonaState(p);
    const url = new URL(window.location.href);
    url.searchParams.set('persona', p);
    window.history.pushState({}, '', url.toString());
  };

  const setCurrentView = (v: ViewType) => {
    setCurrentViewState(v);
    const url = new URL(window.location.href);
    url.searchParams.set('view', v);
    if (v !== 'listing-detail') url.searchParams.delete('id');
    window.history.pushState({}, '', url.toString());
  };

  // LocalStorage-backed state
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem('roomzy_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('roomzy_favorites');
      return saved ? JSON.parse(saved) : ['blr-room-1', 'blr-flatmate-1'];
    } catch {
      return ['blr-room-1', 'blr-flatmate-1'];
    }
  });

  const [scheduledVisits, setScheduledVisits] = useState<ScheduledVisit[]>(() => {
    try {
      const saved = localStorage.getItem('roomzy_visits');
      return saved ? JSON.parse(saved) : [
        {
          id: 'vis-demo-1',
          listingId: 'blr-room-1',
          listingTitle: 'Sunlit Master Bedroom with Balcony in Koramangala 4th Block',
          locality: 'Koramangala 4th Block, Bengaluru',
          date: 'Tomorrow, 5:30 PM',
          timeSlot: 'Evening Slot (5:00 PM - 7:00 PM)',
          visitType: 'In-Person',
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  const [inquiries, setInquiries] = useState<InquiryMessage[]>(() => {
    try {
      const saved = localStorage.getItem('roomzy_inquiries');
      return saved ? JSON.parse(saved) : [
        {
          id: 'inq-demo-1',
          listingId: 'blr-room-1',
          listingTitle: 'Sunlit Master Bedroom in Koramangala',
          hostName: 'Aditya Kashyap',
          userName: 'Rahul Nair',
          userPhone: '+91 98450 12345',
          userEmail: 'rahul.nair@gmail.com',
          moveInDate: '1st Nov 2026',
          message: 'Hi Aditya, love the place! I work at PhonePe nearby. Is the cook included?',
          status: 'New',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  const [verifications, setVerifications] = useState<VerificationRequest[]>(() => {
    try {
      const saved = localStorage.getItem('roomzy_verifications');
      return saved ? JSON.parse(saved) : INITIAL_VERIFICATIONS;
    } catch {
      return INITIAL_VERIFICATIONS;
    }
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('roomzy_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('roomzy_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('roomzy_visits', JSON.stringify(scheduledVisits));
  }, [scheduledVisits]);

  useEffect(() => {
    localStorage.setItem('roomzy_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('roomzy_verifications', JSON.stringify(verifications));
  }, [verifications]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const navigateToListing = (id: string) => {
    setSelectedListingId(id);
    setCurrentViewState('listing-detail');
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'listing-detail');
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToMarketplace = () => {
    setSelectedListingId(null);
    setCurrentViewState('marketplace');
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'marketplace');
    url.searchParams.delete('id');
    window.history.pushState({}, '', url.toString());
  };

  const toggleMapSplit = () => {
    setIsMapSplitOpen(prev => !prev);
  };

  const bookVisit = (data: Omit<ScheduledVisit, 'id' | 'createdAt' | 'status'>) => {
    const newVisit: ScheduledVisit = {
      ...data,
      id: `vis-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setScheduledVisits(prev => [newVisit, ...prev]);
  };

  const submitInquiry = (data: Omit<InquiryMessage, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: InquiryMessage = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const addNewListing = (data: Omit<Listing, 'id'>) => {
    const newListing: Listing = {
      ...data,
      id: `listing-${Date.now()}`
    };
    setListings(prev => [newListing, ...prev]);
  };

  const approveVerification = (id: string) => {
    setVerifications(prev => 
      prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v)
    );
  };

  const rejectVerification = (id: string) => {
    setVerifications(prev => 
      prev.map(v => v.id === id ? { ...v, status: 'Rejected' } : v)
    );
  };

  const updateInquiryStatus = (id: string, status: InquiryMessage['status']) => {
    setInquiries(prev => 
      prev.map(inq => inq.id === id ? { ...inq, status } : inq)
    );
  };

  return (
    <AppContext.Provider value={{
      persona,
      setPersona,
      currentView,
      setCurrentView,
      selectedListingId,
      navigateToListing,
      goBackToMarketplace,
      
      // Auth & Guest
      currentUser,
      isAuthModalOpen,
      pendingAction,
      openAuthModal,
      closeAuthModal,
      loginWithPhone,
      loginWithGoogle,
      loginAsDemo,
      logout,
      requireAuth,

      filters,
      updateFilter,
      resetFilters,
      isMapSplitOpen,
      toggleMapSplit,
      isFilterDrawerOpen,
      setIsFilterDrawerOpen,
      listings,
      favorites,
      toggleFavorite,
      isFavorite,
      scheduledVisits,
      bookVisit,
      inquiries,
      submitInquiry,
      addNewListing,
      verifications,
      approveVerification,
      rejectVerification,
      updateInquiryStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
