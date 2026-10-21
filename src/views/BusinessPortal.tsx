import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Listing, InquiryMessage } from '../types';
import { 
  Building2, 
  PlusCircle, 
  Users, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Trash2, 
  Eye, 
  IndianRupee,
  Settings,
  BarChart3,
  X
} from 'lucide-react';

export const BusinessPortal: React.FC = () => {
  const { 
    listings, 
    inquiries, 
    scheduledVisits, 
    addNewListing, 
    updateInquiryStatus,
    navigateToListing,
    setPersona
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'leads' | 'calendar' | 'plans' | 'settings'>('inventory');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newLocality, setNewLocality] = useState('Koramangala 4th Block');
  const [newCity, setNewCity] = useState<'Bengaluru' | 'Mumbai' | 'Delhi-NCR' | 'Pune' | 'Hyderabad'>('Bengaluru');
  const [newCategory, setNewCategory] = useState<'rooms' | 'flatmates' | 'flats' | 'pgs'>('rooms');
  const [newRent, setNewRent] = useState('18000');
  const [newDeposit, setNewDeposit] = useState('40000');
  const [newBhk, setNewBhk] = useState<'1 BHK' | '2 BHK' | '3 BHK' | 'PG Room'>('3 BHK');
  const [newFurnishing, setNewFurnishing] = useState<'Fully Furnished' | 'Semi Furnished'>('Fully Furnished');
  const [newDietary, setNewDietary] = useState<'Veg / Non-Veg Friendly' | 'Pure Veg'>('Veg / Non-Veg Friendly');
  const [newPhoto, setNewPhoto] = useState('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80');

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addNewListing({
      title: newTitle,
      tagline: 'Freshly listed verified space on Roomzy',
      category: newCategory,
      city: newCity,
      locality: newLocality,
      landmark: 'Near Main Commercial Hub',
      coordinates: { x: 50, y: 50 },
      photos: [
        newPhoto,
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80'
      ],
      costs: {
        rent: Number(newRent),
        deposit: Number(newDeposit),
        maintenance: 2000,
        utilitiesEstimate: 1200,
        brokerage: 0
      },
      availableFrom: 'Immediately',
      furnishing: newFurnishing,
      bhk: newBhk,
      amenities: ['High-Speed WiFi', 'Attached Washroom', 'Power Backup', 'AC in Room', 'Cook Available'],
      preferences: {
        dietary: newDietary,
        smoking: 'Balcony Only',
        drinking: 'Social',
        genderPreference: 'Any',
        wfhFriendly: true,
        petFriendly: false,
        lateNightsAllowed: true,
        occupancyType: 'Private Room'
      },
      host: {
        id: 'host-business-current',
        name: 'Koramangala Living Co.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'Owner',
        verifiedGovtId: true,
        verificationBadge: 'Verified Property Owner',
        responseRate: 'Responds within 15 mins',
        joinedYear: '2024'
      },
      compatibilityScore: 92,
      description: 'Well-maintained, spacious shared flat with premium amenities, zero broker involvement, and digital rental agreement.',
      houseRules: [
        'Strictly non-smoking inside bedroom',
        'Respectful of society quiet hours after 11 PM'
      ],
      nearbyHubs: [
        { name: 'Nearest Metro Station', distance: '800m', travelTime: '8 mins walk' }
      ],
      isVerified: true
    });

    setAddModalOpen(false);
    setNewTitle('');
    alert('Listing created successfully and published to Roomzy Marketplace!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* 1. SAAS TOP HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-ivory-border shadow-soft mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber text-stone-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
              SaaS Workspace
            </span>
            <span className="text-xs text-neutral-400">Pro Host Tier (3/5 Units Used)</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900">
            Koramangala Living Co. Dashboard
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your rental inventory, tenant leads, and scheduled property viewings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-forest hover:bg-forest-light text-white font-bold text-xs px-4 py-3 rounded-xl flex items-center gap-2 shadow-soft hover:shadow-card transition-all"
          >
            <PlusCircle className="w-4 h-4 text-amber-light" />
            <span>Add Property / Room</span>
          </button>

          <button
            onClick={() => setPersona('consumer')}
            className="bg-ivory hover:bg-ivory-dark text-neutral-700 font-semibold text-xs px-4 py-3 rounded-xl border border-ivory-border transition-colors"
          >
            View Live Marketplace
          </button>
        </div>
      </div>

      {/* 2. KEY METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
            <span>Total Units</span>
            <Building2 className="w-4 h-4 text-forest" />
          </div>
          <div className="font-display font-extrabold text-2xl text-neutral-900">
            {listings.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            ● 85% Occupancy Rate
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
            <span>Active Leads</span>
            <Users className="w-4 h-4 text-amber" />
          </div>
          <div className="font-display font-extrabold text-2xl text-neutral-900">
            {inquiries.length}
          </div>
          <span className="text-[11px] text-amber-hover font-semibold mt-1 block">
            {inquiries.filter(i => i.status === 'New').length} pending responses
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
            <span>Scheduled Visits</span>
            <Calendar className="w-4 h-4 text-forest-emerald" />
          </div>
          <div className="font-display font-extrabold text-2xl text-neutral-900">
            {scheduledVisits.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Upcoming viewings
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft">
          <div className="flex items-center justify-between text-neutral-500 text-xs mb-2">
            <span>Projected Monthly Yield</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-forest">
            ₹1,24,000
          </div>
          <span className="text-[11px] text-neutral-500 font-medium mt-1 block">
            Zero brokerage retained
          </span>
        </div>
      </div>

      {/* 3. SAAS TAB NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-ivory-border pb-4 mb-6 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'inventory'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Inventory Manager ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'leads'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Lead CRM Pipeline ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'calendar'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Visit Calendar ({scheduledVisits.length})
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'plans'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Plan Limits & Analytics
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'settings'
              ? 'bg-forest text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Host Settings
        </button>
      </div>

      {/* 4. TAB PANELS */}

      {/* INVENTORY TAB */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft overflow-hidden">
          <div className="p-5 border-b border-ivory-border flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-neutral-900">
              Active Property & Room Inventory
            </h3>
            <button
              onClick={() => setAddModalOpen(true)}
              className="text-xs font-bold text-forest hover:underline"
            >
              + Add Another Room
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory text-neutral-500 uppercase tracking-wider text-[10px] font-bold border-b border-ivory-border">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Locality</th>
                  <th className="p-4">Rent (₹/mo)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-border">
                {listings.map(l => (
                  <tr key={l.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={l.photos[0]} 
                          alt="" 
                          className="w-12 h-12 rounded-xl object-cover shrink-0" 
                        />
                        <div>
                          <span className="font-bold text-neutral-900 block truncate max-w-xs">{l.title}</span>
                          <span className="text-[11px] text-neutral-400">{l.bhk} • {l.furnishing}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 capitalize font-medium">{l.category}</td>
                    <td className="p-4 text-neutral-600">{l.locality}</td>
                    <td className="p-4 font-bold text-forest">₹{l.costs.rent.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Active & Listed
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => navigateToListing(l.id)}
                        className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600" 
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEADS CRM TAB */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft overflow-hidden">
          <div className="p-5 border-b border-ivory-border">
            <h3 className="font-display font-bold text-base text-neutral-900">
              Prospective Tenant Inquiries & Lead Pipeline
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Review messages and mark status after contacting applicants.
            </p>
          </div>

          <div className="divide-y divide-ivory-border">
            {inquiries.map(inq => (
              <div key={inq.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{inq.userName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inq.status === 'New' ? 'bg-amber-soft text-amber-hover' : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {inq.userPhone}</span>
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {inq.userEmail}</span>
                  </div>
                  <p className="text-xs text-neutral-700 bg-ivory p-2.5 rounded-xl italic mt-2">
                    "{inq.message}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                    className="bg-ivory border border-ivory-border rounded-xl text-xs font-semibold p-2 text-neutral-800 focus:outline-none"
                  >
                    <option value="New">Mark: New</option>
                    <option value="Contacted">Mark: Contacted</option>
                    <option value="Visit Booked">Mark: Visit Booked</option>
                    <option value="Closed">Mark: Closed</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CALENDAR TAB */}
      {activeTab === 'calendar' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-neutral-900">
            Confirmed Tenant Visit Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scheduledVisits.map(v => (
              <div key={v.id} className="p-4 bg-ivory rounded-2xl border border-ivory-border space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-neutral-900">{v.listingTitle}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {v.visitType}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-forest font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{v.date} ({v.timeSlot})</span>
                </div>
                <p className="text-[11px] text-neutral-500">{v.locality}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PLANS & ANALYTICS TAB */}
      {activeTab === 'plans' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-6">
          <div className="max-w-md space-y-3">
            <h3 className="font-display font-bold text-lg text-neutral-900">
              Pro Host Subscription Plan
            </h3>
            <p className="text-xs text-neutral-500">
              You are currently on the Pro Host Plan with priority listing visibility and verified landlord badge.
            </p>
            <div className="p-4 bg-forest-50 rounded-2xl border border-forest-100 space-y-2">
              <div className="flex justify-between text-xs font-bold text-forest">
                <span>Listing Limit Usage:</span>
                <span>{listings.length} of 5 Active Units</span>
              </div>
              <div className="w-full bg-forest-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-forest h-full rounded-full" 
                  style={{ width: `${(listings.length / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-4 max-w-xl">
          <h3 className="font-display font-bold text-lg text-neutral-900">
            Host Payout & Identity Settings
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-neutral-700 mb-1">Host Entity Name</label>
              <input type="text" readOnly value="Koramangala Living Co." className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium" />
            </div>
            <div>
              <label className="block font-bold text-neutral-700 mb-1">UPI ID for Rent Disbursements</label>
              <input type="text" readOnly value="koramangala.living@okhdfcbank" className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium" />
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest-emerald" />
              <span>DigiLocker KYC & BESCOM Property Ownership Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD PROPERTY MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-ivory-border max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setAddModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-xl text-neutral-900 mb-4">
              Add New Shared-Living Unit
            </h3>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Listing Headline</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Spacious Master Bedroom with Private Balcony" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border text-neutral-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Target City</label>
                  <select 
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value as any)}
                    className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Locality</label>
                  <input 
                    type="text" 
                    required
                    value={newLocality}
                    onChange={(e) => setNewLocality(e.target.value)}
                    className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Monthly Rent (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={newRent}
                    onChange={(e) => setNewRent(e.target.value)}
                    className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Security Deposit (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={newDeposit}
                    onChange={(e) => setNewDeposit(e.target.value)}
                    className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Listing Type</label>
                  <select 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                  >
                    <option value="rooms">Private Room</option>
                    <option value="flatmates">Flatmate Opening</option>
                    <option value="flats">Whole Flat</option>
                    <option value="pgs">Managed PG</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Furnishing</label>
                  <select 
                    value={newFurnishing}
                    onChange={(e) => setNewFurnishing(e.target.value as any)}
                    className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                  >
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Dietary Policy</label>
                <select 
                  value={newDietary}
                  onChange={(e) => setNewDietary(e.target.value as any)}
                  className="w-full bg-ivory p-2.5 rounded-xl border border-ivory-border font-medium"
                >
                  <option value="Veg / Non-Veg Friendly">Veg / Non-Veg Friendly</option>
                  <option value="Pure Veg">Pure Veg Only</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-xl shadow-soft transition-all"
              >
                Publish to Roomzy Marketplace
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
