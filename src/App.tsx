import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '@/src/themeContext';
import type { UserSession } from '@/src/themeContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BentoSection } from '@/components/BentoSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CareerExplorerSection } from '@/components/CareerExplorerSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { CTABannerSection } from '@/components/CTABannerSection';
import { WebAppView } from '@/components/WebAppView';
import { SignInView } from '@/components/SignInView';
import { Footer } from '@/components/Footer';
import { PrivacyPolicyView } from '@/components/PrivacyPolicyView';
import { TermsOfServiceView } from '@/components/TermsOfServiceView';
import { ContactUsView } from '@/components/ContactUsView';

type AppMode = 'website' | 'webapp' | 'admin' | 'auth' | 'privacy' | 'terms' | 'contact';

export function AppContent() {
  const { setCurrentUser, logout } = useTheme();
  const [mode, setMode] = useState<AppMode>('website');

  const handleSignInSuccess = (user: UserSession) => {
    // Save the full user session to context (persisted in sessionStorage)
    setCurrentUser(user);
    // Route admin → admin console, student → dashboard
    setMode(user.role === 'admin' ? 'admin' : 'webapp');
  };

  const handleLogout = () => {
    logout();
    setMode('auth');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">

      {/* Top Navbar — always visible */}
      <Navbar currentMode={mode} setMode={setMode} />

      {/* Mode Views */}
      {mode === 'website' ? (
        <main className="flex-1">
          <Hero onLaunchApp={() => setMode('auth')} />
          <BentoSection onLaunchApp={() => setMode('auth')} />
          <HowItWorksSection />
          <CareerExplorerSection onLaunchApp={() => setMode('auth')} />
          <FeaturesSection />
          <ComparisonSection />
          <TestimonialsSection />
          <FAQSection />
          <CTABannerSection onLaunchApp={() => setMode('auth')} />
          <Footer setMode={setMode} />
        </main>
      ) : mode === 'privacy' ? (
        <main className="flex-1">
          <PrivacyPolicyView />
          <Footer setMode={setMode} />
        </main>
      ) : mode === 'terms' ? (
        <main className="flex-1">
          <TermsOfServiceView />
          <Footer setMode={setMode} />
        </main>
      ) : mode === 'contact' ? (
        <main className="flex-1">
          <ContactUsView />
          <Footer setMode={setMode} />
        </main>
      ) : mode === 'auth' ? (
        <main className="flex-1 bg-slate-50 dark:bg-slate-950">
          <SignInView onSignInSuccess={handleSignInSuccess} />
        </main>
      ) : (
        <main className="flex-1">
          <WebAppView
            initialMode={mode === 'admin' ? 'admin' : 'webapp'}
            onLogout={handleLogout}
          />
        </main>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
