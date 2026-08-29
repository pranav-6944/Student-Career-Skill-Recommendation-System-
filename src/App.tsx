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
import { Footer } from '@/components/Footer';

export function AppContent() {
  const [mode, setMode] = useState<'website' | 'webapp' | 'admin'>('website');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar currentMode={mode} setMode={setMode} />

      {/* Mode Views */}
      {mode === 'website' ? (
        <main className="flex-1">
          <Hero onLaunchApp={() => setMode('webapp')} />
          <BentoSection onLaunchApp={() => setMode('webapp')} />
          <HowItWorksSection />
          <CareerExplorerSection onLaunchApp={() => setMode('webapp')} />
          <FeaturesSection />
          <ComparisonSection />
          <TestimonialsSection />
          <FAQSection />
          <CTABannerSection onLaunchApp={() => setMode('webapp')} />
          <Footer />
        </main>
      ) : (
        <main className="flex-1">
          <WebAppView initialMode={mode === 'admin' ? 'admin' : 'webapp'} />
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
