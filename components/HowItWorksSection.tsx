import React from 'react';
import { UploadCloud, Cpu, Target, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: UploadCloud,
      title: "Upload Your Resume",
      description: "Drop your PDF or DOCX resume into the web app or select demo profile presets to begin.",
    },
    {
      number: "02",
      icon: Cpu,
      title: "NLP Skill Extraction",
      description: "Our entity-matching engine identifies your programming languages, tools, degree, and projects.",
    },
    {
      number: "03",
      icon: Target,
      title: "Weighted Career Match",
      description: "Algorithm calculates percentage match scores against 50+ predefined industry roles.",
    },
    {
      number: "04",
      icon: Rocket,
      title: "Bridge Skill Gaps",
      description: "Access a personalized learning roadmap with course links to reach 95%+ career readiness.",
    },
  ];

  return (
    <section class="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            SIMPLE 4-STEP PROCESS
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How CareerPath AI Works
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <Card key={idx} class="p-6 relative group hover:border-indigo-500/40">
                <span class="text-4xl font-black text-slate-200 dark:text-slate-800 absolute top-4 right-4 pointer-events-none group-hover:text-indigo-500/20 transition-colors">
                  {st.number}
                </span>

                <div class="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-4">
                  <Icon class="w-6 h-6" />
                </div>

                <h3 class="font-bold text-lg text-slate-900 dark:text-white mb-2">{st.title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {st.description}
                </p>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
