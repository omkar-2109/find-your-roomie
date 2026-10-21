import React from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_METROS } from '../../data/mockListings';
import { MetroCity } from '../../types';
import { 
  Building2, 
  MapPin, 
  PhoneCall,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const PersonaHeader: React.FC = () => {
  const { 
    persona, 
    setPersona, 
    setCurrentView, 
    filters, 
    updateFilter,
    currentUser,
    openAuthModal
  } = useApp();

  // If in Business or Admin workspace, show dedicated workspace banner with exit button
  if (persona === 'business' || persona === 'admin') {
    return (
      <div className="bg-forest-900 text-ivory-dark border-b border-forest-800 text-xs px-3 sm:px-6 py-2 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${persona === 'business' ? 'bg-amber' : 'bg-emerald-400'} animate-pulse`} />
            <span className="font-bold uppercase tracking-wider text-[11px] text-ivory-warm">
              {persona === 'business' ? 'Host / PG Operator SaaS Workspace' : 'Role-Protected Admin Verification Desk'}
            </span>
            {currentUser && (
              <span className="hidden sm:inline text-neutral-400 text-[11px]">
                • Logged in as <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setPersona('consumer');
              setCurrentView('marketplace');
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-emerald hover:bg-emerald-600 text-white font-semibold text-xs shadow-xs transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Exit to Consumer Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </div>
    );
  }

  // Public Consumer Announcement & Utility Bar (Inspired by GetSetHome)
  return (
    <div className="bg-forest-950 text-ivory-dark border-b border-forest-900 text-xs px-3 sm:px-6 py-1.5 transition-all overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Left: Consumer Value Highlight */}
        <div className="flex items-center gap-2 overflow-hidden text-[11px]">
          <span className="inline-flex items-center gap-1 bg-amber/20 text-amber-light font-bold px-2 py-0.5 rounded-full text-[10px] shrink-0 border border-amber/30">
            <Sparkles className="w-3 h-3 text-amber" />
            ZERO BROKERAGE
          </span>
          <span className="text-ivory-warm/90 font-medium truncate hidden sm:inline">
            1-Month Deposit • Fully Furnished Flats with Appliances • Move in within 48h
          </span>
        </div>

        {/* Right: City Selector & Direct Utilities */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[11px]">
          
          {/* Quick City Selector */}
          <div className="flex items-center gap-1 bg-forest-900/90 hover:bg-forest-800 px-2 py-0.5 rounded-lg border border-forest-800 transition-colors">
            <MapPin className="w-3 h-3 text-amber-light" />
            <select
              value={filters.city}
              onChange={(e) => updateFilter('city', e.target.value as MetroCity)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer text-[11px]"
              aria-label="Select city"
            >
              {INDIAN_METROS.map(m => (
                <option key={m.name} value={m.name} className="bg-forest-900 text-white">
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* For Property Owners CTA */}
          <button
            onClick={() => {
              if (currentUser && (currentUser.role === 'host' || currentUser.role === 'admin')) {
                setPersona('business');
              } else {
                openAuthModal({ type: 'host' });
              }
            }}
            className="hidden sm:flex items-center gap-1 text-ivory-warm hover:text-amber-light font-semibold transition-colors"
          >
            <Building2 className="w-3 h-3 text-amber" />
            <span>List Your Property</span>
          </button>

          {/* Support Helpline */}
          <a 
            href="tel:+918069001234"
            className="hidden lg:flex items-center gap-1 text-ivory-warm/80 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>Support: +91 80 6900 1234</span>
          </a>

          {/* Logged in role indicator (if host or admin) */}
          {currentUser && currentUser.role !== 'tenant' && (
            <button
              onClick={() => setPersona(currentUser.role === 'admin' ? 'admin' : 'business')}
              className="hidden sm:inline-flex items-center gap-1 bg-forest-800 text-amber-light px-2 py-0.5 rounded-md font-bold text-[10px] border border-forest-700"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Open {currentUser.role === 'admin' ? 'Admin' : 'Host'} Desk</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

