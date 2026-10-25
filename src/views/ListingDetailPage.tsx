import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Check, 
  IndianRupee, 
  Users, 
  Clock, 
  Building, 
  Wifi, 
  Sparkles, 
  Coffee, 
  CheckCircle2, 
  MessageSquare, 
  Video, 
  Eye, 
  ChevronRight,
  Info,
  X
} from 'lucide-react';

export const ListingDetailPage: React.FC = () => {
  const { 
    selectedListingId, 
    listings, 
    goBackToMarketplace, 
    isFavorite, 
    toggleFavorite,
    bookVisit,
    submitInquiry,
    currentUser,
    requireAuth
  } = useApp();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  
  // Visit Booking Form State
  const [visitDate, setVisitDate] = useState('Tomorrow, 5:30 PM');
  const [visitType, setVisitType] = useState<'In-Person' | 'Video Call'>('In-Person');
  const [visitSuccess, setVisitSuccess] = useState(false);

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState(currentUser?.name || '');
  const [inquiryPhone, setInquiryPhone] = useState(currentUser?.phone || '');
  const [inquiryEmail, setInquiryEmail] = useState(currentUser?.email || '');
  const [inquiryNote, setInquiryNote] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Sync user info if auth state changes
  React.useEffect(() => {
    if (currentUser) {
      if (!inquiryName) setInquiryName(currentUser.name);
      if (!inquiryPhone) setInquiryPhone(currentUser.phone);
      if (!inquiryEmail) setInquiryEmail(currentUser.email);
    }
  }, [currentUser]);

  const listing = listings.find(l => l.id === selectedListingId) || listings[0];
  const isFav = isFavorite(listing.id);

  const handleOpenVisitModal = () => {
    requireAuth({ type: 'visit', payload: { listingId: listing.id } }, () => {
      setVisitModalOpen(true);
    });
  };

  const handleOpenInquiryModal = () => {
    requireAuth({ type: 'inquiry', payload: { listingId: listing.id } }, () => {
      if (currentUser) {
        if (!inquiryName) setInquiryName(currentUser.name);
        if (!inquiryPhone) setInquiryPhone(currentUser.phone);
        if (!inquiryEmail) setInquiryEmail(currentUser.email);
      }
      setInquiryModalOpen(true);
    });
  };

  const handleToggleSave = () => {
    requireAuth({ type: 'save', listingId: listing.id }, () => {
      toggleFavorite(listing.id);
    });
  };

  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookVisit({
      listingId: listing.id,
      listingTitle: listing.title,
      locality: listing.locality,
      date: visitDate,
      timeSlot: '5:00 PM - 7:00 PM',
      visitType: visitType
    });
    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setVisitModalOpen(false);
    }, 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;

    submitInquiry({
      listingId: listing.id,
      listingTitle: listing.title,
      hostName: listing.host.name,
      userName: inquiryName,
      userPhone: inquiryPhone,
      userEmail: inquiryEmail || 'user@example.com',
      moveInDate: listing.availableFrom,
      message: inquiryNote || 'Hi, I am interested in this space and would like to connect.'
    });

    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setInquiryModalOpen(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryNote('');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-16 animate-in fade-in duration-200">
      
      {/* 1. TOP BREADCRUMB & ACTIONS */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goBackToMarketplace}
          className="flex items-center gap-2 text-xs font-bold text-forest hover:text-forest-dark bg-forest-50 px-3.5 py-2 rounded-xl transition-colors border border-forest-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Listings</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: listing.title, url: window.location.href });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-xl border border-ivory-border bg-white hover:bg-ivory text-neutral-600 transition-colors"
            title="Share listing"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all text-xs font-semibold ${
              isFav 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'bg-white border-ivory-border text-neutral-700 hover:bg-ivory'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isFav ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* 2. PHOTO GALLERY MOSAIC */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-8 max-h-[480px]">
        {/* Main Cover (Span 2 cols on md) */}
        <div 
          onClick={() => setLightboxOpen(true)}
          className="md:col-span-2 relative aspect-[4/3] md:aspect-auto h-full overflow-hidden cursor-pointer group bg-neutral-100"
        >
          <img 
            src={listing.photos[0]} 
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          <div className="absolute bottom-4 left-4 bg-forest-900/80 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-light" />
            <span>Click to expand gallery ({listing.photos.length} photos)</span>
          </div>
        </div>

        {/* Thumbnail 2 & 3 */}
        <div className="hidden md:grid grid-rows-2 gap-3 h-full">
          {listing.photos.slice(1, 3).map((photo, i) => (
            <div 
              key={i} 
              onClick={() => {
                setActivePhotoIdx(i + 1);
                setLightboxOpen(true);
              }}
              className="relative overflow-hidden cursor-pointer group bg-neutral-100 h-full"
            >
              <img 
                src={photo} 
                alt={`${listing.title} ${i + 2}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80';
                }}
              />
            </div>
          ))}
        </div>

        {/* Thumbnail 4 or Map teaser */}
        <div 
          onClick={() => setLightboxOpen(true)}
          className="hidden md:block relative overflow-hidden cursor-pointer group bg-neutral-100 h-full"
        >
          <img 
            src={listing.photos[listing.photos.length - 1]} 
            alt={`${listing.title} last`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-forest-900/40 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm">
            View All Photos ({listing.photos.length})
          </div>
        </div>
      </div>

      {/* 3. LISTING HEADER & OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Main Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Title & Badges */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="bg-forest text-white text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                {listing.category}
              </span>
              <span className="bg-ivory-dark text-neutral-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {listing.bhk}
              </span>
              <span className="bg-ivory-dark text-neutral-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {listing.furnishing}
              </span>
              {listing.isVerified && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest-emerald" />
                  Aadhaar Verified
                </span>
              )}
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 leading-tight">
              {listing.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 mt-2">
              <MapPin className="w-4 h-4 text-forest shrink-0" />
              <span>{listing.locality}, {listing.city}</span>
              <span>•</span>
              <span className="text-neutral-500">{listing.landmark}</span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-ivory-border shadow-soft text-xs">
            <div className="p-2">
              <span className="text-neutral-400 block text-[11px] mb-0.5">Availability</span>
              <span className="font-bold text-neutral-900 block">{listing.availableFrom}</span>
            </div>
            <div className="p-2 border-l border-ivory-border">
              <span className="text-neutral-400 block text-[11px] mb-0.5">Occupancy</span>
              <span className="font-bold text-neutral-900 block">{listing.preferences.occupancyType}</span>
            </div>
            <div className="p-2 border-l border-ivory-border">
              <span className="text-neutral-400 block text-[11px] mb-0.5">Diet Policy</span>
              <span className="font-bold text-neutral-900 block">{listing.preferences.dietary}</span>
            </div>
            <div className="p-2 border-l border-ivory-border">
              <span className="text-neutral-400 block text-[11px] mb-0.5">Brokerage</span>
              <span className="font-extrabold text-forest-emerald block">₹0 Guaranteed</span>
            </div>
          </div>

          {/* Transparent Cost Breakdown Table */}
          <div className="bg-white p-6 rounded-2xl border border-ivory-border shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-neutral-900 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-forest" />
              <span>Transparent Monthly Expense Breakdown</span>
            </h3>
            
            <div className="divide-y divide-ivory-border text-xs sm:text-sm">
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-600">Monthly Rent</span>
                <span className="font-bold text-forest text-base">₹{listing.costs.rent.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-600">Refundable Security Deposit</span>
                <span className="font-semibold text-neutral-800">₹{listing.costs.deposit.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-600">Society Maintenance</span>
                <span className="font-semibold text-neutral-800">₹{listing.costs.maintenance.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-neutral-600">Estimated Utilities (WiFi, Power, Gas, Maid)</span>
                <span className="font-semibold text-neutral-800">~₹{listing.costs.utilitiesEstimate.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="py-2.5 flex justify-between font-bold text-forest-emerald bg-forest-50/50 px-2 rounded-lg">
                <span>Roomzy Brokerage / Service Commission</span>
                <span>₹0 (Free)</span>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 italic">
              * Deposit is held securely and refunded at end of lease per standardized digital rental agreement terms.
            </p>
          </div>

          {/* About Space Description */}
          <div className="bg-white p-6 rounded-2xl border border-ivory-border shadow-soft space-y-3">
            <h3 className="font-display font-bold text-base text-neutral-900">About the Space</h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Roommate / Lifestyle Compatibility Matrix */}
          <div className="bg-white p-6 rounded-2xl border border-ivory-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-neutral-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber" />
                <span>Roommate Compatibility & House Rules</span>
              </h3>
              {listing.compatibilityScore && (
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                  {listing.compatibilityScore}% Compatibility
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-ivory rounded-xl border border-ivory-border">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Dietary Habits</span>
                <span className="font-bold text-neutral-900 mt-1 block">{listing.preferences.dietary}</span>
              </div>
              <div className="p-3 bg-ivory rounded-xl border border-ivory-border">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Smoking</span>
                <span className="font-bold text-neutral-900 mt-1 block">{listing.preferences.smoking}</span>
              </div>
              <div className="p-3 bg-ivory rounded-xl border border-ivory-border">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Drinking</span>
                <span className="font-bold text-neutral-900 mt-1 block">{listing.preferences.drinking}</span>
              </div>
              <div className="p-3 bg-ivory rounded-xl border border-ivory-border">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Work From Home</span>
                <span className="font-bold text-emerald-700 mt-1 block">WFH Friendly</span>
              </div>
              <div className="p-3 bg-ivory rounded-xl border border-ivory-border">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Pet Friendly</span>
                <span className="font-bold text-neutral-900 mt-1 block">{listing.preferences.petFriendly ? 'Yes' : 'No Pets'}</span>
              </div>
              <div className="p-3 bg-ivory rounded-xl border border-ivory-border">
                <span className="text-neutral-500 block text-[10px] uppercase font-bold">Overnight Guests</span>
                <span className="font-bold text-neutral-900 mt-1 block">Allowed with notice</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-neutral-800">Agreed Community Rules:</h4>
              <ul className="space-y-1.5">
                {listing.houseRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-emerald shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Amenities Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-ivory-border shadow-soft space-y-4">
            <h3 className="font-display font-bold text-base text-neutral-900">Amenities & Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {listing.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-ivory text-xs font-medium text-neutral-800">
                  <Check className="w-4 h-4 text-forest" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Approximate Locality & Nearby Hubs */}
          <div className="bg-white p-6 rounded-2xl border border-ivory-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-neutral-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest" />
                <span>Locality & Commute Guide</span>
              </h3>
              <span className="text-[11px] text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                Approximate Landmark Shown
              </span>
            </div>

            <p className="text-xs text-neutral-600">
              Located around {listing.landmark}, {listing.locality}. The exact apartment number and building gate directions will be automatically shared once an in-person or video visit is scheduled.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {listing.nearbyHubs.map((hub, idx) => (
                <div key={idx} className="p-3 bg-ivory rounded-xl border border-ivory-border text-xs">
                  <span className="font-bold text-neutral-900 block truncate">{hub.name}</span>
                  <div className="flex justify-between text-neutral-500 text-[11px] mt-1">
                    <span>{hub.distance}</span>
                    <span className="text-forest font-semibold">{hub.travelTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Host Profile & Sticky Action Card */}
        <div className="space-y-6">
          
          {/* Host Card */}
          <div className="glass-panel p-6 rounded-3xl shadow-glass space-y-4 border border-white/80">
            <div className="flex items-center gap-4">
              <img 
                src={listing.host.avatar} 
                alt={listing.host.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-forest/20 shadow-xs" 
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-hover block">
                  {listing.host.role}
                </span>
                <h3 className="font-display font-bold text-lg text-neutral-900">
                  {listing.host.name}
                </h3>
                <p className="text-xs text-neutral-500">
                  {listing.host.occupation} {listing.host.company ? `@ ${listing.host.company}` : ''}
                </p>
              </div>
            </div>

            <div className="bg-forest-50 p-3 rounded-xl space-y-1.5 text-xs border border-forest-100">
              <div className="flex items-center gap-2 text-forest font-bold">
                <ShieldCheck className="w-4 h-4 text-forest-emerald" />
                <span>{listing.host.verificationBadge}</span>
              </div>
              <div className="text-[11px] text-neutral-600 flex justify-between">
                <span>Response Time:</span>
                <span className="font-semibold">{listing.host.responseRate}</span>
              </div>
              <div className="text-[11px] text-neutral-600 flex justify-between">
                <span>Member Since:</span>
                <span className="font-semibold">{listing.host.joinedYear}</span>
              </div>
            </div>

            {/* Quick Pricing Summary in card */}
            <div className="pt-2 border-t border-ivory-border">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-500">Total Monthly:</span>
                <span className="font-display font-extrabold text-2xl text-forest">
                  ₹{listing.costs.rent.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-neutral-500">/mo</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleOpenVisitModal}
                className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all"
              >
                <Calendar className="w-4 h-4 text-amber-light" />
                <span>Schedule a Free Visit</span>
              </button>

              <button
                onClick={handleOpenInquiryModal}
                className="w-full bg-ivory hover:bg-ivory-dark text-neutral-900 font-semibold py-3 rounded-xl text-xs flex items-center justify-center gap-2 border border-ivory-border transition-all"
              >
                <MessageSquare className="w-4 h-4 text-forest" />
                <span>Send Direct Inquiry</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-neutral-400">
              Zero booking fees • Direct connection with verified flatmate
            </p>
          </div>

          {/* Safety & Guarantee Badge */}
          <div className="bg-forest-900 text-ivory-dark p-5 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 text-white font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Roomzy Living Guarantee</span>
            </div>
            <p className="text-[11px] text-ivory-warm/75 leading-relaxed">
              If the space does not match the photos during your visit, we will help you find alternative accommodation with priority booking.
            </p>
          </div>

        </div>

      </div>

      {/* 4. MOBILE STICKY ENQUIRY BAR */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-20 glass-nav border-t border-ivory-border/70 p-3 px-4 shadow-glass-float flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-neutral-400 block">Monthly Rent</span>
          <span className="font-display font-extrabold text-lg text-forest">
            ₹{listing.costs.rent.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenInquiryModal}
            className="p-2.5 rounded-xl border border-ivory-border bg-ivory text-neutral-700"
            aria-label="Send message"
          >
            <MessageSquare className="w-4 h-4 text-forest" />
          </button>
          
          <button
            onClick={handleOpenVisitModal}
            className="bg-forest hover:bg-forest-light text-white font-bold text-xs px-5 py-3 rounded-xl shadow-soft flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-light" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>

      {/* 5. VISIT SCHEDULING MODAL */}
      {visitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="glass-panel rounded-3xl max-w-md w-full p-6 shadow-glass-float relative border border-white/90">
            <button 
              onClick={() => setVisitModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            {visitSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-neutral-900">Visit Scheduled!</h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  We have notified {listing.host.name}. The exact gate directions and contact details are saved in your visits tab.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookVisitSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-900">
                    Schedule a Visit
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 truncate">
                    {listing.title}
                  </p>
                </div>

                {/* Visit Type */}
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setVisitType('In-Person')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                      visitType === 'In-Person'
                        ? 'border-forest bg-forest-50 text-forest'
                        : 'border-ivory-border text-neutral-600'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>In-Person Visit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('Video Call')}
                    className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 ${
                      visitType === 'Video Call'
                        ? 'border-forest bg-forest-50 text-forest'
                        : 'border-ivory-border text-neutral-600'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>Video Call Walkthrough</span>
                  </button>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Select Available Slot
                  </label>
                  <select
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-ivory border border-ivory-border p-2.5 rounded-xl text-xs font-semibold text-neutral-800"
                  >
                    <option value="Today, 6:00 PM">Today, 6:00 PM - 7:00 PM</option>
                    <option value="Tomorrow, 5:30 PM">Tomorrow, 5:30 PM - 6:30 PM</option>
                    <option value="This Saturday, 11:00 AM">This Saturday, 11:00 AM - 12:30 PM</option>
                    <option value="This Sunday, 4:00 PM">This Sunday, 4:00 PM - 5:30 PM</option>
                  </select>
                </div>

                <div className="p-3 bg-ivory-dark/60 rounded-xl text-[11px] text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-forest-emerald inline mr-1" />
                  Your phone number will remain private until the host confirms the appointment slot.
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-xl text-xs shadow-soft transition-all"
                >
                  Confirm Free Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. INQUIRY / DIRECT MESSAGE MODAL */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="glass-panel rounded-3xl max-w-md w-full p-6 shadow-glass-float relative border border-white/90">
            <button 
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-neutral-900">Message Sent!</h3>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  {listing.host.name} typically responds within {listing.host.responseRate.toLowerCase()}. Check your inquiries tab for replies.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-neutral-900">
                    Message {listing.host.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Ask about food arrangements, deposit terms, or room inspection.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full bg-ivory border border-ivory-border p-2.5 rounded-xl text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">WhatsApp / Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 98765 43210"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full bg-ivory border border-ivory-border p-2.5 rounded-xl text-xs text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Message or Query</label>
                  <textarea 
                    rows={3}
                    placeholder="Hi! I am looking to move in around 1st Nov. Is parking available?"
                    value={inquiryNote}
                    onChange={(e) => setInquiryNote(e.target.value)}
                    className="w-full bg-ivory border border-ivory-border p-2.5 rounded-xl text-xs text-neutral-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-xl text-xs shadow-soft transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. FULLSCREEN LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-white">
            <span className="text-xs font-semibold">
              Photo {activePhotoIdx + 1} of {listing.photos.length}
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-grow flex items-center justify-center p-2">
            <img 
              src={listing.photos[activePhotoIdx]} 
              alt={listing.title}
              className="max-h-[80vh] max-w-full object-contain rounded-xl"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {listing.photos.map((p, idx) => (
              <img 
                key={idx}
                src={p}
                alt="thumb"
                onClick={() => setActivePhotoIdx(idx)}
                className={`w-14 h-14 object-cover rounded-lg cursor-pointer transition-all ${
                  idx === activePhotoIdx ? 'ring-2 ring-amber scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
