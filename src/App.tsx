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

const AppContent: React.FC = () => {
  const { 
    persona, 
    currentView, 
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
      </div>
    );
  }

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

          {persona === 'business' && <BusinessPortal />}

          {persona === 'admin' && <AdminPortal />}
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
