import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/marketplace/ListingCard';
import { FilterSidebar } from '../components/marketplace/FilterSidebar';
import { LocalityMap } from '../components/marketplace/LocalityMap';
import { CategoryType } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  Map, 
  Grid, 
  RotateCcw, 
  Sparkles, 
  MapPin,
  X,
  ArrowUpDown
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { 
    listings, 
    filters, 
    updateFilter, 
    resetFilters,
    isMapSplitOpen, 
    toggleMapSplit,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen
  } = useApp();

  const [mobileMapOpen, setMobileMapOpen] = useState(false);

  // Filter listings
  const filteredListings = listings.filter(item => {
    // City match
    if (item.city !== filters.city) return false;

    // Locality match (if selected on map or search)
    if (filters.locality && !item.locality.toLowerCase().includes(filters.locality.toLowerCase())) {
      return false;
    }

    // Category match
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }

    // Budget match
    if (item.costs.rent > filters.priceRange[1]) {
      return false;
    }

    // Gender match
    if (filters.gender !== 'Any' && item.preferences.genderPreference !== 'Any' && item.preferences.genderPreference !== filters.gender) {
      return false;
    }

    // Dietary match
    if (filters.dietary !== 'All') {
      if (filters.dietary === 'Pure Veg' && item.preferences.dietary !== 'Pure Veg') {
        return false;
      }
    }

    // Furnishing match
    if (filters.furnishing !== 'All' && item.furnishing !== filters.furnishing) {
      return false;
    }

    // Verified only
    if (filters.verifiedOnly && !item.isVerified) {
      return false;
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchLoc = item.locality.toLowerCase().includes(q);
      const matchLand = item.landmark.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchLand && !matchDesc) return false;
    }

    return true;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.costs.rent - b.costs.rent;
    if (filters.sortBy === 'price-desc') return b.costs.rent - a.costs.rent;
    if (filters.sortBy === 'newest') return b.id.localeCompare(a.id);
    return (b.compatibilityScore || 90) - (a.compatibilityScore || 90);
  });

  const categories: { id: CategoryType | 'all'; label: string; count?: number }[] = [
    { id: 'all', label: 'All Places' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'flatmates', label: 'Flatmates' },
    { id: 'groups', label: 'Find Together' },
    { id: 'flats', label: 'Whole Flats' },
    { id: 'pgs', label: 'PGs & Co-Living' },
    { id: 'wanted', label: 'Wanted' }
  ];

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1. TOP CONTROL BAR */}
      <div className="glass-panel p-3 sm:p-4 rounded-3xl shadow-glass mb-6 space-y-3 border border-white/80">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input Box */}
          <div className="relative flex-grow max-w-xl">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={`Search locality, landmark, or apartment in ${filters.city}...`}
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="w-full bg-ivory pl-10 pr-10 py-2.5 rounded-xl text-sm border border-ivory-border focus:outline-none focus:ring-2 focus:ring-forest/20 text-neutral-900 placeholder-neutral-400 font-medium"
            />
            {filters.searchQuery && (
              <button 
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 justify-between md:justify-end">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-ivory px-3 py-2 rounded-xl border border-ivory-border text-xs font-semibold text-neutral-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-forest" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="recommended">Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Mobile Filter Sheet Trigger */}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-1.5 bg-forest text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Desktop Split Map Toggle */}
            <button
              onClick={toggleMapSplit}
              className={`hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isMapSplitOpen 
                  ? 'bg-forest-50 border-forest-200 text-forest' 
                  : 'bg-white border-ivory-border text-neutral-700 hover:bg-ivory'
              }`}
            >
              {isMapSplitOpen ? <Grid className="w-3.5 h-3.5" /> : <Map className="w-3.5 h-3.5" />}
              <span>{isMapSplitOpen ? 'Hide Map' : 'Split Map'}</span>
            </button>

          </div>
        </div>

        {/* Horizontally Scrollable Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {categories.map(cat => {
            const isActive = filters.category === cat.id;
            const isGroup = cat.id === 'groups';

            return (
              <button
                key={cat.id}
                onClick={() => updateFilter('category', cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? isGroup 
                      ? 'bg-amber text-stone-950 font-bold shadow-xs' 
                      : 'bg-forest text-white shadow-xs'
                    : isGroup
                      ? 'bg-amber-soft text-amber-hover border border-amber/30 hover:bg-amber-light/30'
                      : 'bg-ivory border border-ivory-border text-neutral-600 hover:text-neutral-900 hover:bg-ivory-dark'
                }`}
              >
                {isGroup && <Sparkles className="w-3 h-3 text-amber-hover" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 2. ACTIVE FILTERS SUMMARY PILLS */}
      {(filters.locality || filters.dietary !== 'All' || filters.gender !== 'Any' || filters.verifiedOnly || filters.searchQuery) && (
        <div className="flex items-center gap-2 flex-wrap mb-4 text-xs">
          <span className="text-neutral-500 font-medium">Applied Filters:</span>
          {filters.locality && (
            <span className="bg-forest-50 text-forest px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 border border-forest-100">
              <MapPin className="w-3 h-3" /> {filters.locality}
              <button onClick={() => updateFilter('locality', null)} className="hover:text-forest-dark">×</button>
            </span>
          )}
          {filters.dietary !== 'All' && (
            <span className="bg-forest-50 text-forest px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 border border-forest-100">
              {filters.dietary}
              <button onClick={() => updateFilter('dietary', 'All')} className="hover:text-forest-dark">×</button>
            </span>
          )}
          {filters.gender !== 'Any' && (
            <span className="bg-forest-50 text-forest px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 border border-forest-100">
              {filters.gender} flatmates
              <button onClick={() => updateFilter('gender', 'Any')} className="hover:text-forest-dark">×</button>
            </span>
          )}
          {filters.verifiedOnly && (
            <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 border border-emerald-200">
              Aadhaar Verified Only
              <button onClick={() => updateFilter('verifiedOnly', false)} className="hover:text-emerald-950">×</button>
            </span>
          )}
          <button 
            onClick={resetFilters}
            className="text-neutral-500 hover:text-forest underline ml-1 text-xs font-semibold"
          >
            Clear all
          </button>
        </div>
      )}

      {/* 3. MAIN MARKETPLACE CONTENT GRID */}
      <div className="flex items-start gap-6">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24">
          <FilterSidebar />
        </aside>

        {/* Listings Grid Area */}
        <div className={`flex-grow transition-all duration-300 ${isMapSplitOpen ? 'lg:w-[calc(100%-18rem-32rem)]' : 'w-full'}`}>
          
          {/* Results Counter */}
          <div className="flex items-center justify-between mb-4 text-xs text-neutral-500">
            <span>
              Showing <strong className="text-neutral-900">{sortedListings.length}</strong> available listings in <strong className="text-forest">{filters.city}</strong>
            </span>
          </div>

          {/* Grid or Empty State */}
          {sortedListings.length > 0 ? (
            <div className={`grid gap-5 ${
              isMapSplitOpen
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}>
              {sortedListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft max-w-lg mx-auto my-8">
              <div className="w-14 h-14 bg-forest-50 text-forest rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900">
                No matching places found
              </h3>
              <p className="text-xs text-neutral-500 mt-2 max-w-sm mx-auto">
                Try widening your price range, clearing dietary filters, or exploring neighboring localities in {filters.city}.
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 bg-forest hover:bg-forest-light text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-soft transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

        {/* Desktop Split Map View */}
        {isMapSplitOpen && (
          <aside className="hidden xl:block w-[460px] 2xl:w-[520px] shrink-0 sticky top-24 h-[calc(100vh-8rem)]">
            <LocalityMap listings={filteredListings} />
          </aside>
        )}

      </div>

      {/* 4. MOBILE FLOATING 'VIEW MAP' BUTTON */}
      <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-30">
        <button
          onClick={() => setMobileMapOpen(true)}
          className="bg-forest text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-lift flex items-center gap-2 hover:bg-forest-light transition-all border border-forest-light"
        >
          <Map className="w-4 h-4 text-amber-light" />
          <span>View Map ({sortedListings.length})</span>
        </button>
      </div>

      {/* 5. MOBILE FULL-SCREEN MAP MODAL */}
      {mobileMapOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-ivory-border flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-neutral-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest" />
                <span>Locality Radar — {filters.city}</span>
              </h3>
              <button
                onClick={() => setMobileMapOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow p-2">
              <LocalityMap listings={filteredListings} />
            </div>
          </div>
        </div>
      )}

      {/* 6. MOBILE FILTER BOTTOM SHEET DRAWER */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end lg:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto shadow-2xl">
            <FilterSidebar 
              isMobileModal={true}
              onCloseMobile={() => setIsFilterDrawerOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
