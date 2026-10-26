import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MetroCity, LifestylePreferences, UserCategory } from '../../types';
import { uploadVerificationDoc } from '../../services/storageService';
import { supabase } from '../../lib/supabase';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Building2, 
  User, 
  Sparkles, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Briefcase, 
  FileCheck, 
  AlertCircle,
  Loader2,
  Check,
  GraduationCap
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'tenant' | 'host';
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, initialRole = 'tenant' }) => {
  const { currentUser, setCurrentUser, filters, updateFilter } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [role, setRole] = useState<'tenant' | 'host'>(currentUser?.role === 'host' ? 'host' : initialRole);
  const [userCategory, setUserCategory] = useState<UserCategory>(currentUser?.userCategory || 'working_professional');
  
  // Step 1: Preferences
  const [city, setCity] = useState<MetroCity>(currentUser?.city || filters.city);
  const [targetLocality, setTargetLocality] = useState('Koramangala / Indiranagar');
  const [budget, setBudget] = useState<number>(22000);
  const [moveInTimeline, setMoveInTimeline] = useState<'immediately' | 'within-15-days' | 'next-month'>('immediately');
  const [occupancyType, setOccupancyType] = useState<'Private Room' | 'Shared Room' | 'Whole Flat'>('Private Room');

  // Step 2: Lifestyle & Vibe
  const [dietary, setDietary] = useState<'Pure Veg' | 'Veg / Non-Veg Friendly' | 'Flexible'>('Veg / Non-Veg Friendly');
  const [smoking, setSmoking] = useState<'No Smoking' | 'Balcony Only' | 'Allowed'>('Balcony Only');
  const [drinking, setDrinking] = useState<'Non-Drinker' | 'Social' | 'Allowed'>('Social');
  const [wfhFriendly, setWfhFriendly] = useState<boolean>(true);
  const [petFriendly, setPetFriendly] = useState<boolean>(false);
  const [company, setCompany] = useState<string>(currentUser?.company || 'Tech Nomad');
  const [occupation, setOccupation] = useState<string>('Software Engineer');

  // Step 3: Identity Verification
  const [idType, setIdType] = useState<'Aadhaar' | 'Passport' | 'Electricity Bill'>(role === 'host' ? 'Electricity Bill' : 'Aadhaar');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      setIsUploading(true);
      setErrorMessage(null);

      let docUrl = '';
      if (selectedFile && currentUser) {
        docUrl = await uploadVerificationDoc(selectedFile, currentUser.id);
      }

      // Persist to device localStorage
      try {
        localStorage.setItem('roomzy_preferred_city', city);
        localStorage.setItem('roomzy_user_category', userCategory);
      } catch {}

      // Update Supabase profiles table if authenticated
      if (currentUser?.id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            role: role,
            city: city,
            company: company,
            user_category: userCategory,
            is_aadhaar_verified: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentUser.id);

        if (profileError) {
          console.warn('Profile table update note:', profileError.message);
        }
      }

      // Update local state in AppContext
      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          role: role,
          city: city,
          company: company,
          userCategory: userCategory,
          isAadhaarVerified: true
        });
      }

      updateFilter('city', city);
      setUploadSuccess(true);

      setTimeout(() => {
        setIsUploading(false);
        onClose();
      }, 1200);

    } catch (err: any) {
      console.error('Error completing onboarding:', err);
      setErrorMessage(err.message || 'Failed to submit verification document.');
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200/80 overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-800 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Global-Grade KYC & Vibe Match
            </span>
            <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Encrypted
            </span>
          </div>

          <h2 className="font-display font-extrabold text-2xl text-white">
            {role === 'host' ? 'Host & Space Verification' : 'Tenant Lifestyle & Trust Profile'}
          </h2>
          <p className="text-xs text-white/80 mt-1">
            Complete in 2 minutes to unlock zero-deposit privileges and algorithmic flatmate matching.
          </p>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center gap-2 mt-5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full flex-1 transition-all ${
                  step >= s ? 'bg-amber' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-white/60 font-medium mt-1.5">
            <span className={step >= 1 ? 'text-amber-light font-bold' : ''}>1. Space & Budget</span>
            <span className={step >= 2 ? 'text-amber-light font-bold' : ''}>2. Lifestyle Vibe</span>
            <span className={step >= 3 ? 'text-amber-light font-bold' : ''}>3. KYC Verification</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-grow">
          
          {/* STEP 1: Space & Budget Preferences */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-150">
              
              {/* Persona Role Switcher */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">I am registering as:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('tenant')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      role === 'tenant'
                        ? 'border-forest bg-forest/5 ring-2 ring-forest/20'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 text-xs">Tenant / Roommate</p>
                      <p className="text-[10px] text-neutral-500">Looking for a verified space</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('host')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      role === 'host'
                        ? 'border-forest bg-forest/5 ring-2 ring-forest/20'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber/20 text-stone-900 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4 text-forest" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 text-xs">Property Host / Lister</p>
                      <p className="text-[10px] text-neutral-500">Listing room, flat, or PG</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* User Category Selection */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">
                  Your Category & Occupation Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'student', title: 'Student', subtitle: 'College / University / Intern', icon: '🎓' },
                    { id: 'working_professional', title: 'Working Professional', subtitle: 'Tech / Corporate / Healthcare', icon: '💼' },
                    { id: 'job_seeker', title: 'Job Seeker / Fresher', subtitle: 'Relocating / Interviewing', icon: '🔍' },
                    { id: 'founder_freelancer', title: 'Founder / Freelancer', subtitle: 'Startup / Digital Nomad', icon: '🚀' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setUserCategory(cat.id as UserCategory)}
                      className={`p-2.5 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                        userCategory === cat.id
                          ? 'border-forest bg-forest/5 ring-2 ring-forest/20 shadow-xs'
                          : 'border-stone-200 hover:bg-stone-50 bg-white'
                      }`}
                    >
                      <span className="text-xl shrink-0 p-1 rounded-xl bg-stone-100">{cat.icon}</span>
                      <div>
                        <p className="font-bold text-neutral-900 text-xs leading-tight">{cat.title}</p>
                        <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">{cat.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* City Selection */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Target Metro City</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune', 'Hyderabad'] as MetroCity[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        city === c
                          ? 'bg-forest text-white border-forest shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Localities */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Preferred Locality / Corridor</label>
                <input 
                  type="text"
                  value={targetLocality}
                  onChange={(e) => setTargetLocality(e.target.value)}
                  placeholder="e.g. Koramangala, Indiranagar, HSR Layout"
                  className="w-full bg-stone-50 p-3 rounded-xl border border-stone-200 text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              {/* Budget Range Slider */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-bold text-neutral-700">Target Monthly Rent</label>
                  <span className="font-display font-extrabold text-sm text-forest">
                    ₹{budget.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <input 
                  type="range"
                  min={10000}
                  max={60000}
                  step={1000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-forest cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-medium">
                  <span>₹10,000</span>
                  <span>Zero Brokerage Guaranteed</span>
                  <span>₹60,000+</span>
                </div>
              </div>

              {/* Occupancy Type */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Desired Space Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Private Room', label: 'Private Room' },
                    { id: 'Shared Room', label: 'Shared Flatmate' },
                    { id: 'Whole Flat', label: 'Whole Flat' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setOccupancyType(t.id as any)}
                      className={`py-2 px-3 rounded-xl font-bold border text-center transition-all ${
                        occupancyType === t.id
                          ? 'bg-forest-900 text-white border-forest-900'
                          : 'bg-white hover:bg-stone-50 text-neutral-700 border-stone-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Lifestyle Vibe & Work Habits */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-150">
              
              {/* Professional Work Details */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Company / Organization</label>
                  <input 
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Swiggy, Google, Razorpay"
                    className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-neutral-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Designation</label>
                  <input 
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder="e.g. Software Engineer, Designer"
                    className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-neutral-900 font-medium"
                  />
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Dietary Compatibility</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Veg / Non-Veg Friendly', label: 'Veg & Non-Veg' },
                    { id: 'Pure Veg', label: 'Pure Veg Only' },
                    { id: 'Flexible', label: 'Flexible' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDietary(d.id as any)}
                      className={`py-2 px-2.5 rounded-xl font-semibold border text-center transition-all ${
                        dietary === d.id
                          ? 'bg-forest-900 text-white border-forest-900'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Habits: Smoking & Drinking */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Smoking Policy</label>
                  <select
                    value={smoking}
                    onChange={(e) => setSmoking(e.target.value as any)}
                    className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium"
                  >
                    <option value="No Smoking">Strictly No Smoking</option>
                    <option value="Balcony Only">Balcony Only</option>
                    <option value="Allowed">Smoking Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Drinking Policy</label>
                  <select
                    value={drinking}
                    onChange={(e) => setDrinking(e.target.value as any)}
                    className="w-full bg-stone-50 p-2.5 rounded-xl border border-stone-200 font-medium"
                  >
                    <option value="Social">Social Drinker</option>
                    <option value="Non-Drinker">Non-Drinker</option>
                    <option value="Allowed">Allowed</option>
                  </select>
                </div>
              </div>

              {/* WFH & Pet Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100/70 transition-colors">
                  <input 
                    type="checkbox"
                    checked={wfhFriendly}
                    onChange={(e) => setWfhFriendly(e.target.checked)}
                    className="w-4 h-4 accent-forest rounded"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">WFH Friendly</span>
                    <span className="text-[10px] text-neutral-500">Need high-speed fiber setup</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100/70 transition-colors">
                  <input 
                    type="checkbox"
                    checked={petFriendly}
                    onChange={(e) => setPetFriendly(e.target.checked)}
                    className="w-4 h-4 accent-forest rounded"
                  />
                  <div>
                    <span className="font-bold text-neutral-900 block">Pet Friendly</span>
                    <span className="text-[10px] text-neutral-500">Have or open to pets</span>
                  </div>
                </label>
              </div>

            </div>
          )}

          {/* STEP 3: Identity & Trust Verification (Aadhaar / ID Upload) */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-150">
              
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-forest-emerald shrink-0 mt-0.5" />
                <div className="text-emerald-950">
                  <h4 className="font-bold text-xs">Masked Trust Verification Guarantee</h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                    Documents are encrypted and stored in your private bucket folder. Only verification status badges are visible to prospective flatmates.
                  </p>
                </div>
              </div>

              {/* ID Document Selection */}
              <div>
                <label className="block font-bold text-neutral-700 mb-1.5">Document Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {role === 'host' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIdType('Electricity Bill')}
                        className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                          idType === 'Electricity Bill' ? 'bg-forest-900 text-white' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        Electricity Bill
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdType('Aadhaar')}
                        className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                          idType === 'Aadhaar' ? 'bg-forest-900 text-white' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        Aadhaar Card
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdType('Passport')}
                        className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                          idType === 'Passport' ? 'bg-forest-900 text-white' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        Passport
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIdType('Aadhaar')}
                        className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                          idType === 'Aadhaar' ? 'bg-forest-900 text-white' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        Aadhaar (Masked)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdType('Passport')}
                        className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                          idType === 'Passport' ? 'bg-forest-900 text-white' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        Passport
                      </button>
                      <button
                        type="button"
                        onClick={() => setIdType('Electricity Bill')}
                        className={`p-2.5 rounded-xl font-bold border text-center transition-all ${
                          idType === 'Electricity Bill' ? 'bg-forest-900 text-white' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        Company ID
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 hover:border-forest rounded-2xl p-6 text-center cursor-pointer transition-all bg-stone-50/70 hover:bg-forest/5 group"
              >
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <img 
                      src={previewUrl} 
                      alt="ID Preview" 
                      className="w-32 h-20 object-cover rounded-xl border border-stone-200 shadow-xs" 
                    />
                    <p className="font-bold text-xs text-forest flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {selectedFile?.name || 'Document selected'}
                    </p>
                    <span className="text-[11px] text-stone-500 hover:underline">Click to change document</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-neutral-800">
                        Upload {idType} Document
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Supports JPG, PNG, WEBP, or PDF (Max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {uploadSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 flex items-center gap-2 font-bold text-xs">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Verification document uploaded successfully! Aadhaar Verified badge granted.</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 font-bold text-xs text-neutral-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-500 hover:text-neutral-800"
            >
              Skip for now
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s + 1) as any)}
              className="bg-forest hover:bg-forest-light text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-soft hover:shadow-card transition-all flex items-center gap-1.5 ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isUploading}
              onClick={handleCompleteOnboarding}
              className="bg-forest hover:bg-forest-light disabled:opacity-60 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-soft hover:shadow-card transition-all flex items-center gap-2 ml-auto"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying & Saving...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-light" />
                  <span>Complete Verification & Save</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
