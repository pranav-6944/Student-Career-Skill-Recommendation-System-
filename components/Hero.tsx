import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Cpu, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SparkBadge } from '@/components/ui/spark-badge';

interface HeroProps {
  onLaunchApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchApp }) => {
  return (
    <section class="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-slate-950">
      
      {/* Glow Effects */}
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div class="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div class="lg:col-span-7 space-y-6 text-left">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold tracking-wide">
              <Sparkles class="w-3.5 h-3.5 text-indigo-400" />
              <span>NEXT-GEN CAREER INTELLIGENCE FOR STUDENTS</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Discover Your <br />
              <span class="bg-gradient-to-r from-indigo-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Perfect Career Path
              </span>
            </h1>

            <p class="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Upload your resume. Our NLP engine extracts your technical skills, projects, and education, matching you to 50+ high-demand career roles with personalized learning roadmaps.
            </p>

            {/* CTAs */}
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button size="lg" onClick={onLaunchApp} class="gap-2 shadow-lg shadow-indigo-600/30 text-base">
                <UploadCloud class="w-5 h-5" />
                Analyze My Resume
                <ArrowRight class="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLaunchApp} class="gap-2 text-base">
                Explore Demo Dashboard
              </Button>
            </div>

            {/* Trust points */}
            <div class="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                <span>50+ Mapped Career Profiles</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                <span>NLP Skill Extraction</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                <span>Weighted Gap Matrix</span>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase (5 cols) - Features SparkBadge */}
          <div class="lg:col-span-5 flex flex-col items-center">
            
            <div class="relative w-full max-w-[380px] aspect-square rounded-3xl bg-slate-900/80 border border-slate-800 p-3 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl group hover:border-indigo-500/40 transition-all duration-500">
              
              {/* Top Card Badge */}
              <div class="absolute -top-3 -left-3 z-20">
                <Badge variant="success" class="gap-1.5 px-3 py-1 text-xs shadow-lg bg-emerald-950/90 text-emerald-300 border-emerald-500/40">
                  <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
                  Live SparkBadge Credential
                </Badge>
              </div>

              {/* SparkBadge Component Embedded */}
              <div class="w-full h-full rounded-2xl overflow-hidden shadow-inner">
                <SparkBadge />
              </div>

              {/* Floating Bottom Card */}
              <div class="absolute -bottom-5 -right-3 z-20 bg-slate-900/95 border border-indigo-500/30 p-3.5 rounded-2xl shadow-xl backdrop-blur-md max-w-[240px]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Cpu class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-white">Data Analyst Role</p>
                    <p class="text-[11px] text-emerald-400 font-semibold">92.4% Skills Matched</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
