import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/marketplace/ListingCard';
import { 
  Heart, 
  CalendarCheck, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Compass,
  ArrowRight
} from 'lucide-react';

export const SavedPage: React.FC = () => {
  const { 
    listings, 
    favorites, 
    scheduledVisits, 
    inquiries, 
    setCurrentView,
    navigateToListing
  } = useApp();

  const [activeTab, setActiveTab] = useState<'favorites' | 'visits' | 'inquiries'>('favorites');

  const savedListings = listings.filter(l => favorites.includes(l.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900">
          My Saved & Scheduled
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Review your favorite shared-living spaces, confirmed visit appointments, and active host chats.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-ivory-border pb-4 mb-6">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'favorites'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'fill-white' : 'text-rose-500'}`} />
          <span>Saved Places ({savedListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('visits')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'visits'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          <CalendarCheck className="w-4 h-4 text-emerald-500" />
          <span>Booked Visits ({scheduledVisits.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'inquiries'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-amber" />
          <span>Inquiries Sent ({inquiries.length})</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. FAVORITES */}
      {activeTab === 'favorites' && (
        <div>
          {savedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft max-w-md mx-auto my-12">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900">
                No saved places yet
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                Tap the heart button on any listing card to save it for easy comparison.
              </p>
              <button
                onClick={() => setCurrentView('marketplace')}
                className="mt-4 bg-forest hover:bg-forest-light text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-soft transition-all"
              >
                Explore Marketplace
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. VISITS */}
      {activeTab === 'visits' && (
        <div className="space-y-4">
          {scheduledVisits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduledVisits.map(visit => (
                <div 
                  key={visit.id}
                  className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {visit.status}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {visit.visitType}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-neutral-900">
                    {visit.listingTitle}
                  </h3>

                  <div className="space-y-1.5 text-xs text-neutral-600 bg-ivory p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-forest" />
                      <span className="font-semibold">{visit.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-forest" />
                      <span>{visit.locality}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => navigateToListing(visit.listingId)}
                      className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
                    >
                      <span>View Place Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-neutral-400">
                      Gate directions sent via SMS
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft max-w-md mx-auto my-12">
              <CalendarCheck className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg text-neutral-900">
                No scheduled visits yet
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Book a free in-person or video visit on any listing details page.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          {inquiries.length > 0 ? (
            <div className="space-y-3">
              {inquiries.map(inq => (
                <div 
                  key={inq.id}
                  className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">{inq.listingTitle}</span>
                      <span className="bg-amber-soft text-amber-hover text-[10px] font-bold px-2 py-0.5 rounded-full">
                        To: {inq.hostName}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 italic">
                      "{inq.message}"
                    </p>
                    <span className="text-[10px] text-neutral-400 block">
                      Sent {new Date(inq.createdAt).toLocaleDateString()} • Move-in target: {inq.moveInDate}
                    </span>
                  </div>

                  <button
                    onClick={() => navigateToListing(inq.listingId)}
                    className="self-start md:self-center text-xs font-bold text-forest bg-forest-50 px-3.5 py-2 rounded-xl hover:bg-forest-100 transition-colors shrink-0"
                  >
                    View Listing
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-ivory-border shadow-soft max-w-md mx-auto my-12">
              <MessageSquare className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg text-neutral-900">
                No inquiries sent yet
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Send direct messages to verified flatmates and property managers.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
