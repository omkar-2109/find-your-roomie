import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import { 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Check, 
  X, 
  AlertCircle, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  Cpu,
  KeyRound,
  Info,
  ChevronRight
} from 'lucide-react';

interface ClientDetails {
  name: string;
  logo_uri?: string;
  uri?: string;
  redirect_uri?: string;
}

interface AuthDetailsState {
  authorization_id: string;
  client: ClientDetails;
  redirect_uri: string;
  scope: string;
  user?: {
    id: string;
    email: string;
  };
}

export const OAuthConsentPage: React.FC = () => {
  const { currentUser, loginWithGoogle, openAuthModal, signOut, setCurrentView } = useApp();
  
  const [authorizationId, setAuthorizationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<'approve' | 'deny' | null>(null);
  const [authDetails, setAuthDetails] = useState<AuthDetailsState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [inputAuthId, setInputAuthId] = useState<string>('');
  const [simulationToast, setSimulationToast] = useState<string | null>(null);

  // Extract authorization_id from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('authorization_id') || params.get('auth_id');
    if (id) {
      setAuthorizationId(id);
    } else {
      setIsDemoMode(true);
    }
  }, []);

  // Fetch authorization details from Supabase Auth OAuth Server
  useEffect(() => {
    if (!authorizationId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchDetails() {
      setLoading(true);
      setError(null);
      try {
        const oauthApi = (supabase.auth as any).oauth;
        if (!oauthApi || typeof oauthApi.getAuthorizationDetails !== 'function') {
          throw new Error('Supabase OAuth Server methods not available in this client.');
        }

        const { data, error: fetchErr } = await oauthApi.getAuthorizationDetails(authorizationId);

        if (!isMounted) return;

        if (fetchErr) {
          setError(fetchErr.message || 'Unable to retrieve authorization details.');
          setIsDemoMode(true);
        } else if (data) {
          // If user already consented, Supabase returns redirect_url directly
          if ('redirect_url' in data && !('authorization_id' in data)) {
            setRedirectNotice(`You have already approved this client. Redirecting to ${data.redirect_url}...`);
            setTimeout(() => {
              window.location.href = data.redirect_url;
            }, 1200);
          } else if ('authorization_id' in data) {
            setAuthDetails(data as AuthDetailsState);
            setIsDemoMode(false);
          }
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || 'Failed to communicate with Supabase OAuth Server');
        setIsDemoMode(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [authorizationId]);

  // Handle Approve
  const handleApprove = async () => {
    if (isDemoMode || !authorizationId) {
      setSimulationToast('Simulated Approval: In live flow, Supabase issues an auth code and redirects to the client callback.');
      setTimeout(() => setSimulationToast(null), 4000);
      return;
    }

    setProcessing('approve');
    setError(null);
    try {
      const oauthApi = (supabase.auth as any).oauth;
      const { data, error: approveErr } = await oauthApi.approveAuthorization(authorizationId);
      
      if (approveErr) {
        setError(approveErr.message || 'Authorization failed.');
        setProcessing(null);
      } else if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during approval.');
      setProcessing(null);
    }
  };

  // Handle Deny
  const handleDeny = async () => {
    if (isDemoMode || !authorizationId) {
      setSimulationToast('Simulated Denial: Supabase redirects the client with error=access_denied.');
      setTimeout(() => setSimulationToast(null), 4000);
      return;
    }

    setProcessing('deny');
    setError(null);
    try {
      const oauthApi = (supabase.auth as any).oauth;
      const { data, error: denyErr } = await oauthApi.denyAuthorization(authorizationId);
      
      if (denyErr) {
        setError(denyErr.message || 'Denial failed.');
        setProcessing(null);
      } else if (data?.redirect_url) {
        window.location.href = data.redirect_url;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during cancellation.');
      setProcessing(null);
    }
  };

  // Human-readable scope descriptions
  const renderScopeItem = (scopeKey: string) => {
    switch (scopeKey.toLowerCase().trim()) {
      case 'openid':
        return {
          title: 'Verify your Identity',
          desc: 'Allows the application to confirm your verified Roomzy account and unique User ID',
          icon: <KeyRound className="w-4 h-4 text-emerald-600" />
        };
      case 'profile':
        return {
          title: 'View your Profile Details',
          desc: 'Access your full name, avatar photo, bio, and Aadhaar verified status',
          icon: <UserIcon className="w-4 h-4 text-emerald-600" />
        };
      case 'email':
        return {
          title: 'Access your Email Address',
          desc: 'View your primary registered email for communication and account sync',
          icon: <Mail className="w-4 h-4 text-emerald-600" />
        };
      case 'phone':
        return {
          title: 'Access your Verified Phone Number',
          desc: 'View your Indian mobile contact number for SMS and instant verification',
          icon: <Phone className="w-4 h-4 text-emerald-600" />
        };
      case 'offline_access':
        return {
          title: 'Maintain Background Access',
          desc: 'Allows this application to refresh tokens seamlessly without re-prompting you',
          icon: <RefreshCw className="w-4 h-4 text-emerald-600" />
        };
      default:
        return {
          title: `Access ${scopeKey}`,
          desc: `Permission to access the '${scopeKey}' resource scope on Roomzy`,
          icon: <Layers className="w-4 h-4 text-emerald-600" />
        };
    }
  };

  // Demo client data if in preview mode
  const currentClient: ClientDetails = authDetails?.client || {
    name: 'Model Context Protocol (MCP) Client',
    uri: 'https://modelcontextprotocol.io',
    redirect_uri: 'http://localhost:3000/callback',
    logo_uri: ''
  };

  const rawScopes = (authDetails?.scope || 'openid profile email').split(' ').filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F5F0] via-[#F4F1EA] to-[#EAE5D9] text-stone-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500/20">
      
      {/* Top Bar Branding */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between pb-6 border-b border-stone-200/60">
        <button 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-forest-900 flex items-center justify-center text-white font-bold shadow-md shadow-forest-900/20 group-hover:scale-105 transition-transform">
            R
          </div>
          <div>
            <div className="font-serif font-bold text-lg text-forest-950 flex items-center gap-1.5">
              Roomzy <span className="font-sans text-xs px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 font-semibold tracking-wide">AUTH IDP</span>
            </div>
            <p className="text-[11px] text-stone-500 font-mono">OAuth 2.1 & OIDC Certified</p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-3 py-1.5 rounded-full shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Supabase OAuth Server</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xl mx-auto my-auto py-8">
        
        {/* Simulation / Toast Alert */}
        {simulationToast && (
          <div className="mb-4 p-3.5 bg-forest-950 text-white text-xs rounded-xl shadow-lg border border-forest-800 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{simulationToast}</span>
            </div>
            <button onClick={() => setSimulationToast(null)} className="text-stone-400 hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Redirect Notice */}
        {redirectNotice && (
          <div className="mb-6 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm text-center">
            <RefreshCw className="w-6 h-6 text-emerald-600 mx-auto animate-spin mb-2" />
            <h3 className="font-semibold text-emerald-950 text-base">Authorization Verified</h3>
            <p className="text-emerald-700 text-xs mt-1">{redirectNotice}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-xl text-center space-y-4">
            <div className="w-12 h-12 border-3 border-forest-200 border-t-forest-700 rounded-full animate-spin mx-auto" />
            <div className="space-y-1">
              <p className="font-semibold text-forest-950 text-sm">Validating OAuth Request...</p>
              <p className="text-xs text-stone-500 font-mono">Connecting to Supabase OAuth Server</p>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && !loading && (
          <div className="mb-6 p-4 bg-red-50/90 border border-red-200 rounded-2xl flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-red-900">OAuth Error</p>
              <p className="text-red-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {!loading && !redirectNotice && (
          <div className="bg-white/85 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-stone-300/40 rounded-3xl overflow-hidden">
            
            {/* Developer Playground Banner if in demo mode */}
            {isDemoMode && (
              <div className="bg-gradient-to-r from-amber-500/10 via-forest-500/10 to-emerald-500/10 border-b border-stone-200/70 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-semibold text-stone-700">Preview & Consent Sandbox Mode</span>
                </div>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider bg-white/70 px-2 py-0.5 rounded border border-stone-200">
                  Ready for Dynamic Clients
                </span>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">

              {/* 1. Requesting App Header */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-br from-forest-50 to-emerald-100/80 rounded-2xl border border-forest-200/60 shadow-inner">
                  {currentClient.logo_uri ? (
                    <img src={currentClient.logo_uri} alt={currentClient.name} className="w-12 h-12 rounded-xl object-contain" />
                  ) : (
                    <Cpu className="w-10 h-10 text-forest-800" />
                  )}
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl font-bold font-serif text-forest-950 tracking-tight">
                    Authorize <span className="text-forest-800">{currentClient.name}</span>
                  </h1>
                  <p className="text-xs text-stone-500 flex items-center justify-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Requests access to your verified Roomzy account</span>
                  </p>
                </div>

                {/* Redirect URI security indicator */}
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 bg-stone-100/80 px-3 py-1 rounded-full border border-stone-200/60 max-w-full truncate">
                  <ExternalLink className="w-3 h-3 text-stone-400 shrink-0" />
                  <span className="truncate">Callback: {authDetails?.redirect_uri || currentClient.redirect_uri || 'Configured Redirect URI'}</span>
                </div>
              </div>

              {/* 2. Logged-in User Card */}
              <div className="p-4 rounded-2xl bg-stone-50/90 border border-stone-200/80 flex items-center justify-between">
                {currentUser ? (
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      className="w-11 h-11 rounded-full object-cover border-2 border-forest-700/20 shadow-xs shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-stone-900 truncate">{currentUser.name}</span>
                        {currentUser.isAadhaarVerified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded-full">
                            <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 truncate">{currentUser.email || currentUser.phone}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 w-full justify-between">
                    <div className="flex items-center gap-2 text-stone-600 text-xs">
                      <UserIcon className="w-4 h-4 text-stone-400" />
                      <span>Not currently signed in</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={loginWithGoogle}
                        className="px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg hover:bg-stone-50 shadow-xs"
                      >
                        Google
                      </button>
                      <button
                        onClick={() => openAuthModal()}
                        className="px-3 py-1.5 text-xs font-semibold bg-forest-800 text-white rounded-lg hover:bg-forest-900 shadow-xs"
                      >
                        Sign in / Sign up
                      </button>
                    </div>
                  </div>
                )}

                {currentUser && (
                  <button 
                    onClick={signOut} 
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:underline shrink-0 ml-2"
                  >
                    Sign out
                  </button>
                )}
              </div>

              {/* 3. Permissions Requested List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Requested Permissions ({rawScopes.length})
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Encrypted Scope
                  </span>
                </div>

                <div className="space-y-2">
                  {rawScopes.map((scope) => {
                    const info = renderScopeItem(scope);
                    return (
                      <div 
                        key={scope}
                        className="p-3.5 rounded-xl bg-white border border-stone-200/70 hover:border-forest-200 transition-colors flex items-start gap-3 shadow-xs"
                      >
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 shrink-0 mt-0.5">
                          {info.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-xs text-stone-900">{info.title}</p>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{info.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Privacy Trust Guarantee */}
              <div className="p-3 bg-stone-100/70 rounded-xl border border-stone-200/50 flex items-start gap-2 text-[11px] text-stone-600 leading-normal">
                <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>
                  Roomzy never exposes your bank details, credit history, or Aadhaar identity documents to third-party applications. You can revoke access at any time.
                </span>
              </div>

              {/* 5. Decision Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={processing !== null}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-forest-800 to-forest-900 hover:from-forest-700 hover:to-forest-800 text-white font-semibold text-sm shadow-lg shadow-forest-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {processing === 'approve' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Authorize Application</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDeny}
                  disabled={processing !== null}
                  className="py-3.5 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer border border-stone-200/70"
                >
                  {processing === 'deny' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-stone-600" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Test input tool for developers if in preview mode */}
            {isDemoMode && (
              <div className="border-t border-stone-200/70 bg-stone-50/70 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                    Test with Live Authorization ID:
                  </label>
                  <span className="text-[10px] font-mono text-stone-400">?authorization_id=...</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputAuthId}
                    onChange={(e) => setInputAuthId(e.target.value)}
                    placeholder="Paste Supabase authorization_id here..."
                    className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest-600 font-mono"
                  />
                  <button
                    onClick={() => {
                      if (inputAuthId.trim()) {
                        const url = new URL(window.location.href);
                        url.searchParams.set('authorization_id', inputAuthId.trim());
                        window.history.pushState({}, '', url.toString());
                        setAuthorizationId(inputAuthId.trim());
                      }
                    }}
                    className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-semibold hover:bg-forest-800 transition-colors cursor-pointer"
                  >
                    Test Flow
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Footer Credentials & Info */}
      <div className="w-full max-w-xl mx-auto pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <p>© 2026 Roomzy Technologies Inc. All rights reserved.</p>
        <div className="flex items-center gap-4 text-stone-600 font-medium">
          <button onClick={() => setCurrentView('landing')} className="hover:text-forest-800 transition-colors">Home</button>
          <span>•</span>
          <a href="https://supabase.com/docs/guides/auth/oauth-server" target="_blank" rel="noreferrer" className="hover:text-forest-800 transition-colors flex items-center gap-1">
            <span>OAuth Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};
