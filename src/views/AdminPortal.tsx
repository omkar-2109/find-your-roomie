import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  UserCheck, 
  Clock, 
  Lock,
  ArrowRight,
  Eye
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    verifications, 
    approveVerification, 
    rejectVerification, 
    listings,
    setPersona
  } = useApp();

  const [activeTab, setActiveTab] = useState<'kyc' | 'moderation' | 'audit'>('kyc');

  const pendingCount = verifications.filter(v => v.status === 'Pending').length;
  const approvedCount = verifications.filter(v => v.status === 'Approved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* 1. ADMIN HEADER */}
      <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-lift mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-emerald-900">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-emerald-950 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Role-Protected Admin Portal
            </span>
            <span className="text-xs text-emerald-300">Roomzy Trust & Safety Desk</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl">
            Agent Credentials & Property Verification Desk
          </h1>
          <p className="text-xs text-emerald-200/80">
            Audit RERA registrations, broker licenses, property deeds, and owner utility proofs. Tenants & seekers are verified via institutional email (zero doc uploads).
          </p>
        </div>

        <button
          onClick={() => setPersona('consumer')}
          className="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-emerald-700 transition-colors self-start md:self-center"
        >
          Exit to Consumer View
        </button>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Pending Agent Reviews</span>
            <span className="font-display font-extrabold text-2xl text-amber-hover">{pendingCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-soft text-amber flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Approved Agents & Hosts</span>
            <span className="font-display font-extrabold text-2xl text-emerald-700">{approvedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-ivory-border shadow-soft flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-500 block mb-1">Verified Live Listings</span>
            <span className="font-display font-extrabold text-2xl text-forest">{listings.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. TABS */}
      <div className="flex items-center gap-2 border-b border-ivory-border pb-4 mb-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('kyc')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'kyc'
              ? 'bg-emerald-800 text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Agent & Lister Credentials Queue ({verifications.length})
        </button>

        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'moderation'
              ? 'bg-emerald-800 text-white shadow-soft'
              : 'bg-white border border-ivory-border text-neutral-600 hover:bg-ivory'
          }`}
        >
          Listing Content Audits ({listings.length})
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      {activeTab === 'kyc' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft overflow-hidden">
          <div className="p-5 border-b border-ivory-border flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-neutral-900">
                Agent & Property Credential Submissions
              </h3>
              <p className="text-xs text-neutral-500">
                Audited to ensure all property listers, brokers, and PG operators have genuine ownership or RERA licenses.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory text-neutral-500 uppercase tracking-wider text-[10px] font-bold border-b border-ivory-border">
                <tr>
                  <th className="p-4">Agent / Lister</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Credential Type</th>
                  <th className="p-4">Submission Details</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-border">
                {verifications.map(item => (
                  <tr key={item.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="p-4 font-bold text-neutral-900">{item.userName}</td>
                    <td className="p-4 text-neutral-600 font-semibold">{item.userRole}</td>
                    <td className="p-4 font-semibold text-neutral-800">
                      <span className="inline-block bg-stone-100 text-stone-800 px-2 py-0.5 rounded-md font-mono text-[11px]">
                        {item.idType}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-500">
                      <div className="font-mono text-[11px] bg-neutral-100 p-1.5 rounded inline-block">
                        {item.documentPreview}
                      </div>
                      {item.notes && (
                        <p className="text-[10px] text-stone-500 mt-0.5 italic">{item.notes}</p>
                      )}
                      <span className="block text-[10px] text-neutral-400 mt-1">{item.submittedDate}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.status === 'Pending'
                            ? 'bg-amber-soft text-amber-hover border border-amber/30'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {item.status === 'Pending' ? (
                        <>
                          <button
                            onClick={() => approveVerification(item.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs"
                          >
                            Approve Agent
                          </button>
                          <button
                            onClick={() => rejectVerification(item.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-neutral-400 italic">
                          Action completed ({item.notes || 'Reviewed'})
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'moderation' && (
        <div className="bg-white rounded-3xl border border-ivory-border shadow-soft p-6 space-y-4">
          <h3 className="font-display font-bold text-base text-neutral-900">
            Active Marketplace Listings Compliance Audit
          </h3>
          <p className="text-xs text-neutral-500">
            All current listings adhere to Roomzy's zero-brokerage and transparent cost disclosure policy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map(l => (
              <div key={l.id} className="p-4 bg-ivory rounded-2xl border border-ivory-border flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-neutral-900">{l.title}</h4>
                  <p className="text-neutral-500">{l.locality}, {l.city} • ₹{l.costs.rent}/mo</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full">
                  Policy Compliant
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
