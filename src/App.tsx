import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { WebAppView } from '@/components/WebAppView';
import { Footer } from '@/components/Footer';

export function App() {
  const [mode, setMode] = useState<'website' | 'webapp' | 'admin'>('website');

  return (
    <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar currentMode={mode} setMode={setMode} />

      {/* Main Mode View Switching */}
      {mode === 'website' ? (
        <main class="flex-1">
          <Hero onLaunchApp={() => setMode('webapp')} />
          <FeaturesSection />
          <TestimonialsSection />
          <Footer />
        </main>
      ) : (
        <main class="flex-1">
          <WebAppView initialMode={mode === 'admin' ? 'admin' : 'webapp'} />
        </main>
      )}

    </div>
  );
}

export default App;
