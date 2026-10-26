import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MetroCity, UserCategory, LifestylePreferences } from '../../types';
import { 
  X, 
  Sparkles, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Users,
  ShieldCheck
} from 'lucide-react';

interface FlatmateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlatmateProfileModal: React.FC<FlatmateProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, filters, saveFlatmateProfile } = useApp();

  const [budget, setBudget] = useState(20000);
  const [moveInDate, setMoveInDate] = useState('Within 2 Weeks');
  const [lookingForBHK, setLookingForBHK] = useState<'1 Room in Shared Flat' | '2 BHK' | '3 BHK' | 'Any'>('2 BHK');
  const [occupation, setOccupation] = useState(currentUser?.company || 'Working Professional');
  const [companyOrCollege, setCompanyOrCollege] = useState('Tech / Startup');
  const [targetLocalities, setTargetLocalities] = useState('Koramangala, Indiranagar, HSR Layout');
  const [dietary, setDietary] = useState<'Pure Veg' | 'Veg / Non-Veg Friendly' | 'Flexible'>('Flexible');
  const [smoking, setSmoking] = useState<'No Smoking' | 'Balcony Only' | 'Allowed'>('No Smoking');
  const [drinking, setDrinking] = useState<'Non-Drinker' | 'Social' | 'Allowed'>('Social');
  const [wfhFriendly, setWfhFriendly] = useState(true);
  const [petFriendly, setPetFriendly] = useState(true);
  const [bio, setBio] = useState('Looking for clean, friendly flatmates to team up and rent a flat together with zero brokerage.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const localitiesArr = targetLocalities
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    await saveFlatmateProfile({
      budgetMax: budget,
      moveInDate,
      lookingForBHK,
      occupation,
      companyOrCollege,
      targetLocalities: localitiesArr.length > 0 ? localitiesArr : ['Prime Locality'],
      lifestyle: {
        dietary,
        smoking,
        drinking,
        genderPreference: 'Any',
        wfhFriendly,
        petFriendly,
        lateNightsAllowed: true,
        occupancyType: 'Private Room'
      },
      bio
    });

    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber text-stone-950 flex items-center justify-center font-bold text-sm shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base tracking-tight text-white leading-none">
                Post Roommate & Team Up Profile
              </h3>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Get discovered by compatible flatmates in {filters.city}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              Your Flatmate profile has been published! Other tenants can now match and chat with you.
            </div>
          )}

          {/* Budget & Desired BHK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Max Monthly Budget (₹)
              </label>
              <input
                type="number"
                step="1000"
                min="5000"
                max="100000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-forest/20"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Looking For
              </label>
              <select
                value={lookingForBHK}
                onChange={(e) => setLookingForBHK(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-semibold focus:ring-2 focus:ring-forest/20"
              >
                <option value="2 BHK">2 BHK (Team Up with 1 Flatmate)</option>
                <option value="3 BHK">3 BHK (Team Up with 2 Flatmates)</option>
                <option value="1 Room in Shared Flat">1 Room in Shared Flat</option>
                <option value="Any">Flexible / Any</option>
              </select>
            </div>
          </div>

          {/* Target Localities */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1">
              Target Localities in {filters.city} (comma-separated)
            </label>
            <input
              type="text"
              value={targetLocalities}
              onChange={(e) => setTargetLocalities(e.target.value)}
              placeholder="e.g. Koramangala, Indiranagar, HSR Layout"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-forest/20"
              required
            />
          </div>

          {/* Occupation & College/Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Your Occupation / Role
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="e.g. Software Engineer / Product Manager"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-forest/20"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1">
                Company or College
              </label>
              <input
                type="text"
                value={companyOrCollege}
                onChange={(e) => setCompanyOrCollege(e.target.value)}
                placeholder="e.g. Tech Corp / IIT / IIM"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-forest/20"
                required
              />
            </div>
          </div>

          {/* Lifestyle Habits */}
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
            <h4 className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-forest-emerald" />
              Lifestyle & House Habits
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Dietary</label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-1.5 text-xs text-stone-800"
                >
                  <option value="Flexible">Flexible</option>
                  <option value="Pure Veg">Pure Veg Only</option>
                  <option value="Veg / Non-Veg Friendly">Veg & Non-Veg</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Smoking</label>
                <select
                  value={smoking}
                  onChange={(e) => setSmoking(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-1.5 text-xs text-stone-800"
                >
                  <option value="No Smoking">No Smoking</option>
                  <option value="Balcony Only">Balcony Only</option>
                  <option value="Allowed">Allowed</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Drinking</label>
                <select
                  value={drinking}
                  onChange={(e) => setDrinking(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-lg p-1.5 text-xs text-stone-800"
                >
                  <option value="Social">Social</option>
                  <option value="Non-Drinker">Non-Drinker</option>
                  <option value="Allowed">Allowed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                <input
                  type="checkbox"
                  checked={wfhFriendly}
                  onChange={(e) => setWfhFriendly(e.target.checked)}
                  className="rounded text-forest focus:ring-forest"
                />
                <span>Hybrid / Remote WFH</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                <input
                  type="checkbox"
                  checked={petFriendly}
                  onChange={(e) => setPetFriendly(e.target.checked)}
                  className="rounded text-forest focus:ring-forest"
                />
                <span>Pet Friendly</span>
              </label>
            </div>
          </div>

          {/* Bio / Personal Note */}
          <div>
            <label className="text-xs font-bold text-stone-800 block mb-1">
              Short Bio / What You're Looking For
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell prospective flatmates about your vibe, routine, and ideal living situation..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-forest/20"
              required
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-forest hover:bg-forest-light text-white py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-soft hover:shadow-card transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-light" />
              <span>{isSubmitting ? 'Publishing Profile...' : 'Publish Roommate Profile'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
