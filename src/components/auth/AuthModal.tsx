import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  Building2, 
  Shield,
  CheckCircle2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    loginWithPhone, 
    loginWithGoogle, 
    loginAsDemo, 
    pendingAction 
  } = useApp();

  const [authMethod, setAuthMethod] = useState<'phone' | 'google'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMsg('');
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setErrorMsg('Please enter the 4-digit verification code');
      return;
    }
    setErrorMsg('');
    loginWithPhone(phoneNumber, enteredOtp);
  };

  const getActionTitle = () => {
    if (!pendingAction) return 'Unlock Roomzy Shared Living';
    switch (pendingAction.type) {
      case 'visit':
        return 'Sign in to Schedule Your Free Visit';
      case 'inquiry':
        return 'Sign in to Connect with Host';
      case 'save':
        return 'Sign in to Save to Your Account';
      case 'host':
        return 'Sign in to Property Host Workspace';
      default:
        return 'Welcome to Roomzy';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="glass-panel bg-white/95 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-glass-float relative border border-white/90 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-forest-emerald/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100/80 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-forest text-ivory flex items-center justify-center font-display font-extrabold text-lg shadow-sm">
            R<span className="text-amber-light">.</span>
          </div>
          <div>
            <span className="font-display font-bold text-lg text-forest tracking-tight block leading-tight">
              ROOMZY
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold tracking-wider uppercase block">
              Verified Co-Living & Flatmates
            </span>
          </div>
        </div>

        {/* Modal Title & Value Proposition */}
        <div className="space-y-1 mb-6">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 leading-snug">
            {getActionTitle()}
          </h2>
          <p className="text-xs text-neutral-500">
            Zero brokerage, verified roommates, and instant digital visit confirmations.
          </p>
        </div>

        {/* Auth Method Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-ivory-dark/70 rounded-xl mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone');
              setErrorMsg('');
            }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'phone'
                ? 'bg-white text-forest shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-forest" />
            <span>Mobile OTP</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMethod('google');
              setErrorMsg('');
            }}
            className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'google'
                ? 'bg-white text-forest shadow-xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google Login</span>
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Phone OTP Auth Tab */}
        {authMethod === 'phone' && (
          <div>
            {!otpStep ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-1.5">
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-2xl border border-ivory-border bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-forest/20 focus-within:border-forest shadow-xs">
                    <span className="text-sm font-bold text-neutral-500 mr-2 border-r border-neutral-200 pr-2">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98450 12345"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full text-sm font-semibold text-neutral-900 focus:outline-none placeholder:text-neutral-400 placeholder:font-normal bg-transparent"
                      maxLength={14}
                      autoFocus
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    We will send a 4-digit verification code via SMS / WhatsApp.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all"
                >
                  <span>Get Verification Code</span>
                  <ArrowRight className="w-4 h-4 text-amber-light" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
                      Enter 4-Digit OTP
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpStep(false)}
                      className="text-[11px] text-forest font-bold hover:underline"
                    >
                      Change Number
                    </button>
                  </div>
                  
                  {/* 4-digit input row */}
                  <div className="flex items-center justify-center gap-3 my-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value;
                          const nextOtp = [...otp];
                          nextOtp[idx] = val;
                          setOtp(nextOtp);
                        }}
                        className="w-12 h-12 text-center text-lg font-bold rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-neutral-900 shadow-xs"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-2">
                    <span>Sent to +91 {phoneNumber || '98450 12345'}</span>
                    <button
                      type="button"
                      onClick={() => setOtp(['1', '2', '3', '4'])}
                      className="text-amber-hover font-bold hover:underline"
                    >
                      Use Demo OTP (1234)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-light text-white font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verify & Proceed</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Google Auth Tab */}
        {authMethod === 'google' && (
          <div className="space-y-4">
            <p className="text-xs text-neutral-600 text-center">
              Sign in securely with your verified Google corporate or personal account:
            </p>
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-bold py-3 px-4 rounded-2xl text-sm flex items-center justify-center gap-3 shadow-xs hover:shadow-card transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google Workspace</span>
            </button>
          </div>
        )}

        {/* Instant Role Access Gateway */}
        <div className="mt-6 pt-5 border-t border-ivory-border">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber" />
              Quick Role Access:
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => loginAsDemo('tenant')}
              className="p-2 rounded-xl bg-forest-50 hover:bg-forest-100/80 border border-forest-100 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-forest font-bold text-[11px]">
                <UserCheck className="w-3 h-3" />
                <span>Priya (Tenant)</span>
              </div>
              <p className="text-[9px] text-neutral-500 truncate mt-0.5">Cred Product Lead</p>
            </button>

            <button
              type="button"
              onClick={() => loginAsDemo('host')}
              className="p-2 rounded-xl bg-amber-soft hover:bg-amber-light/30 border border-amber/20 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-stone-900 font-bold text-[11px]">
                <Building2 className="w-3 h-3 text-amber-hover" />
                <span>Vikram (Host)</span>
              </div>
              <p className="text-[9px] text-neutral-500 truncate mt-0.5">PG / Flat Owner</p>
            </button>

            <button
              type="button"
              onClick={() => loginAsDemo('admin')}
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all group"
            >
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Auditor</span>
              </div>
              <p className="text-[9px] text-neutral-500 truncate mt-0.5">KYC Compliance</p>
            </button>
          </div>
        </div>

        {/* Security & Zero Brokerage Note */}
        <div className="mt-5 pt-3 border-t border-ivory-border/70 flex items-center gap-2 text-[10px] text-neutral-500">
          <Shield className="w-3.5 h-3.5 text-forest-emerald shrink-0" />
          <span>Aadhaar-verified Indian network. No spam, no broker calls.</span>
        </div>

      </div>
    </div>
  );
};
