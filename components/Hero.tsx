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
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Glow Backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-extrabold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>AI-POWERED CAREER RECOMMENDATION PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Discover Your <br />
              <span className="bg-gradient-to-r from-indigo-600 via-emerald-500 to-teal-400 dark:from-indigo-400 dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                Perfect Career Path
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed">
              Upload your resume. Our NLP engine extracts technical skills, projects, and education, matching you to 50+ high-demand career roles with personalized learning roadmaps.
            </p>

            {/* Styled Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button size="lg" variant="default" onClick={onLaunchApp} className="gap-2.5 text-base px-6 py-3.5 shadow-xl font-extrabold">
                <UploadCloud className="w-5 h-5" />
                Analyze My Resume
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={onLaunchApp} className="gap-2.5 text-base px-6 py-3.5 font-extrabold border-2">
                Explore Student Dashboard
              </Button>
            </div>

            {/* Quick Sandbox Parser Widget */}
            <div className="pt-4 p-5 rounded-3xl bg-slate-100 dark:bg-slate-900/90 border-2 border-slate-200 dark:border-slate-800 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  Try Quick NLP Parsing Demo:
                </span>
                <Badge variant="success" className="text-[10px]">Instant Sandbox</Badge>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleTestPreset('ds')}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-indigo-500 cursor-pointer shadow-sm transition-all"
                >
                  🧪 Data Science Resume
                </button>
                <button
                  onClick={() => handleTestPreset('web')}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-emerald-500 cursor-pointer shadow-sm transition-all"
                >
                  🧪 Full-Stack Resume
                </button>
              </div>

              {demoActive && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Extracted Entity Skills:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {demoSkillList.map((s, idx) => (
                      <Badge key={idx} variant="success" className="text-[10px]">
                        ✓ {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>50+ Mapped Career Roles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>NLP Skill Extraction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Weighted Gap Matrix</span>
              </div>
            </div>

          </div>

          {/* Right Showcase: SparkBadge Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative w-full max-w-[400px] aspect-square rounded-[2.5rem] bg-slate-900 border-4 border-slate-800/90 p-4 shadow-2xl backdrop-blur-2xl group hover:border-indigo-500/60 transition-all duration-500">
              
              {/* Rounded Pill Credential Badge */}
              <div className="absolute -top-4 left-6 z-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 border-2 border-emerald-500/50 shadow-xl text-xs font-extrabold backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Live SparkBadge Credential
                </div>
              </div>

              {/* SparkBadge Container */}
              <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-inner border border-slate-800">
                <SparkBadge />
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute -bottom-6 -right-4 z-20 bg-slate-900/95 border-2 border-indigo-500/40 p-4 rounded-2xl shadow-2xl backdrop-blur-md max-w-[260px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Data Analyst Role</p>
                    <p className="text-xs text-emerald-400 font-black mt-0.5">82.5% Skills Matched</p>
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
