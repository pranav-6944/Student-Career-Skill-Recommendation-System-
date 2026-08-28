import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Cpu, UploadCloud, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SparkBadge } from '@/components/ui/spark-badge';

interface HeroProps {
  onLaunchApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchApp }) => {
  const [demoActive, setDemoActive] = useState(false);
  const [demoSkillList, setDemoSkillList] = useState<string[]>(['Python', 'SQL', 'Pandas', 'Excel']);

  const handleTestPreset = (preset: string) => {
    setDemoActive(true);
    if (preset === 'ds') {
      setDemoSkillList(['Python', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Statistics']);
    } else {
      setDemoSkillList(['React', 'JavaScript', 'TypeScript', 'Node.js', 'HTML/CSS', 'Git']);
    }
  };

  return (
    <section class="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Glow Effects */}
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div class="lg:col-span-7 space-y-6 text-left">
            
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 dark:text-indigo-300 text-xs font-bold tracking-wide">
              <Sparkles class="w-3.5 h-3.5 text-indigo-500" />
              <span>AI-POWERED CAREER RECOMMENDATION PLATFORM</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Discover Your <br />
              <span class="bg-gradient-to-r from-indigo-600 via-emerald-500 to-teal-400 dark:from-indigo-400 dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                Perfect Career Path
              </span>
            </h1>

            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Upload your resume. Our NLP engine extracts technical skills, projects, and education, matching you to 50+ high-demand career roles with personalized learning roadmaps.
            </p>

            {/* CTAs */}
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button size="lg" variant="default" onClick={onLaunchApp} class="gap-2 text-base">
                <UploadCloud class="w-5 h-5" />
                Analyze My Resume
                <ArrowRight class="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLaunchApp} class="gap-2 text-base">
                Explore Student Dashboard
              </Button>
            </div>

            {/* Interactive Quick Try Widget */}
            <div class="pt-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText class="w-4 h-4 text-indigo-500" />
                  Try Quick NLP Parsing Demo:
                </span>
                <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Instant Sandbox</span>
              </div>
              <div class="flex gap-2">
                <button
                  onClick={() => handleTestPreset('ds')}
                  class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-indigo-500 cursor-pointer"
                >
                  🧪 Data Science Resume
                </button>
                <button
                  onClick={() => handleTestPreset('web')}
                  class="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-500 cursor-pointer"
                >
                  🧪 Full-Stack Resume
                </button>
              </div>

              {demoActive && (
                <div class="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">Extracted Entity Skills:</p>
                  <div class="flex flex-wrap gap-1">
                    {demoSkillList.map((s, idx) => (
                      <Badge key={idx} variant="success" class="text-[10px]">
                        ✓ {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trust points */}
            <div class="pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-500" />
                <span>50+ Mapped Career Profiles</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-500" />
                <span>NLP Skill Extraction</span>
              </div>
              <div class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-emerald-500" />
                <span>Weighted Gap Matrix</span>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase (5 cols) - Features SparkBadge */}
          <div class="lg:col-span-5 flex flex-col items-center">
            
            <div class="relative w-full max-w-[380px] aspect-square rounded-3xl bg-slate-900 border border-slate-800 p-3 shadow-2xl backdrop-blur-2xl group hover:border-indigo-500/40 transition-all duration-500">
              
              {/* Top Card Badge */}
              <div class="absolute -top-3 -left-3 z-20">
                <Badge variant="success" class="gap-1.5 px-3 py-1 text-xs shadow-lg bg-emerald-950 text-emerald-300 border-emerald-500/40">
                  <ShieldCheck class="w-3.5 h-3.5 text-emerald-400" />
                  Live SparkBadge Credential
                </Badge>
              </div>

              {/* SparkBadge Component Embedded */}
              <div class="w-full h-full rounded-2xl overflow-hidden shadow-inner">
                <SparkBadge />
              </div>

              {/* Floating Bottom Card */}
              <div class="absolute -bottom-5 -right-3 z-20 bg-slate-900 border border-indigo-500/30 p-3.5 rounded-2xl shadow-xl backdrop-blur-md max-w-[240px]">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Cpu class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-xs font-bold text-white">Data Analyst Role</p>
                    <p class="text-[11px] text-emerald-400 font-semibold">82.5% Skills Matched</p>
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
