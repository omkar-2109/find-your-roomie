import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PersonaHeader } from './components/layout/PersonaHeader';
import { Navbar } from './components/layout/Navbar';
import { LeftRail } from './components/layout/LeftRail';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './views/LandingPage';
import { MarketplacePage } from './views/MarketplacePage';
import { ListingDetailPage } from './views/ListingDetailPage';
import { SavedPage } from './views/SavedPage';
import { BusinessPortal } from './views/BusinessPortal';
import { AdminPortal } from './views/AdminPortal';
import { OAuthConsentPage } from './views/OAuthConsentPage';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { ChatModal } from './components/chat/ChatModal';
import { ShieldAlert, Lock, ArrowRight, Building2, ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    persona, 
    setPersona,
    currentView, 
    setCurrentView,
    currentUser,
    openOnboardingModal,
    isOnboardingModalOpen, 
    closeOnboardingModal, 
    onboardingInitialRole 
  } = useApp();

  // 0. Dedicated OAuth 2.1 Consent View for Third-Party Applications & MCP Clients
  if (currentView === 'oauth-consent') {
    return (
      <div className="min-h-screen bg-ivory flex flex-col font-sans text-neutral-900 selection:bg-amber-soft selection:text-stone-900 overflow-x-hidden">
        <OAuthConsentPage />
        <AuthModal />
        <OnboardingModal 
          isOpen={isOnboardingModalOpen}
          onClose={closeOnboardingModal}
          initialRole={onboardingInitialRole}
        />
        <ChatModal />
      </div>
    );
  }

  // 1. RBAC Guard: If user enters Host Workspace without host or admin role
  const isUnauthorizedHost = persona === 'business' && currentUser?.role !== 'host' && currentUser?.role !== 'admin';
  // 2. RBAC Guard: If user enters Admin Desk without admin role
  const isUnauthorizedAdmin = persona === 'admin' && currentUser?.role !== 'admin';

  return (
    <div className="min-h-screen bg-ivory flex flex-col font-sans text-neutral-900 selection:bg-amber-soft selection:text-stone-900 overflow-x-hidden">
      
      {/* 1. Persistent Persona Switcher & City Header */}
      <PersonaHeader />

      {/* 2. Main Consumer Navigation (shown in consumer mode) */}
      {persona === 'consumer' && <Navbar />}

      {/* 3. Main Body Container with Desktop Left Rail */}
      <div className="flex-grow flex min-w-0 w-full">
        {persona === 'consumer' && currentView !== 'landing' && <LeftRail />}

        <main className="flex-grow min-w-0 w-full">
          {persona === 'consumer' && (
            <>
              {currentView === 'landing' && <LandingPage />}
              {currentView === 'marketplace' && <MarketplacePage />}
              {currentView === 'listing-detail' && <ListingDetailPage />}
              {currentView === 'saved' && <SavedPage />}
              {!['landing', 'marketplace', 'listing-detail', 'saved'].includes(currentView) && (
                <LandingPage />
              )}
            </>
          )}

          {/* Business Workspace with Strict Role Access Gate */}
          {persona === 'business' && (
            isUnauthorizedHost ? (
              <div className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-3xl border border-stone-200 shadow-xl text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-amber-700" />
                </div>
                <h2 className="font-display font-extrabold text-2xl text-stone-900">
                  Host Workspace Access Restricted
                </h2>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  The property inventory and booking management desk is restricted to verified homeowners and PG managers. Your current role is <strong className="text-forest capitalize">{currentUser?.role || 'Guest'}</strong>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <button
                    onClick={() => openOnboardingModal('host')}
                    className="w-full sm:w-auto bg-forest hover:bg-forest-light text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Complete Host Onboarding</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setPersona('consumer');
                      setCurrentView('marketplace');
                    }}
                    className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-800 px-5 py-2.5 rounded-full text-xs font-semibold transition-colors"
                  >
                    Return to Marketplace
                  </button>
                </div>
              </div>
            ) : (
              <BusinessPortal />
            )
          )}

          {/* Admin Portal with Strict Role Access Gate */}
          {persona === 'admin' && (
            isUnauthorizedAdmin ? (
              <div className="max-w-2xl mx-auto my-16 p-8 bg-white rounded-3xl border border-rose-200 shadow-xl text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center">
                  <ShieldAlert className="w-7 h-7 text-rose-600" />
                </div>
                <h2 className="font-display font-extrabold text-2xl text-stone-900">
                  Admin Clearance Required
                </h2>
                <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Roomzy Trust & Safety Verification Desk is strictly role-protected. Confidential KYC records, identity proofs, and moderation controls are not accessible to your account.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setPersona('consumer');
                      setCurrentView('marketplace');
                    }}
                    className="bg-forest hover:bg-forest-light text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all inline-flex items-center gap-2"
                  >
                    <span>Return to Consumer Marketplace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <AdminPortal />
            )
          )}
        </main>
      </div>

      {/* 4. Consumer Responsive Footer */}
      {persona === 'consumer' && <Footer />}

      {/* 5. Persistent Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* 6. Apple-Glass Indian Mobile OTP & Google Auth Modal */}
      <AuthModal />

      {/* 7. Global-Grade 3-Step KYC & Onboarding Wizard */}
      <OnboardingModal 
        isOpen={isOnboardingModalOpen}
        onClose={closeOnboardingModal}
        initialRole={onboardingInitialRole}
      />

      {/* 8. In-App Direct Chat & Roommate Team Up Hub */}
      <ChatModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
