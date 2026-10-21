import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Search, 
  Heart, 
  Sparkles, 
  User,
  LogIn
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    favorites, 
    updateFilter,
    setIsFilterDrawerOpen,
    currentUser,
    openAuthModal
  } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-ivory-border/70 shadow-glass-float pb-safe">
      <div className="grid grid-cols-5 h-16 w-full max-w-md mx-auto items-center px-1">
        
        {/* Explore / Home */}
        <button
          onClick={() => {
            updateFilter('category', 'all');
            setCurrentView('marketplace');
          }}
          className={`flex flex-col items-center justify-center h-full w-full gap-1 transition-colors ${
            currentView === 'marketplace'
              ? 'text-forest font-semibold'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        {/* Filters / Search */}
        <button
          onClick={() => {
            setCurrentView('marketplace');
            setIsFilterDrawerOpen(true);
          }}
          className="flex flex-col items-center justify-center h-full w-full gap-1 text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <Search className="w-5 h-5 text-forest" />
          <span className="text-[10px]">Filters</span>
        </button>

        {/* Find Together */}
        <button
          onClick={() => {
            updateFilter('category', 'groups');
            setCurrentView('marketplace');
          }}
          className={`flex flex-col items-center justify-center h-full w-full gap-1 relative transition-colors ${
            currentView === 'marketplace'
              ? 'text-amber-hover font-bold'
              : 'text-neutral-500 hover:text-amber'
          }`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber rounded-full"></span>
          </div>
          <span className="text-[10px]">Team Up</span>
        </button>

        {/* Saved */}
        <button
          onClick={() => setCurrentView('saved')}
          className={`flex flex-col items-center justify-center h-full w-full gap-1 relative transition-colors ${
            currentView === 'saved'
              ? 'text-rose-600 font-semibold'
              : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[10px]">Saved</span>
        </button>

        {/* Account / Login */}
        {currentUser ? (
          <button
            onClick={() => openAuthModal()}
            className="flex flex-col items-center justify-center h-full w-full gap-1 text-forest transition-colors"
            title="Profile & Settings"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-6 h-6 rounded-full object-cover ring-1 ring-forest/30"
            />
            <span className="text-[10px] font-bold truncate max-w-[48px]">
              {currentUser.name.split(' ')[0]}
            </span>
          </button>
        ) : (
          <button
            onClick={() => openAuthModal()}
            className="flex flex-col items-center justify-center h-full w-full gap-1 text-neutral-600 hover:text-forest transition-colors"
            title="Sign In / Register"
          >
            <div className="w-6 h-6 rounded-full bg-forest-50 text-forest flex items-center justify-center">
              <LogIn className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-bold">Login</span>
          </button>
        )}

      </div>
    </div>
  );
};
