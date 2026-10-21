import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Listing } from '../../types';
import { 
  MapPin, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Compass, 
  ShieldCheck, 
  Navigation,
  Info
} from 'lucide-react';

interface LocalityMapProps {
  listings: Listing[];
  onSelectListing?: (id: string) => void;
}

export const LocalityMap: React.FC<LocalityMapProps> = ({ listings, onSelectListing }) => {
  const { filters, updateFilter, navigateToListing } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPin, setHoveredPin] = useState<Listing | null>(null);

  // Group listings by locality
  const localityClusters = React.useMemo(() => {
    const map = new Map<string, { count: number; minRent: number; x: number; y: number; sampleListing: Listing }>();
    
    listings.forEach(l => {
      const locKey = l.locality.split(' ')[0]; // Group by base locality
      if (!map.has(locKey)) {
        map.set(locKey, {
          count: 1,
          minRent: l.costs.rent,
          x: l.coordinates.x,
          y: l.coordinates.y,
          sampleListing: l
        });
      } else {
        const existing = map.get(locKey)!;
        existing.count += 1;
        existing.minRent = Math.min(existing.minRent, l.costs.rent);
      }
    });

    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  }, [listings]);

  return (
    <div className="relative w-full h-full min-h-[420px] bg-[#E8ECE9] rounded-2xl overflow-hidden border border-ivory-border shadow-soft flex flex-col justify-between">
      
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-ivory-border shadow-sm flex items-center gap-2 pointer-events-auto">
          <Navigation className="w-4 h-4 text-forest-emerald" />
          <span className="text-xs font-bold text-neutral-800">
            {filters.city} Locality Radar
          </span>
          <span className="text-[10px] bg-forest-50 text-forest font-semibold px-2 py-0.5 rounded-full border border-forest-100">
            {listings.length} places
          </span>
        </div>

        {/* Privacy Shield Pill */}
        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-ivory-border shadow-sm flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 pointer-events-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-forest-emerald" />
          <span className="hidden sm:inline">Approximate Localities Only</span>
        </div>
      </div>

      {/* Interactive SVG Radar Surface */}
      <div className="w-full h-full relative overflow-hidden bg-[#e5ece7] flex items-center justify-center select-none">
        
        {/* SVG Decorative Grid & Transit Arteries */}
        <svg className="w-full h-full absolute inset-0 opacity-40">
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cad8cf" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          
          {/* Faux Metro line */}
          <path 
            d="M 50 400 Q 200 250 400 200 T 700 80" 
            fill="none" 
            stroke="#a3c4b1" 
            strokeWidth="3" 
            strokeDasharray="6,4" 
          />
          {/* Faux Outer Ring Road */}
          <path 
            d="M 100 80 Q 350 180 500 380 T 750 450" 
            fill="none" 
            stroke="#c2d5ca" 
            strokeWidth="5" 
          />
        </svg>

        {/* Locality Cluster Markers */}
        <div 
          className="w-full h-full relative transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {localityClusters.map((cluster) => {
            const isSelected = filters.locality && cluster.sampleListing.locality.includes(filters.locality);

            return (
              <div
                key={cluster.name}
                style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => {
                  if (filters.locality === cluster.name) {
                    updateFilter('locality', null);
                  } else {
                    updateFilter('locality', cluster.name);
                  }
                }}
                onMouseEnter={() => setHoveredPin(cluster.sampleListing)}
                onMouseLeave={() => setHoveredPin(null)}
              >
                {/* Approximate Privacy Boundary Circle */}
                <div className={`absolute -inset-6 rounded-full border-2 border-dashed pointer-events-none transition-all ${
                  isSelected ? 'border-forest bg-forest/15 scale-125' : 'border-forest/20 bg-forest/5 group-hover:scale-110'
                }`} />

                {/* Pin Chip */}
                <div className={`relative px-2.5 py-1.5 rounded-full font-bold text-xs shadow-card flex items-center gap-1.5 transition-all duration-200 ${
                  isSelected
                    ? 'bg-forest text-white ring-2 ring-forest-light scale-110 shadow-lift'
                    : 'bg-white text-neutral-900 hover:bg-forest hover:text-white border border-ivory-border'
                }`}>
                  <MapPin className="w-3.5 h-3.5 text-amber-hover" />
                  <span>{cluster.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-amber text-stone-900' : 'bg-forest-50 text-forest'
                  }`}>
                    {cluster.count}
                  </span>
                </div>

                {/* Subtitle rent on hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  From ₹{cluster.minRent.toLocaleString('en-IN')}/mo
                </div>
              </div>
            );
          })}
        </div>

        {/* Hovered Listing Preview Tooltip Modal */}
        {hoveredPin && (
          <div 
            onClick={() => navigateToListing(hoveredPin.id)}
            className="absolute bottom-16 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-ivory-border shadow-lift z-30 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex gap-3 items-center">
              <img 
                src={hoveredPin.photos[0]} 
                alt={hoveredPin.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0" 
              />
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-forest uppercase tracking-wider block">
                  {hoveredPin.locality}
                </span>
                <h4 className="font-bold text-xs text-neutral-900 truncate">
                  {hoveredPin.title}
                </h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-extrabold text-sm text-forest">
                    ₹{hoveredPin.costs.rent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-neutral-500">/mo • Zero Brokerage</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Floating Map Controls (Zoom & Legend) */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        {/* Reset Filter Button if active */}
        {filters.locality ? (
          <button
            onClick={() => updateFilter('locality', null)}
            className="bg-forest text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md hover:bg-forest-light transition-all pointer-events-auto"
          >
            ✕ Reset {filters.locality}
          </button>
        ) : (
          <div className="bg-white/90 backdrop-blur-xs text-[11px] text-neutral-600 px-3 py-1 rounded-lg border border-ivory-border shadow-xs pointer-events-auto">
            Click any locality pin to filter
          </div>
        )}

        {/* Zoom In/Out Buttons */}
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-xl border border-ivory-border shadow-sm pointer-events-auto">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-700"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-700"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
