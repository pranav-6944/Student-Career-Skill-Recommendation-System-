import React from 'react';
import { Sparkles, ArrowRight, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTABannerSection: React.FC<{ onLaunchApp: () => void }> = ({ onLaunchApp }) => {
  return (
    <section class="py-20 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 relative overflow-hidden text-center text-white">
      
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs font-semibold">
          <Sparkles class="w-3.5 h-3.5 text-amber-400" />
          START YOUR FREE CAREER ASSESSMENT TODAY
        </div>

        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to Discover Your Ideal Career Path?
        </h2>

        <p class="text-slate-300 text-base max-w-xl mx-auto">
          Upload your resume now to calculate match percentages, uncover skill gaps, and launch your learning roadmap.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" variant="glow" onClick={onLaunchApp} class="gap-2 text-base px-8 py-3.5">
            <UploadCloud class="w-5 h-5" />
            Analyze My Resume Now
            <ArrowRight class="w-4 h-4 ml-1" />
          </Button>
        </div>

      </div>
    </section>
  );
};
