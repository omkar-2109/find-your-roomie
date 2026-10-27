import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Filter, 
  RotateCcw, 
  ShieldCheck, 
  IndianRupee, 
  Utensils, 
  Users, 
  Armchair,
  X
} from 'lucide-react';

interface FilterSidebarProps {
  isMobileModal?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isMobileModal, onCloseMobile }) => {
  const { filters, updateFilter, resetFilters } = useApp();

  return (
    <div className={`flex flex-col gap-6 ${isMobileModal ? 'p-6' : 'p-5 glass-panel rounded-3xl shadow-glass border border-white/80'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-ivory-border">
        <div className="flex items-center gap-2 text-forest font-bold text-base">
          <Filter className="w-4 h-4 text-amber" />
          <span>Filters</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-forest transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {isMobileModal && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-neutral-400 hover:text-neutral-800 rounded-lg ml-2"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-forest-50/70 border border-forest-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-forest-emerald" />
          <div>
            <span className="block text-xs font-bold text-forest">Verified Only</span>
            <span className="block text-[10px] text-neutral-500">Verified agents, hosts & seekers</span>
          </div>
        </div>
        <input 
          type="checkbox"
          checked={filters.verifiedOnly}
          onChange={(e) => updateFilter('verifiedOnly', e.target.checked)}
          className="w-4 h-4 rounded text-forest focus:ring-forest accent-forest cursor-pointer"
        />
      </div>

      {/* Budget Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold mb-2 text-neutral-800">
          <span className="flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-forest" />
            Max Monthly Budget
          </span>
          <span className="font-extrabold text-forest text-sm">
            ₹{filters.priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>
        <input 
          type="range"
          min="8000"
          max="70000"
          step="2000"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
          className="w-full accent-forest cursor-pointer h-2 bg-neutral-200 rounded-lg"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-medium">
          <span>₹8,000</span>
          <span>₹35,000</span>
          <span>₹70,000+</span>
        </div>
      </div>

      {/* Gender Preference */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 mb-2">
          <Users className="w-3.5 h-3.5 text-forest" />
          <span>Flatmate Preference</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-ivory-dark/60 p-1 rounded-xl border border-ivory-border">
          {(['Any', 'Male', 'Female'] as const).map(g => (
            <button
              key={g}
              onClick={() => updateFilter('gender', g)}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filters.gender === g
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Dietary Habit */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 mb-2">
          <Utensils className="w-3.5 h-3.5 text-forest" />
          <span>Dietary Habit</span>
        </label>
        <div className="space-y-1.5">
          {(['All', 'Pure Veg', 'Veg / Non-Veg Friendly'] as const).map(diet => (
            <label 
              key={diet} 
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                filters.dietary === diet 
                  ? 'border-forest bg-forest-50/50 text-forest font-semibold' 
                  : 'border-ivory-border bg-white text-neutral-700 hover:bg-ivory-dark/40'
              }`}
            >
              <span>{diet}</span>
              <input 
                type="radio"
                name="dietary"
                checked={filters.dietary === diet}
                onChange={() => updateFilter('dietary', diet)}
                className="accent-forest"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 mb-2">
          <Armchair className="w-3.5 h-3.5 text-forest" />
          <span>Furnishing Type</span>
        </label>
        <div className="space-y-1.5">
          {(['All', 'Fully Furnished', 'Semi Furnished'] as const).map(furn => (
            <label 
              key={furn} 
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                filters.furnishing === furn 
                  ? 'border-forest bg-forest-50/50 text-forest font-semibold' 
                  : 'border-ivory-border bg-white text-neutral-700 hover:bg-ivory-dark/40'
              }`}
            >
              <span>{furn}</span>
              <input 
                type="radio"
                name="furnishing"
                checked={filters.furnishing === furn}
                onChange={() => updateFilter('furnishing', furn)}
                className="accent-forest"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Done Button for Mobile */}
      {isMobileModal && (
        <button
          onClick={onCloseMobile}
          className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-xl mt-4 shadow-soft"
        >
          Apply Filters
        </button>
      )}

    </div>
  );
};
