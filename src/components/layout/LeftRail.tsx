import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Home, 
  Users, 
  Sparkles, 
  Building2, 
  Heart, 
  CalendarCheck, 
  PlusCircle,
  HelpCircle,
  Shield
} from 'lucide-react';
import { CategoryType } from '../../types';

export const LeftRail: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    filters, 
    updateFilter, 
    favorites, 
    scheduledVisits,
    setPersona
  } = useApp();

  const handleNav = (cat: CategoryType | 'all') => {
    updateFilter('category', cat);
    setCurrentView('marketplace');
  };

  return (
    <aside className="hidden xl:flex flex-col w-20 glass-panel-subtle border-r border-ivory-border/70 min-h-[calc(100vh-8rem)] py-6 items-center justify-between sticky top-20 shadow-xs z-10">
      {/* Top Nav Group */}
      <div className="flex flex-col items-center gap-6 w-full px-2">
        
        {/* Marketplace Home */}
        <button
          onClick={() => {
            handleNav('all');
          }}
          className={`group flex flex-col items-center gap-1 w-full p-2.5 rounded-2xl transition-all ${
            currentView === 'marketplace' && filters.category === 'all'
              ? 'bg-forest text-white shadow-soft'
              : 'text-neutral-500 hover:text-forest hover:bg-ivory-dark/70'
          }`}
          title="All Listings"
        >
          <Compass className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] font-semibold tracking-tight">Explore</span>
        </button>

        {/* Rooms */}
        <button
          onClick={() => handleNav('rooms')}
          className={`group flex flex-col items-center gap-1 w-full p-2.5 rounded-2xl transition-all ${
            currentView === 'marketplace' && filters.category === 'rooms'
              ? 'bg-forest text-white shadow-soft'
              : 'text-neutral-500 hover:text-forest hover:bg-ivory-dark/70'
          }`}
          title="Private & Shared Rooms"
        >
          <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] font-semibold tracking-tight">Rooms</span>
        </button>

        {/* Flatmates */}
        <button
          onClick={() => handleNav('flatmates')}
          className={`group flex flex-col items-center gap-1 w-full p-2.5 rounded-2xl transition-all ${
            currentView === 'marketplace' && filters.category === 'flatmates'
              ? 'bg-forest text-white shadow-soft'
              : 'text-neutral-500 hover:text-forest hover:bg-ivory-dark/70'
          }`}
          title="Find Compatible Flatmates"
        >
          <Users className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] font-semibold tracking-tight">Flatmates</span>
        </button>

        {/* Find Together */}
        <button
          onClick={() => handleNav('groups')}
          className={`group flex flex-col items-center gap-1 w-full p-2.5 rounded-2xl transition-all relative ${
            currentView === 'marketplace' && filters.category === 'groups'
              ? 'bg-amber text-stone-950 font-bold shadow-soft'
              : 'text-neutral-500 hover:text-amber hover:bg-amber-soft/50'
          }`}
          title="Find Together Groups"
        >
          <Sparkles className="w-5 h-5 transition-transform group-hover:scale-110 text-amber" />
          <span className="text-[10px] font-semibold tracking-tight text-center leading-tight">Team Up</span>
          <span className="w-2 h-2 rounded-full bg-amber absolute top-2 right-2 ring-2 ring-white"></span>
        </button>

        {/* PGs */}
        <button
          onClick={() => handleNav('pgs')}
          className={`group flex flex-col items-center gap-1 w-full p-2.5 rounded-2xl transition-all ${
            currentView === 'marketplace' && filters.category === 'pgs'
              ? 'bg-forest text-white shadow-soft'
              : 'text-neutral-500 hover:text-forest hover:bg-ivory-dark/70'
          }`}
          title="Managed PGs & Co-Living"
        >
          <Building2 className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] font-semibold tracking-tight">PGs</span>
        </button>

        <div className="w-8 h-px bg-ivory-border my-1"></div>

        {/* Saved Favorites */}
        <button
          onClick={() => setCurrentView('saved')}
          className={`group flex flex-col items-center gap-1 w-full p-2.5 rounded-2xl transition-all relative ${
            currentView === 'saved'
              ? 'bg-rose-50 text-rose-600 shadow-soft ring-1 ring-rose-200'
              : 'text-neutral-500 hover:text-rose-600 hover:bg-rose-50/50'
          }`}
          title="Saved Listings"
        >
          <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span className="text-[10px] font-semibold tracking-tight">Saved</span>
          {favorites.length > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      {/* Bottom Nav Group */}
      <div className="flex flex-col items-center gap-4 w-full px-2">
        <button
          onClick={() => setPersona('business')}
          className="group flex flex-col items-center gap-1 w-full p-2 rounded-xl text-neutral-500 hover:text-forest hover:bg-ivory-dark transition-all"
          title="Host & PG Dashboard"
        >
          <PlusCircle className="w-5 h-5 text-forest" />
          <span className="text-[9px] font-semibold">Host Hub</span>
        </button>

        <div className="w-8 h-8 rounded-full bg-forest-50 border border-forest-100 flex items-center justify-center text-forest" title="Zero Brokerage Verified">
          <Shield className="w-4 h-4 text-forest-emerald" />
        </div>
      </div>
    </aside>
  );
};
