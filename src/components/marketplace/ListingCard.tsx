import React, { useState } from 'react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Users, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isFavorite, toggleFavorite, navigateToListing, requireAuth } = useApp();
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const isFav = isFavorite(listing.id);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % listing.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + listing.photos.length) % listing.photos.length);
  };

  const getCategoryBadge = () => {
    switch (listing.category) {
      case 'rooms':
        return <span className="glass-dark text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">Private Room</span>;
      case 'flatmates':
        return <span className="bg-emerald-800/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">Flatmate Wanted</span>;
      case 'groups':
        return <span className="bg-amber text-stone-950 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs"><Sparkles className="w-3 h-3" /> Find Together</span>;
      case 'flats':
        return <span className="bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">{listing.bhk} Entire Flat</span>;
      case 'pgs':
        return <span className="bg-indigo-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">Managed PG</span>;
      case 'wanted':
        return <span className="bg-teal-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">Roommate Seeking</span>;
    }
  };

  return (
    <div 
      onClick={() => navigateToListing(listing.id)}
      className="group bg-white rounded-3xl overflow-hidden border border-ivory-border hover:border-forest/30 shadow-card hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Photo Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img 
          src={listing.photos[currentPhotoIdx]} 
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {getCategoryBadge()}
          {listing.isVerified && (
            <span className="glass-card-floating text-forest-emerald text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-emerald-100/80">
              <ShieldCheck className="w-3.5 h-3.5 text-forest-emerald" />
              Verified
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            requireAuth({ type: 'save', listingId: listing.id }, () => {
              toggleFavorite(listing.id);
            });
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFav 
              ? 'bg-white text-rose-500 shadow-md scale-110' 
              : 'bg-black/30 hover:bg-white text-white hover:text-rose-500 shadow-glass'
          }`}
          aria-label={isFav ? "Remove from saved" : "Save listing"}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Image Carousel Controls on Hover */}
        {listing.photos.length > 1 && (
          <>
            <button 
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-xs">
              {listing.photos.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === currentPhotoIdx ? 'w-3 bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Move-in tag */}
        <div className="absolute bottom-3 left-3 bg-forest-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Calendar className="w-3 h-3 text-amber-light" />
          <span>Avail. {listing.availableFrom}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          {/* Locality & Compatibility Score */}
          <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-1">
            <span className="flex items-center gap-1 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
              <span className="text-neutral-800 font-semibold">{listing.locality}</span>
            </span>
            {listing.compatibilityScore && (
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0">
                {listing.compatibilityScore}% Match
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-base text-neutral-900 line-clamp-1 group-hover:text-forest transition-colors">
            {listing.title}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {listing.landmark}
          </p>

          {/* Preference / Amenity Tags */}
          <div className="flex items-center gap-1.5 flex-wrap mt-3">
            <span className="text-[11px] font-medium bg-ivory-dark text-neutral-700 px-2 py-0.5 rounded-md">
              {listing.preferences.dietary}
            </span>
            {listing.amenities.slice(0, 2).map((amenity, i) => (
              <span key={i} className="text-[11px] font-medium bg-ivory-dark text-neutral-700 px-2 py-0.5 rounded-md">
                {amenity}
              </span>
            ))}
            {listing.amenities.length > 2 && (
              <span className="text-[11px] text-neutral-400 font-medium px-1">
                +{listing.amenities.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Pricing & Host */}
        <div className="pt-3 border-t border-ivory-border flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-extrabold text-lg text-forest">
                ₹{listing.costs.rent.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-neutral-500 font-normal">/month</span>
            </div>
            <div className="text-[10px] text-neutral-500 flex items-center gap-1">
              <span>Dep: ₹{listing.costs.deposit.toLocaleString('en-IN')}</span>
              <span>•</span>
              <span className="text-forest-emerald font-semibold">Zero Brokerage</span>
            </div>
          </div>

          {/* Host Mini Avatar */}
          <div className="flex items-center gap-2 text-right">
            <div className="hidden sm:block">
              <span className="block text-[11px] font-semibold text-neutral-800 leading-tight">
                {listing.host.name.split(' ')[0]}
              </span>
              <span className="block text-[10px] text-neutral-500">
                {listing.host.role}
              </span>
            </div>
            <img 
              src={listing.host.avatar} 
              alt={listing.host.name} 
              className="w-8 h-8 rounded-full object-cover ring-2 ring-forest/10"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
