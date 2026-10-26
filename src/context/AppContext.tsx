import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Listing, 
  CategoryType, 
  MetroCity, 
  ScheduledVisit, 
  InquiryMessage, 
  VerificationRequest,
  User,
  PendingAction,
  FlatmateProfile,
  ChatMessage,
  Conversation
} from '../types';
import { supabase } from '../lib/supabase';
import { 
  fetchListings, 
  createListing, 
  scheduleVisit as apiScheduleVisit, 
  submitInquiry as apiSubmitInquiry,
  seedStarterListings
} from '../services/listingService';
import {
  fetchUserConversations,
  fetchConversationMessages,
  sendChatMessage,
  getOrCreateConversation
} from '../services/chatService';
import {
  fetchFlatmateProfiles,
  saveUserFlatmateProfile,
  calculateLifestyleMatch
} from '../services/flatmateService';

export type PersonaType = 'consumer' | 'business' | 'admin';
export type ViewType = 'landing' | 'marketplace' | 'listing-detail' | 'saved' | 'find-together' | 'oauth-consent';

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
  
  // Real Supabase Auth
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthModalOpen: boolean;
  pendingAction: PendingAction | null;
  openAuthModal: (action?: PendingAction, callback?: () => void) => void;
  closeAuthModal: () => void;
  signUpWithEmail: (email: string, password: string, fullName: string, role?: 'tenant' | 'host') => Promise<{ success: boolean; error?: string }>;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ success: boolean; error?: string }>;
  signInWithPhone: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyPhoneOtp: (phone: string, token: string) => Promise<{ success: boolean; error?: string }>;
  loginWithPhone: (phone: string, otp: string) => boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  requireAuth: (action?: PendingAction, callback?: () => void) => boolean;

  // Onboarding & KYC Wizard
  isOnboardingModalOpen: boolean;
  onboardingInitialRole: 'tenant' | 'host';
  openOnboardingModal: (role?: 'tenant' | 'host') => void;
  closeOnboardingModal: () => void;

  // Filters & Search
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  isMapSplitOpen: boolean;
  toggleMapSplit: () => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
  
  // Live Data
  listings: Listing[];
  isLoadingListings: boolean;
  refetchListings: () => Promise<void>;
  seedDemoListings: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Actions
  scheduledVisits: ScheduledVisit[];
  bookVisit: (visit: Omit<ScheduledVisit, 'id' | 'createdAt' | 'status'>) => void;
  inquiries: InquiryMessage[];
  submitInquiry: (inquiry: Omit<InquiryMessage, 'id' | 'createdAt' | 'status'>) => void;
  addNewListing: (listing: Omit<Listing, 'id'>) => Promise<Listing | null>;
  
  // Admin / Verifications
  verifications: VerificationRequest[];
  approveVerification: (id: string) => void;
  rejectVerification: (id: string) => void;
  updateInquiryStatus: (id: string, status: InquiryMessage['status']) => void;

  // In-App Direct Chat Hub
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  activeMessages: ChatMessage[];
  isChatOpen: boolean;
  unreadMessagesCount: number;
  openChat: (conversationId?: string, targetUser?: { id: string; name: string; avatar: string; role: string }, listingContext?: { id: string; title: string }) => Promise<void>;
  closeChat: () => void;
  sendMessage: (text: string, type?: 'text' | 'teamup_proposal', metadata?: any) => Promise<void>;

  // Roommate Finding & Lifestyle Matching
  flatmateProfiles: FlatmateProfile[];
  saveFlatmateProfile: (profile: Partial<FlatmateProfile>) => Promise<void>;
  calculateMatchScore: (candidateLifestyle?: any) => number;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  city: 'Bengaluru',
  locality: null,
  category: 'all',
  priceRange: [5000, 80000],
  gender: 'Any',
  dietary: 'All',
  furnishing: 'All',
  verifiedOnly: false,
  sortBy: 'recommended',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const VALID_VIEWS: ViewType[] = ['landing', 'marketplace', 'listing-detail', 'saved', 'find-together', 'oauth-consent'];
  const VALID_PERSONAS: PersonaType[] = ['consumer', 'business', 'admin'];

  // Initialize from URL pathname or search params with validation
  const getInitialState = () => {
    const cleanPath = window.location.pathname.replace(/\/+/g, '/');
    const isConsentPath = cleanPath === '/oauth/consent' || cleanPath.startsWith('/oauth/consent');
    const params = new URLSearchParams(window.location.search);
    const rawP = params.get('persona') as PersonaType;
    const rawV = params.get('view') as ViewType;

    if (isConsentPath || rawV === 'oauth-consent') {
      return { p: 'consumer' as PersonaType, v: 'oauth-consent' as ViewType, id: null };
    }

    const p = VALID_PERSONAS.includes(rawP) ? rawP : 'consumer';
    const v = VALID_VIEWS.includes(rawV) ? rawV : 'landing';
    const id = params.get('id') || (v === 'listing-detail' ? null : null);
    return { p, v, id };
  };

  const getInitialFilters = (): FilterState => {
    try {
      const savedCity = localStorage.getItem('roomzy_preferred_city') as MetroCity;
      if (savedCity && ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'].includes(savedCity)) {
        return { ...DEFAULT_FILTERS, city: savedCity };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_FILTERS;
  };

  const initial = getInitialState();
  const [persona, setPersonaState] = useState<PersonaType>(initial.p);
  const [currentView, setCurrentViewState] = useState<ViewType>(initial.v);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(initial.id);
  const [filters, setFilters] = useState<FilterState>(getInitialFilters);
  const [isMapSplitOpen, setIsMapSplitOpen] = useState<boolean>(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Sync with browser Back and Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const cleanPath = window.location.pathname.replace(/\/+/g, '/');
      const isConsentPath = cleanPath === '/oauth/consent' || cleanPath.startsWith('/oauth/consent');
      const params = new URLSearchParams(window.location.search);
      const rawP = params.get('persona') as PersonaType;
      const rawV = params.get('view') as ViewType;
      const id = params.get('id');

      if (isConsentPath || rawV === 'oauth-consent') {
        setCurrentViewState('oauth-consent');
        return;
      }

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

  // Auth & Guest State
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

  // Global-Grade Onboarding & KYC Wizard State
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState<boolean>(false);
  const [onboardingInitialRole, setOnboardingInitialRole] = useState<'tenant' | 'host'>('tenant');

  const openOnboardingModal = (role: 'tenant' | 'host' = 'tenant') => {
    setOnboardingInitialRole(role);
    setIsOnboardingModalOpen(true);
  };

  const closeOnboardingModal = () => {
    setIsOnboardingModalOpen(false);
  };

  // Supabase Auth Session Listener & Synchronization
  useEffect(() => {
    const syncUserSession = async (userRecord: any) => {
      if (!userRecord) {
        setCurrentUser(null);
        localStorage.removeItem('roomzy_user');
        return;
      }

      // Sourced profile data from auth metadata or public.profiles
      const metadata = userRecord.user_metadata || {};
      const user: User = {
        id: userRecord.id,
        name: metadata.full_name || userRecord.email?.split('@')[0] || 'Roomzy Resident',
        email: userRecord.email || '',
        phone: userRecord.phone || metadata.phone || '',
        avatar: metadata.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        role: metadata.role || 'tenant',
        company: metadata.company || 'Verified Resident',
        isAadhaarVerified: Boolean(metadata.is_aadhaar_verified),
        city: metadata.city || filters.city
      };

      setCurrentUser(user);
      localStorage.setItem('roomzy_user', JSON.stringify(user));

      // Try fetching profile from public.profiles table if exists
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userRecord.id)
          .maybeSingle();

        if (profile) {
          const updatedUser: User = {
            ...user,
            name: profile.full_name || user.name,
            role: (profile.role as any) || user.role,
            avatar: profile.avatar_url || user.avatar,
            company: profile.company || user.company,
            city: profile.city || user.city,
            isAadhaarVerified: Boolean(profile.is_aadhaar_verified),
            userCategory: profile.user_category || user.userCategory
          };
          setCurrentUser(updatedUser);
          localStorage.setItem('roomzy_user', JSON.stringify(updatedUser));
          if (profile.city) {
            localStorage.setItem('roomzy_preferred_city', profile.city);
            setFilters(prev => ({ ...prev, city: profile.city }));
          }
        }
      } catch {
        // Ignored if profiles table not created yet
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        syncUserSession(session.user);
      }
    }).catch((err) => {
      console.warn('Supabase auth session sync:', err);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        syncUserSession(session.user);
      } else if (!session) {
        setCurrentUser(null);
        localStorage.removeItem('roomzy_user');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [filters.city]);

  // Live Database Listings State
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState<boolean>(true);

  const loadListings = async () => {
    setIsLoadingListings(true);
    try {
      const liveListings = await fetchListings();
      setListings(liveListings);
    } catch (err) {
      console.warn('Unable to load listings:', err);
      setListings([]);
    } finally {
      setIsLoadingListings(false);
    }
  };

  const seedDemoListings = async () => {
    setIsLoadingListings(true);
    try {
      const seeded = await seedStarterListings();
      setListings(seeded);
    } catch (err) {
      console.warn('Seed demo listings notice:', err);
    } finally {
      setIsLoadingListings(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

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

  // 1. Sign Up with Email and Password
  const signUpWithEmail = async (email: string, password: string, fullName: string, role: 'tenant' | 'host' = 'tenant') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            city: filters.city,
          }
        }
      });
      if (error) return { success: false, error: error.message };
      if (data?.user) {
        closeAuthModal();
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  // 2. Sign In with Email and Password
  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) return { success: false, error: error.message };
      if (data?.user) {
        closeAuthModal();
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  // 3. Passwordless Magic Link / Email OTP
  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send magic link' };
    }
  };

  // 4. Phone SMS OTP Sign In
  const signInWithPhone = async (phone: string) => {
    try {
      const cleanPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\D/g, '')}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: cleanPhone
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send SMS OTP' };
    }
  };

  // 5. Verify Phone OTP
  const verifyPhoneOtp = async (phone: string, token: string) => {
    try {
      const cleanPhone = phone.startsWith('+') ? phone : `+91${phone.replace(/\D/g, '')}`;
      const { data, error } = await supabase.auth.verifyOtp({
        phone: cleanPhone,
        token,
        type: 'sms'
      });
      if (error) return { success: false, error: error.message };
      if (data?.user) {
        closeAuthModal();
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Invalid verification code' };
    }
  };

  // Fallback helper for existing phone components
  const loginWithPhone = (phone: string, _otp: string): boolean => {
    signInWithPhone(phone);
    return true;
  };

  // 6. Google OAuth
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.warn('Google OAuth notice:', err);
    }
  };

  const logout = () => {
    supabase.auth.signOut().catch(() => {});
    setCurrentUser(null);
    localStorage.removeItem('roomzy_user');
    setPersona('consumer');
    setCurrentView('landing');
  };

  const requireAuth = (action?: PendingAction, callback?: () => void): boolean => {
    if (!currentUser) {
      openAuthModal(action, callback);
      return false;
    }
    return true;
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'city' && typeof value === 'string') {
      try {
        localStorage.setItem('roomzy_preferred_city', value);
      } catch (e) {
        console.warn('Could not save preferred city:', e);
      }
      if (currentUser?.id) {
        supabase
          .from('profiles')
          .update({ city: value, updated_at: new Date().toISOString() })
          .eq('id', currentUser.id)
          .then(({ error }) => {
            if (error) console.warn('Could not update profile city:', error.message);
          });
        setCurrentUser(prev => prev ? { ...prev, city: value as MetroCity } : null);
      }
    }
  };

  const resetFilters = () => {
    let savedCity: MetroCity = 'Bengaluru';
    try {
      const stored = localStorage.getItem('roomzy_preferred_city') as MetroCity;
      if (stored && ['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'].includes(stored)) {
        savedCity = stored;
      }
    } catch {}
    setFilters({ ...DEFAULT_FILTERS, city: savedCity });
  };

  const setPersona = (p: PersonaType) => {
    // 1. Strict RBAC Gate for Admin: Only user with role === 'admin' can access Admin Desk
    if (p === 'admin') {
      if (!currentUser || currentUser.role !== 'admin') {
        console.warn('Unauthorized access: Admin clearance required.');
        return;
      }
    }
    // 2. Strict RBAC Gate for Host Workspace: Only user with role === 'host' | 'admin' can access
    if (p === 'business') {
      if (!currentUser || (currentUser.role !== 'host' && currentUser.role !== 'admin')) {
        console.warn('Tenant access redirected to Host Onboarding Wizard.');
        openOnboardingModal('host');
        return;
      }
    }

    setPersonaState(p);
    const url = new URL(window.location.href);
    url.searchParams.set('persona', p);
    window.history.pushState({}, '', url.toString());
  };

  // ---------------------------------------------------------------------------
  // In-App Direct Chat Hub State & Methods
  // ---------------------------------------------------------------------------
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Load user conversations on auth change
  useEffect(() => {
    fetchUserConversations(currentUser).then(list => {
      setConversations(list);
      if (list.length > 0 && !activeConversationId) {
        setActiveConversationId(list[0].id);
      }
    });
  }, [currentUser]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversationId) {
      fetchConversationMessages(activeConversationId).then(msgs => {
        setActiveMessages(msgs);
      });
    } else {
      setActiveMessages([]);
    }
  }, [activeConversationId]);

  const openChat = async (
    conversationId?: string,
    targetUser?: { id: string; name: string; avatar: string; role: string },
    listingContext?: { id: string; title: string }
  ) => {
    if (targetUser && currentUser) {
      const conv = await getOrCreateConversation(currentUser, targetUser, listingContext);
      setConversations(prev => {
        const exists = prev.find(c => c.id === conv.id);
        if (exists) return prev;
        return [conv, ...prev];
      });
      setActiveConversationId(conv.id);
    } else if (conversationId) {
      setActiveConversationId(conversationId);
    } else if (conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const sendMessage = async (
    text: string,
    type: 'text' | 'teamup_proposal' = 'text',
    metadata?: any
  ) => {
    if (!activeConversationId) return;

    const sender = currentUser || {
      id: 'current-user-id',
      name: 'You',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: 'tenant'
    };

    const newMsg = await sendChatMessage(activeConversationId, {
      senderId: sender.id,
      senderName: sender.name,
      senderAvatar: sender.avatar,
      text,
      type,
      metadata
    });

    setActiveMessages(prev => [...prev, newMsg]);

    // Update conversation in list
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          lastMessage: type === 'teamup_proposal' ? '📋 Sent a Team Up proposal' : text,
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  // ---------------------------------------------------------------------------
  // Roommate & Flatmate Finding Profiles State & Methods
  // ---------------------------------------------------------------------------
  const [flatmateProfiles, setFlatmateProfiles] = useState<FlatmateProfile[]>([]);

  useEffect(() => {
    fetchFlatmateProfiles(filters.city).then(profiles => {
      setFlatmateProfiles(profiles);
    });
  }, [filters.city]);

  const saveFlatmateProfile = async (profileData: Partial<FlatmateProfile>) => {
    const saved = await saveUserFlatmateProfile({
      ...profileData,
      userId: currentUser?.id || 'current-user-id',
      name: currentUser?.name || profileData.name || 'Roomzy Resident',
      avatar: currentUser?.avatar || profileData.avatar,
      city: filters.city
    });

    setFlatmateProfiles(prev => {
      const idx = prev.findIndex(p => p.id === saved.id || p.userId === saved.userId);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
  };

  const calculateMatchScore = (candidateLifestyle?: any) => {
    return calculateLifestyleMatch(
      currentUser?.userCategory ? { wfhFriendly: true, dietary: 'Flexible' } : undefined,
      candidateLifestyle
    );
  };

  const setCurrentView = (v: ViewType) => {
    setCurrentViewState(v);
    const url = new URL(window.location.href);
    if (v === 'oauth-consent') {
      url.pathname = '/oauth/consent';
      url.searchParams.delete('view');
    } else {
      if (url.pathname.includes('/oauth/consent')) {
        url.pathname = '/';
      }
      url.searchParams.set('view', v);
    }
    if (v !== 'listing-detail') url.searchParams.delete('id');
    window.history.pushState({}, '', url.toString());
  };

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('roomzy_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id];
      localStorage.setItem('roomzy_favorites', JSON.stringify(next));
      return next;
    });
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

  // Scheduled Visits & Inquiries
  const [scheduledVisits, setScheduledVisits] = useState<ScheduledVisit[]>([]);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>([]);
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);

  const bookVisit = async (data: Omit<ScheduledVisit, 'id' | 'createdAt' | 'status'>) => {
    try {
      const created = await apiScheduleVisit(data, currentUser?.id);
      setScheduledVisits(prev => [created, ...prev]);
    } catch (err) {
      console.warn('Booking scheduled locally:', err);
    }
  };

  const submitInquiry = async (data: Omit<InquiryMessage, 'id' | 'createdAt' | 'status'>) => {
    try {
      const created = await apiSubmitInquiry(data, currentUser?.id);
      setInquiries(prev => [created, ...prev]);
    } catch (err) {
      console.warn('Inquiry submitted locally:', err);
    }
  };

  // Add new property listing directly to Supabase
  const addNewListing = async (data: Omit<Listing, 'id'>): Promise<Listing | null> => {
    try {
      const saved = await createListing(data, currentUser?.id);
      if (saved) {
        setListings(prev => [saved, ...prev]);
        return saved;
      }
      return null;
    } catch (err) {
      console.error('Failed to create listing:', err);
      return null;
    }
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
      
      // Real Auth
      currentUser,
      setCurrentUser,
      isAuthModalOpen,
      pendingAction,
      openAuthModal,
      closeAuthModal,
      signUpWithEmail,
      signInWithEmail,
      signInWithMagicLink,
      signInWithPhone,
      verifyPhoneOtp,
      loginWithPhone,
      loginWithGoogle,
      logout,
      requireAuth,

      // Onboarding & KYC
      isOnboardingModalOpen,
      onboardingInitialRole,
      openOnboardingModal,
      closeOnboardingModal,

      filters,
      updateFilter,
      resetFilters,
      isMapSplitOpen,
      toggleMapSplit,
      isFilterDrawerOpen,
      setIsFilterDrawerOpen,
      listings,
      isLoadingListings,
      refetchListings: loadListings,
      seedDemoListings,
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
      updateInquiryStatus,

      // In-App Direct Chat Hub
      conversations,
      activeConversationId,
      setActiveConversationId,
      activeMessages,
      isChatOpen,
      unreadMessagesCount,
      openChat,
      closeChat,
      sendMessage,

      // Roommate Finding & Lifestyle Matching
      flatmateProfiles,
      saveFlatmateProfile,
      calculateMatchScore
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
