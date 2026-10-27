import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, HeartHandshake, FileCheck, X, Shield, Lock, Scale, Sparkles } from 'lucide-react';
import { MetroCity } from '../../types';

export const Footer: React.FC = () => {
  const { updateFilter, setCurrentView } = useApp();
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | 'safety' | 'rera' | null>(null);

  const handleCitySelect = (city: MetroCity, locality?: string) => {
    updateFilter('city', city);
    if (locality) updateFilter('locality', locality);
    setCurrentView('marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest-900 text-ivory-dark pt-16 pb-24 lg:pb-12 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Promise Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-forest-800/80">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-forest-800 text-amber-light shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Zero Brokerage</h4>
              <p className="text-xs text-ivory-warm/70 mt-1">Connect directly with verified flatmates and owners. No middleman fees ever.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-forest-800 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Agent & Work/Edu Verified</h4>
              <p className="text-xs text-ivory-warm/70 mt-1">Listers submit credentials while flatmates verify via corporate or college email with zero document uploads.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-forest-800 text-amber-light shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Find Together</h4>
              <p className="text-xs text-ivory-warm/70 mt-1">Team up with compatible professionals to lease whole flats at 40% lower cost.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-forest-800 text-emerald-400 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Digital Agreements</h4>
              <p className="text-xs text-ivory-warm/70 mt-1">Instant compliant e-agreements with transparent security deposit terms.</p>
            </div>
          </div>
        </div>

        {/* Localities Directory */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 border-b border-forest-800/80 text-xs">
          <div>
            <h5 className="font-display font-semibold text-white mb-3 uppercase tracking-wider text-[11px] text-amber-light">
              Bengaluru
            </h5>
            <ul className="space-y-2 text-ivory-warm/80">
              <li><button onClick={() => handleCitySelect('Bengaluru', 'Koramangala')} className="hover:text-white transition-colors">Koramangala 4th & 5th Block</button></li>
              <li><button onClick={() => handleCitySelect('Bengaluru', 'Indiranagar')} className="hover:text-white transition-colors">Indiranagar 100ft Road</button></li>
              <li><button onClick={() => handleCitySelect('Bengaluru', 'HSR Layout')} className="hover:text-white transition-colors">HSR Layout Sectors 1-6</button></li>
              <li><button onClick={() => handleCitySelect('Bengaluru', 'Bellandur')} className="hover:text-white transition-colors">Bellandur & EcoWorld</button></li>
              <li><button onClick={() => handleCitySelect('Bengaluru', 'Whitefield')} className="hover:text-white transition-colors">Whitefield ITPL</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-semibold text-white mb-3 uppercase tracking-wider text-[11px] text-amber-light">
              Mumbai
            </h5>
            <ul className="space-y-2 text-ivory-warm/80">
              <li><button onClick={() => handleCitySelect('Mumbai', 'Bandra West')} className="hover:text-white transition-colors">Bandra West & Carter Rd</button></li>
              <li><button onClick={() => handleCitySelect('Mumbai', 'Powai')} className="hover:text-white transition-colors">Powai Hiranandani</button></li>
              <li><button onClick={() => handleCitySelect('Mumbai', 'Andheri East')} className="hover:text-white transition-colors">Andheri East & MIDC</button></li>
              <li><button onClick={() => handleCitySelect('Mumbai', 'Juhu')} className="hover:text-white transition-colors">Juhu & Vile Parle</button></li>
              <li><button onClick={() => handleCitySelect('Mumbai', 'Worli')} className="hover:text-white transition-colors">Worli & Lower Parel</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-semibold text-white mb-3 uppercase tracking-wider text-[11px] text-amber-light">
              Delhi-NCR
            </h5>
            <ul className="space-y-2 text-ivory-warm/80">
              <li><button onClick={() => handleCitySelect('Delhi-NCR', 'Cyber City')} className="hover:text-white transition-colors">Cyber City Gurgaon</button></li>
              <li><button onClick={() => handleCitySelect('Delhi-NCR', 'Golf Course Road')} className="hover:text-white transition-colors">Golf Course Road DLF 5</button></li>
              <li><button onClick={() => handleCitySelect('Delhi-NCR', 'Noida')} className="hover:text-white transition-colors">Noida Sector 62 & 137</button></li>
              <li><button onClick={() => handleCitySelect('Delhi-NCR', 'Hauz Khas')} className="hover:text-white transition-colors">Hauz Khas & Green Park</button></li>
              <li><button onClick={() => handleCitySelect('Delhi-NCR', 'Saket')} className="hover:text-white transition-colors">Saket & Malviya Nagar</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-semibold text-white mb-3 uppercase tracking-wider text-[11px] text-amber-light">
              Pune
            </h5>
            <ul className="space-y-2 text-ivory-warm/80">
              <li><button onClick={() => handleCitySelect('Pune', 'Koregaon Park')} className="hover:text-white transition-colors">Koregaon Park Lanes</button></li>
              <li><button onClick={() => handleCitySelect('Pune', 'Hinjewadi')} className="hover:text-white transition-colors">Hinjewadi Phase 1 & 2</button></li>
              <li><button onClick={() => handleCitySelect('Pune', 'Viman Nagar')} className="hover:text-white transition-colors">Viman Nagar</button></li>
              <li><button onClick={() => handleCitySelect('Pune', 'Kalyani Nagar')} className="hover:text-white transition-colors">Kalyani Nagar</button></li>
              <li><button onClick={() => handleCitySelect('Pune', 'Baner')} className="hover:text-white transition-colors">Baner & Balewadi</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-semibold text-white mb-3 uppercase tracking-wider text-[11px] text-amber-light">
              Hyderabad
            </h5>
            <ul className="space-y-2 text-ivory-warm/80">
              <li><button onClick={() => handleCitySelect('Hyderabad', 'Gachibowli')} className="hover:text-white transition-colors">Gachibowli Financial Dist</button></li>
              <li><button onClick={() => handleCitySelect('Hyderabad', 'Hitec City')} className="hover:text-white transition-colors">Hitec City & Cyber Towers</button></li>
              <li><button onClick={() => handleCitySelect('Hyderabad', 'Madhapur')} className="hover:text-white transition-colors">Madhapur</button></li>
              <li><button onClick={() => handleCitySelect('Hyderabad', 'Kondapur')} className="hover:text-white transition-colors">Kondapur Botanical Garden</button></li>
              <li><button onClick={() => handleCitySelect('Hyderabad', 'Jubilee Hills')} className="hover:text-white transition-colors">Jubilee Hills</button></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory-warm/60">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-base tracking-tight">ROOMZY</span>
            <span>© 2026 Roomzy Technologies Private Limited. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => setLegalModal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => setLegalModal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => setLegalModal('safety')} className="hover:text-white transition-colors">Safety Guidelines</button>
            <button onClick={() => setLegalModal('rera')} className="hover:text-white transition-colors">RERA Compliance</button>
            <button 
              onClick={() => {
                setCurrentView('oauth-consent');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium bg-forest-800/80 px-2.5 py-1 rounded-full border border-forest-700"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>OAuth Consent UI</span>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Compliance & Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel bg-white/95 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-glass-float relative border border-white/90 text-neutral-900 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-ivory-border pb-3 mb-5 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setLegalModal('terms')}
                className={`px-3 py-1.5 rounded-xl transition-all ${legalModal === 'terms' ? 'bg-forest text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setLegalModal('privacy')}
                className={`px-3 py-1.5 rounded-xl transition-all ${legalModal === 'privacy' ? 'bg-forest text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
              >
                Privacy & DPDP
              </button>
              <button
                onClick={() => setLegalModal('safety')}
                className={`px-3 py-1.5 rounded-xl transition-all ${legalModal === 'safety' ? 'bg-forest text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
              >
                Safety Guidelines
              </button>
              <button
                onClick={() => setLegalModal('rera')}
                className={`px-3 py-1.5 rounded-xl transition-all ${legalModal === 'rera' ? 'bg-forest text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
              >
                RERA Compliance
              </button>
            </div>

            {/* Tab 1: Terms */}
            {legalModal === 'terms' && (
              <div className="space-y-4 text-xs leading-relaxed text-neutral-700">
                <div className="flex items-center gap-2 text-forest font-bold text-base">
                  <Scale className="w-5 h-5 text-forest" />
                  <span>Roomzy Platform Terms & Zero-Brokerage Charter</span>
                </div>
                <p>
                  <strong>1. Zero Brokerage Guarantee:</strong> Roomzy operates as a direct discovery and community formation platform. We strictly prohibit middleman brokerage charges on listings marked with the verified badge.
                </p>
                <p>
                  <strong>2. Standardized 1-Month Deposit:</strong> Co-living units hosted under Roomzy Managed Living follow our unified 1-month security deposit standard. The deposit is held in escrow and returned within 7 business days of checkout inspection.
                </p>
                <p>
                  <strong>3. Transparent Rent & Exit Notice:</strong> Standard agreement templates require a minimum 30-day notice prior to checkout, preventing unfair forfeiture of deposits.
                </p>
              </div>
            )}

            {/* Tab 2: Privacy */}
            {legalModal === 'privacy' && (
              <div className="space-y-4 text-xs leading-relaxed text-neutral-700">
                <div className="flex items-center gap-2 text-forest font-bold text-base">
                  <Lock className="w-5 h-5 text-forest" />
                  <span>Privacy Policy & Digital Data Protection (DPDP)</span>
                </div>
                <p>
                  <strong>1. Zero Document Seeker Policy & Verified Credentials:</strong> Roomzy never requires tenants or room seekers to submit government IDs or biometric records. Property hosts and agents verify via official RERA registrations, broker licenses, or utility bills.
                </p>
                <p>
                  <strong>2. Locality Radar Privacy:</strong> Exact building numbers and flat units are never broadcast publicly. Exact coordinates are unveiled only after an in-person or video tour is mutually confirmed by both parties.
                </p>
                <p>
                  <strong>3. Zero Data Monetization:</strong> We do not sell user telephone numbers or corporate emails to third-party telemarketers or loan brokers.
                </p>
              </div>
            )}

            {/* Tab 3: Safety */}
            {legalModal === 'safety' && (
              <div className="space-y-4 text-xs leading-relaxed text-neutral-700">
                <div className="flex items-center gap-2 text-forest font-bold text-base">
                  <Shield className="w-5 h-5 text-forest-emerald" />
                  <span>Resident Trust & Safety Guidelines</span>
                </div>
                <p>
                  <strong>1. Dual Verification Requirement:</strong> Every active resident profile completes corporate email verification or verified government ID check prior to messaging.
                </p>
                <p>
                  <strong>2. Tour Protocols:</strong> When scheduling in-person visits, both hosts and prospective flatmates receive automated SMS confirmation with verified host identity credentials.
                </p>
                <p>
                  <strong>3. Zero Harassment & Non-Discrimination:</strong> Roomzy enforces a zero-tolerance policy against discrimination based on caste, religion, food choice, or sexual orientation.
                </p>
              </div>
            )}

            {/* Tab 4: RERA */}
            {legalModal === 'rera' && (
              <div className="space-y-4 text-xs leading-relaxed text-neutral-700">
                <div className="flex items-center gap-2 text-forest font-bold text-base">
                  <FileCheck className="w-5 h-5 text-forest" />
                  <span>RERA & Model Tenancy Act Compliance</span>
                </div>
                <p>
                  <strong>1. Tenancy Alignment:</strong> All digital agreements generated on Roomzy adhere to the principles of the Model Tenancy Act, establishing clear roles for owners and tenants regarding structural maintenance and day-to-day upkeep.
                </p>
                <p>
                  <strong>2. Direct Lister Verification:</strong> Property listings posted by landlords undergo property ownership document checks before receiving the verified green badge.
                </p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-ivory-border flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="bg-forest hover:bg-forest-light text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
