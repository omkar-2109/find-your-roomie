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
  CalendarCheck
} from 'lucide-react';
import { CategoryType } from '../../types';

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
    logout
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
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
    <nav className="sticky top-0 z-30 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-8 min-w-0">
            <button 
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-forest text-ivory flex items-center justify-center font-display font-extrabold text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
                R<span className="text-amber-light">.</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-forest block leading-none">
                  ROOMZY
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-widest text-neutral-500 block mt-0.5">
                  Shared Living
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => handleCategoryNav('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'marketplace' && filters.category === 'all'
                    ? 'text-forest bg-forest-50 font-semibold'
                    : 'text-neutral-600 hover:text-forest hover:bg-ivory-dark/60'
                }`}
              >
                All Listings
              </button>

              <button
                onClick={() => handleCategoryNav('rooms')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'marketplace' && filters.category === 'rooms'
                    ? 'text-forest bg-forest-50 font-semibold'
                    : 'text-neutral-600 hover:text-forest hover:bg-ivory-dark/60'
                }`}
              >
                Rooms
              </button>

              <button
                onClick={() => handleCategoryNav('flatmates')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'marketplace' && filters.category === 'flatmates'
                    ? 'text-forest bg-forest-50 font-semibold'
                    : 'text-neutral-600 hover:text-forest hover:bg-ivory-dark/60'
                }`}
              >
                Flatmates
              </button>

              <button
                onClick={() => handleCategoryNav('groups')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                  currentView === 'marketplace' && filters.category === 'groups'
                    ? 'text-amber-hover bg-amber-soft font-semibold'
                    : 'text-neutral-700 hover:text-amber-hover hover:bg-amber-soft/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber" />
                <span>Find Together</span>
                <span className="bg-amber text-stone-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  Team Up
                </span>
              </button>

              <button
                onClick={() => handleCategoryNav('pgs')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'marketplace' && filters.category === 'pgs'
                    ? 'text-forest bg-forest-50 font-semibold'
                    : 'text-neutral-600 hover:text-forest hover:bg-ivory-dark/60'
                }`}
              >
                PGs & Co-Living
              </button>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Quick Button */}
            <button
              onClick={() => setCurrentView('marketplace')}
              className="hidden sm:flex items-center gap-2 bg-ivory-dark hover:bg-ivory-warm text-neutral-600 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-ivory-border transition-colors shadow-xs"
              title="Search localities or budget"
            >
              <Search className="w-4 h-4 text-forest" />
              <span>Search in {filters.city}</span>
            </button>

            {/* Saved Favorites (Desktop / Tablet) */}
            <button
              onClick={() => setCurrentView('saved')}
              className={`hidden sm:flex p-2.5 rounded-xl border border-ivory-border transition-colors relative ${
                currentView === 'saved'
                  ? 'bg-forest-50 border-forest-200 text-forest'
                  : 'bg-white hover:bg-ivory-dark text-neutral-600'
              }`}
              title="Saved Listings & Visits"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* List Property / Host CTA */}
            <button
              onClick={() => {
                if (currentUser && (currentUser.role === 'host' || currentUser.role === 'admin')) {
                  setPersona('business');
                } else {
                  openAuthModal({ type: 'host' });
                }
              }}
              className="hidden md:flex items-center gap-1.5 bg-white hover:bg-ivory-dark text-forest border border-forest/20 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-forest" />
              <span>List Property</span>
            </button>

            {/* Authentication Gateway: Guest Login vs Logged In Profile */}
            {currentUser ? (
              /* Logged In User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 bg-white hover:bg-ivory-dark p-1.5 pr-2.5 rounded-2xl border border-ivory-border transition-all shadow-xs"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-forest/20"
                  />
                  <div className="hidden sm:block text-left">
                    <span className="text-xs font-bold text-neutral-900 block leading-tight truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-forest-emerald font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-panel bg-white/95 rounded-2xl p-3 shadow-glass-float border border-white/90 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2 border-b border-ivory-border/80">
                      <p className="font-bold text-xs text-neutral-900">{currentUser.name}</p>
                      <p className="text-[11px] text-neutral-500 truncate">{currentUser.email}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1.5 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-forest-emerald" /> Aadhaar KYC Verified
                      </span>
                    </div>

                    <div className="py-2 space-y-1">
                      <button
                        onClick={() => {
                          openOnboardingModal(currentUser.role === 'host' ? 'host' : 'tenant');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-forest font-semibold hover:bg-forest-50/70 flex items-center justify-between border border-forest-100/60 bg-forest-50/30"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-forest-emerald" />
                          KYC & Vibe Onboarding
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
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-neutral-700 hover:bg-ivory-dark flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <CalendarCheck className="w-3.5 h-3.5 text-forest" />
                          My Scheduled Visits
                        </span>
                        <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-full">
                          {scheduledVisits.length}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('saved');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-neutral-700 hover:bg-ivory-dark flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          Saved Places
                        </span>
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full">
                          {favorites.length}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setPersona('business');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-neutral-700 hover:bg-ivory-dark flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-amber-hover" />
                          Host / PG SaaS Workspace
                        </span>
                        <ArrowRight className="w-3 h-3 text-neutral-400" />
                      </button>

                      <button
                        onClick={() => {
                          setPersona('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs text-neutral-700 hover:bg-ivory-dark flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Admin Verification Desk
                        </span>
                        <ArrowRight className="w-3 h-3 text-neutral-400" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-ivory-border/80 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-400">Account Role:</span>
                      <span className="font-bold text-forest capitalize px-2 py-0.5 rounded-md bg-forest-50 border border-forest-100">
                        {currentUser?.role || 'tenant'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full mt-2 pt-2 border-t border-ivory-border/80 text-left px-2.5 py-1.5 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Public Unauthenticated Guest Login Button */
              <button
                onClick={() => openAuthModal()}
                className="bg-forest hover:bg-forest-light text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-soft hover:shadow-card transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-amber-light" />
                <span>
                  <span className="hidden sm:inline">Login / Sign Up</span>
                  <span className="sm:hidden">Login</span>
                </span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2.5 rounded-xl border border-ivory-border bg-white text-neutral-700 hover:bg-ivory-dark"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-ivory-border/70 px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-glass">
          
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
          </div>
        </div>
      )}
    </nav>
  );
};

