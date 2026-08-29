import React, { useState } from 'react';
import { ThemeProvider } from '@/src/themeContext';
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

export function AppContent() {
  const [mode, setMode] = useState<'website' | 'webapp' | 'admin' | 'auth'>('website');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navbar */}
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
          <Footer />
        </main>
      ) : mode === 'auth' ? (
        <main className="flex-1 bg-slate-50 dark:bg-slate-950">
          <SignInView onSignInSuccess={() => setMode('webapp')} />
        </main>
      ) : (
        <main className="flex-1">
          <WebAppView initialMode={mode === 'admin' ? 'admin' : 'webapp'} onLogout={() => setMode('auth')} />
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
