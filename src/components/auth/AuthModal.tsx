import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Shield,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    signUpWithEmail, 
    signInWithEmail, 
    signInWithMagicLink, 
    signInWithPhone, 
    verifyPhoneOtp, 
    loginWithGoogle, 
    pendingAction 
  } = useApp();

  const [authTab, setAuthTab] = useState<'password' | 'magic-link' | 'phone' | 'google'>('password');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'tenant' | 'host'>('tenant');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const resetFormState = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setOtpSent(false);
    setOtpToken('');
  };

  // Handle Email & Password
  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    if (isSignUp) {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      const res = await signUpWithEmail(email.trim(), password, fullName.trim(), role);
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to sign up');
      } else {
        setSuccessMessage('Account created! Please check your email to confirm registration or sign in.');
      }
    } else {
      const res = await signInWithEmail(email.trim(), password);
      setLoading(false);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid email or password');
      }
    }
  };

  // Handle Magic Link
  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    const res = await signInWithMagicLink(email.trim());
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to send magic link');
    } else {
      setSuccessMessage('Magic link sent! Check your email inbox to sign in instantly.');
    }
  };

  // Handle Phone SMS Request
  const handlePhoneSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    const res = await signInWithPhone(phoneNumber);
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.error || 'Could not send SMS OTP. Please ensure SMS provider is configured in Supabase.');
    } else {
      setOtpSent(true);
      setSuccessMessage('6-digit verification code sent via SMS.');
    }
  };

  // Handle Phone Verify OTP
  const handlePhoneVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);
    const res = await verifyPhoneOtp(phoneNumber, otpToken.trim());
    setLoading(false);
    if (!res.success) {
      setErrorMessage(res.error || 'Invalid verification code');
    }
  };

  const getActionTitle = () => {
    if (!pendingAction) return 'Welcome to Roomzy';
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
        return 'Unlock Roomzy Shared Living';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="glass-panel bg-white/95 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-glass-float relative border border-white/90 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-forest/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100/80 transition-colors"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-forest text-ivory flex items-center justify-center font-display font-extrabold text-lg shadow-sm">
            R<span className="text-amber-light">.</span>
          </div>
          <div>
            <span className="font-display font-bold text-lg text-forest tracking-tight block leading-tight">
              ROOMZY
            </span>
            <span className="text-[10px] text-neutral-500 font-semibold tracking-wider uppercase block">
              Supabase Auth Identity
            </span>
          </div>
        </div>

        <h3 className="font-display font-bold text-lg text-neutral-900 leading-snug mb-1">
          {getActionTitle()}
        </h3>
        <p className="text-xs text-neutral-600 mb-4">
          Direct flatmates & verified owners. No broker fees ever.
        </p>

        {/* Auth Method Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-ivory-dark/70 rounded-xl mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setAuthTab('password'); resetFormState(); }}
            className={`py-1.5 px-2 rounded-lg text-center transition-all ${authTab === 'password' ? 'bg-white text-forest shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('magic-link'); resetFormState(); }}
            className={`py-1.5 px-2 rounded-lg text-center transition-all ${authTab === 'magic-link' ? 'bg-white text-forest shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Magic Link
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('phone'); resetFormState(); }}
            className={`py-1.5 px-2 rounded-lg text-center transition-all ${authTab === 'phone' ? 'bg-white text-forest shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Phone SMS
          </button>
          <button
            type="button"
            onClick={() => { setAuthTab('google'); resetFormState(); }}
            className={`py-1.5 px-2 rounded-lg text-center transition-all ${authTab === 'google' ? 'bg-white text-forest shadow-xs font-bold' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Google
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1. Tab: Email & Password */}
        {authTab === 'password' && (
          <form onSubmit={handleEmailPasswordSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aditya Kashyap"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-xs text-neutral-900 shadow-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com or personal"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-xs text-neutral-900 shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-xs text-neutral-900 shadow-xs"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                  I want to:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('tenant')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${role === 'tenant' ? 'bg-forest-50 border-forest text-forest' : 'bg-white border-stone-200 text-stone-600'}`}
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>Find a Space</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('host')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${role === 'host' ? 'bg-forest-50 border-forest text-forest' : 'bg-white border-stone-200 text-stone-600'}`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>List a Property</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest hover:bg-forest-light text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all disabled:opacity-60 cursor-pointer mt-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{isSignUp ? 'Create Supabase Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); resetFormState(); }}
                className="text-xs text-forest font-semibold hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        )}

        {/* 2. Tab: Magic Link */}
        {authTab === 'magic-link' && (
          <form onSubmit={handleMagicLinkSubmit} className="space-y-3">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Enter your email and we'll send a passwordless, one-click sign-in link via Supabase Auth.
            </p>
            <div>
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-xs text-neutral-900 shadow-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest hover:bg-forest-light text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send Magic Link</span>
                  <KeyRound className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. Tab: Phone SMS OTP */}
        {authTab === 'phone' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handlePhoneSendOtp} className="space-y-3">
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Enter your mobile number to receive an SMS verification code.
                </p>
                <div>
                  <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider block mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-neutral-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="98450 12345"
                      className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-xs text-neutral-900 shadow-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-forest hover:bg-forest-light text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Send Verification Code</span>}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePhoneVerify} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
                    Enter SMS OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-[11px] text-forest font-bold hover:underline"
                  >
                    Change Number
                  </button>
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpToken}
                  onChange={(e) => setOtpToken(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full text-center text-lg font-bold tracking-widest py-2.5 rounded-xl border border-ivory-border bg-white focus:outline-none focus:ring-2 focus:ring-forest text-neutral-900 shadow-xs"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-forest hover:bg-forest-light text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-soft hover:shadow-card transition-all disabled:opacity-60 cursor-pointer"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Verify & Sign In</span>}
                </button>
              </form>
            )}
          </div>
        )}

        {/* 4. Tab: Google Workspace */}
        {authTab === 'google' && (
          <div className="space-y-4 py-2 text-center">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Sign in securely via Supabase Auth with your Google corporate or personal account.
            </p>
            <button
              type="button"
              onClick={loginWithGoogle}
              className="w-full bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-3 shadow-xs hover:shadow-card transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* Security & Trust Footer */}
        <div className="mt-5 pt-3 border-t border-ivory-border/70 flex items-center justify-between text-[10px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Zero Brokerage • Encrypted JWT Auth</span>
          </div>
          <span className="font-mono text-[9px] text-neutral-400">Supabase Auth</span>
        </div>

      </div>
    </div>
  );
};
