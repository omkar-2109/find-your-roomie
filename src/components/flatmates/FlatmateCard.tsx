import React from 'react';
import { FlatmateProfile } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  IndianRupee, 
  MessageSquare,
  CheckCircle2,
  Heart,
  Home
} from 'lucide-react';

interface FlatmateCardProps {
  flatmate: FlatmateProfile;
}

export const FlatmateCard: React.FC<FlatmateCardProps> = ({ flatmate }) => {
  const { openChat, calculateMatchScore } = useApp();
  const matchScore = flatmate.compatibilityScore || calculateMatchScore(flatmate.lifestyle);

  const handleStartChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    openChat(undefined, {
      id: flatmate.userId,
      name: flatmate.name,
      avatar: flatmate.avatar,
      role: 'tenant'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-card hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full">
      
      {/* Top Header: Avatar, Name, Verification, Match Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={flatmate.avatar}
                alt={flatmate.name}
                className="w-13 h-13 rounded-2xl object-cover ring-2 ring-forest/20 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-display font-bold text-base text-stone-900 leading-tight">
                  {flatmate.name}
                </h3>
                {(flatmate.isWorkVerified || flatmate.isCollegeVerified || flatmate.verificationBadge || flatmate.isAadhaarVerified) && (
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                    flatmate.userCategory === 'student' || flatmate.isCollegeVerified
                      ? 'text-blue-800 bg-blue-50 border-blue-200'
                      : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                  }`}>
                    {flatmate.userCategory === 'student' || flatmate.isCollegeVerified ? (
                      <GraduationCap className="w-3 h-3 text-blue-600" />
                    ) : (
                      <Briefcase className="w-3 h-3 text-emerald-600" />
                    )}
                    <span>{flatmate.userCategory === 'student' || flatmate.isCollegeVerified ? 'Verified Student' : 'Verified Pro'}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                {flatmate.userCategory === 'student' ? (
                  <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                ) : (
                  <Briefcase className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                )}
                <span className="truncate max-w-[150px]">
                  {flatmate.occupation} • {flatmate.companyOrCollege}
                </span>
              </div>
            </div>
          </div>

          {/* Compatibility Score Badge */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl px-2.5 py-1 text-center shrink-0 shadow-2xs">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider leading-none">
              Match
            </span>
            <span className="font-extrabold text-xs text-emerald-800 flex items-center gap-0.5 mt-0.5">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              {matchScore}%
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
          "{flatmate.bio}"
        </p>

        {/* Budget & Move-in Info Pill Box */}
        <div className="grid grid-cols-2 gap-2 bg-stone-50 rounded-2xl p-2.5 mb-3 border border-stone-200/60 text-xs">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
              Budget Target
            </span>
            <span className="font-extrabold text-stone-900 text-sm">
              ₹{flatmate.budgetMax.toLocaleString('en-IN')}<span className="text-xs font-normal text-stone-500">/mo</span>
            </span>
          </div>

          <div>
            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">
              Move-In
            </span>
            <span className="font-bold text-stone-800 text-xs truncate block mt-0.5">
              {flatmate.moveInDate}
            </span>
          </div>
        </div>

        {/* Target Localities */}
        <div className="mb-3">
          <div className="flex items-center gap-1 text-[11px] text-stone-500 mb-1.5 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-forest" />
            <span>Looking in {flatmate.city}:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {flatmate.targetLocalities.map((loc, idx) => (
              <span
                key={idx}
                className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-lg"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Lifestyle Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {flatmate.lifestyle.dietary}
          </span>
          <span className="bg-stone-100 text-stone-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {flatmate.lifestyle.smoking}
          </span>
          {flatmate.lifestyle.wfhFriendly && (
            <span className="bg-blue-50 text-blue-800 border border-blue-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
              💻 WFH Friendly
            </span>
          )}
          {flatmate.lifestyle.petFriendly && (
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
              🐾 Pet Friendly
            </span>
          )}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-3 border-t border-stone-100">
        <button
          onClick={handleStartChat}
          className="w-full bg-forest hover:bg-forest-light text-white py-2.5 rounded-xl font-bold text-xs shadow-xs hover:shadow-card transition-all flex items-center justify-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5 text-amber-light" />
          <span>Connect & Chat</span>
        </button>
      </div>

    </div>
  );
};
