import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Search, 
  Heart, 
  Users, 
  Building, 
  PlusCircle, 
  Menu, 
  X, 
  Calendar,
  Sparkles,
  ArrowRight,
  User,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Building2,
  CalendarCheck,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { CategoryType, MetroCity } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    favorites, 
    scheduledVisits, 
    updateFilter,
    filters,
    setPersona,
    currentUser,
    openAuthModal,
    openOnboardingModal,
    logout,
    openChat,
    unreadMessagesCount
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryNav = (cat: CategoryType | 'all') => {
    updateFilter('category', cat);
    setCurrentView('marketplace');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-30 glass-nav bg-white/90 backdrop-blur-xl border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-nowrap gap-3">
          
          {/* 1. Left: Brand Lockup */}
          <button 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-forest text-ivory flex items-center justify-center font-display font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
              R<span className="text-amber-light">.</span>
            </div>
            <span className="font-display font-black text-xl tracking-tight text-forest block leading-none">
              ROOMZY
            </span>
          </button>

          {/* 2. Center: Segmented Navigation Pill Island */}
          <div className="hidden xl:flex items-center p-1 rounded-full bg-stone-100/90 border border-stone-200/70 shadow-2xs shrink-0">
            <button
              onClick={() => handleCategoryNav('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'marketplace' && filters.category === 'all'
                  ? 'bg-white text-forest shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Listings
            </button>

            <button
              onClick={() => handleCategoryNav('rooms')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'marketplace' && filters.category === 'rooms'
                  ? 'bg-white text-forest shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Rooms
            </button>

            <button
              onClick={() => handleCategoryNav('flatmates')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'marketplace' && filters.category === 'flatmates'
                  ? 'bg-white text-forest shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Flatmates
            </button>

            <button
              onClick={() => handleCategoryNav('groups')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'marketplace' && filters.category === 'groups'
                  ? 'bg-amber text-stone-900 font-bold shadow-xs'
                  : 'text-stone-700 hover:text-amber-hover'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber fill-amber/20" />
              <span>Find Together</span>
            </button>

            <button
              onClick={() => handleCategoryNav('pgs')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                currentView === 'marketplace' && filters.category === 'pgs'
                  ? 'bg-white text-forest shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              PGs & Co-Living
            </button>
          </div>

          {/* 3. Right: Unified Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-nowrap">
            
            {/* City Switcher Pill */}
            <div className="relative shrink-0" ref={cityDropdownRef}>
              <button
                onClick={() => setCityDropdownOpen(prev => !prev)}
                className="flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-800 px-3 py-1.5 rounded-full text-xs font-bold border border-stone-200/90 shadow-2xs transition-all whitespace-nowrap"
                title="Change active metro city"
              >
                <MapPin className="w-3.5 h-3.5 text-forest" />
                <span>{filters.city}</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${cityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl p-1.5 shadow-xl border border-stone-200/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2.5 py-1">
                    Select Metro
                  </p>
                  {(['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'] as MetroCity[]).map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        updateFilter('city', city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        filters.city === city
                          ? 'bg-forest text-white shadow-xs'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      <span>{city}</span>
                      {filters.city === city && <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-bold">Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search Icon Button */}
            <button
              onClick={() => setCurrentView('marketplace')}
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center border border-stone-200/90 shadow-2xs transition-all shrink-0"
              title="Search listings"
            >
              <Search className="w-3.5 h-3.5 text-forest" />
            </button>

            {/* Saved Favorites Pill */}
            <button
              onClick={() => setCurrentView('saved')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-all shadow-2xs shrink-0 text-xs font-bold ${
                currentView === 'saved'
                  ? 'bg-forest-50 border-forest-300 text-forest'
                  : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-700'
              }`}
              title="Saved Listings"
            >
              <Heart className={`w-3.5 h-3.5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
              {favorites.length > 0 && (
                <span className="text-[11px] font-extrabold text-stone-800 leading-none">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* In-App Direct Chat Pill */}
            <button
              onClick={() => openChat()}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-stone-200/90 bg-white hover:bg-stone-50 transition-all shadow-2xs shrink-0 text-xs font-bold text-stone-700"
              title="Direct Messages & Roommate Chats"
            >
              <MessageSquare className="w-3.5 h-3.5 text-forest-emerald" />
              {unreadMessagesCount > 0 ? (
                <span className="text-[10px] font-extrabold text-white bg-rose-500 px-1.5 py-0.2 rounded-full leading-none">
                  {unreadMessagesCount}
                </span>
              ) : (
                <span className="hidden md:inline text-stone-700 font-semibold text-xs">
                  Chats
                </span>
              )}
            </button>

            {/* List Space / Host CTA */}
            <button
              onClick={() => {
                if (currentUser && (currentUser.role === 'host' || currentUser.role === 'admin')) {
                  setPersona('business');
                } else if (currentUser) {
                  openOnboardingModal('host');
                } else {
                  openAuthModal({ type: 'host' });
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 bg-forest hover:bg-forest-light text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs hover:shadow-sm transition-all shrink-0 whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-light" />
              <span>List Space</span>
            </button>

            {/* Authentication Gateway: User Profile Pill vs Guest Login */}
            {currentUser ? (
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 bg-white hover:bg-stone-50 p-1 pl-1.5 pr-2.5 rounded-full border border-stone-200/90 transition-all shadow-2xs shrink-0"
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-forest/30"
                    />
                    {currentUser.isAadhaarVerified && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>
                  <span className="text-xs font-bold text-stone-800 hidden md:inline-block truncate max-w-[85px] leading-none">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-stone-200/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 border-b border-stone-100">
                      <p className="font-bold text-xs text-stone-900">{currentUser.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Aadhaar Verified
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold capitalize px-2 py-0.5 rounded-full bg-stone-100">
                          {currentUser.role}
                        </span>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      {/* Direct In-App Chat Link */}
                      <button
                        onClick={() => {
                          openChat();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-forest-emerald" />
                          Messages & Roommate Chats
                        </span>
                        {unreadMessagesCount > 0 && (
                          <span className="text-[10px] font-bold text-white bg-rose-500 px-1.5 py-0.2 rounded-full">
                            {unreadMessagesCount}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          openOnboardingModal(currentUser.role === 'host' ? 'host' : 'tenant');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-forest font-semibold hover:bg-forest-50/70 flex items-center justify-between border border-forest-100/60 bg-forest-50/30"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-forest-emerald" />
                          KYC & Lifestyle Profile
                        </span>
                        <span className="text-[10px] text-forest-emerald font-bold bg-white px-1.5 py-0.5 rounded-full border border-forest-200">
                          Edit
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('saved');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <CalendarCheck className="w-3.5 h-3.5 text-forest" />
                          My Scheduled Visits
                        </span>
                        <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded-full">
                          {scheduledVisits.length}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('saved');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          Saved Places
                        </span>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full">
                          {favorites.length}
                        </span>
                      </button>

                      {/* STRICT RBAC: Host / PG SaaS Workspace (Only visible to hosts & admins) */}
                      {(currentUser.role === 'host' || currentUser.role === 'admin') ? (
                        <button
                          onClick={() => {
                            setPersona('business');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-amber-hover" />
                            Host / PG SaaS Workspace
                          </span>
                          <ArrowRight className="w-3 h-3 text-stone-400" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            openOnboardingModal('host');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-forest hover:bg-forest-50/60 font-semibold flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-forest" />
                            Upgrade to Host / List Space
                          </span>
                          <ArrowRight className="w-3 h-3 text-forest" />
                        </button>
                      )}

                      {/* STRICT RBAC: Admin Verification Desk (Only visible to verified admins) */}
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setPersona('admin');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Admin Verification Desk
                          </span>
                          <ArrowRight className="w-3 h-3 text-stone-400" />
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full mt-1 pt-2 border-t border-stone-100 text-left px-2.5 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Public Guest Login Button */
              <button
                onClick={() => openAuthModal()}
                className="bg-forest hover:bg-forest-light text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xs hover:shadow-sm transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-amber-light" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile / Tablet Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="xl:hidden p-2 rounded-full border border-stone-200/90 bg-white text-stone-700 hover:bg-stone-50 shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass-panel border-b border-ivory-border/70 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-glass">
          
          {/* Guest Login Banner or User Profile Header */}
          {currentUser ? (
            <>
            <div className="p-3 bg-white rounded-2xl border border-ivory-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-forest/20"
                />
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">{currentUser.name}</h4>
                  <p className="text-[10px] text-neutral-500">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Logout
              </button>
            </div>
            <button
              onClick={() => {
                openOnboardingModal(currentUser.role === 'host' ? 'host' : 'tenant');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-forest-50/80 border border-forest-200 text-xs font-semibold text-forest"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest-emerald" />
                KYC & Lifestyle Vibe Check
              </span>
              <span className="text-[10px] font-bold bg-forest text-white px-2 py-0.5 rounded-full">
                Verify
              </span>
            </button>
            </>
          ) : (
            <div className="p-3 bg-forest-50 rounded-2xl border border-forest-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-forest">Explore as Guest</h4>
                <p className="text-[10px] text-neutral-500">Sign in to save listings and schedule visits</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="bg-forest text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
              >
                Login
              </button>
            </div>
          )}

          {/* Mobile City Quick Switcher */}
          <div className="p-3 bg-white rounded-2xl border border-ivory-border">
            <div className="flex items-center justify-between mb-2 text-xs font-bold text-neutral-800">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-forest" />
                <span>Active Metro City</span>
              </span>
              <span className="text-[10px] text-forest font-bold bg-forest-50 px-2 py-0.5 rounded-full border border-forest-100">
                {filters.city}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'] as MetroCity[]).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    updateFilter('city', city);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                    filters.city === city
                      ? 'bg-forest text-white border-forest shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-ivory-border/60">
            <button
              onClick={() => handleCategoryNav('all')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-ivory-border text-xs font-semibold text-neutral-800"
            >
              <Home className="w-4 h-4 text-forest" />
              All Listings
            </button>
            <button
              onClick={() => handleCategoryNav('rooms')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-ivory-border text-xs font-semibold text-neutral-800"
            >
              <Building className="w-4 h-4 text-forest" />
              Private Rooms
            </button>
            <button
              onClick={() => handleCategoryNav('flatmates')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-ivory-border text-xs font-semibold text-neutral-800"
            >
              <Users className="w-4 h-4 text-forest" />
              Find Flatmates
            </button>
            <button
              onClick={() => handleCategoryNav('groups')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-soft border border-amber/20 text-xs font-semibold text-stone-900"
            >
              <Sparkles className="w-4 h-4 text-amber" />
              Find Together
            </button>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            {/* Direct Messages & Chat */}
            <button
              onClick={() => {
                openChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-ivory-border text-xs font-semibold text-neutral-800"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-forest-emerald" />
                Messages & Roommate Chats
              </span>
              {unreadMessagesCount > 0 && (
                <span className="bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentView('saved');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-ivory-border text-xs font-semibold text-neutral-800"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Saved Listings & Visits
              </span>
              <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px]">
                {favorites.length}
              </span>
            </button>

            {/* STRICT RBAC: Host / PG Workspace */}
            {(currentUser?.role === 'host' || currentUser?.role === 'admin') ? (
              <button
                onClick={() => {
                  setPersona('business');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-forest text-white text-xs font-semibold"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-amber-light" />
                  Host / PG Workspace
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  openOnboardingModal('host');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-forest-50 border border-forest-200 text-forest text-xs font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-forest" />
                  List Your Space / Host Onboarding
                </span>
                <ArrowRight className="w-4 h-4 text-forest" />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

