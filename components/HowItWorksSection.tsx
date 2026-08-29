import React from 'react';
import { UploadCloud, Cpu, Target, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <section id="how" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="default" className="px-3.5 py-1">SIMPLE 4-STEP PROCESS</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How CareerPath AI Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            From raw resume upload to targeted career growth in four seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <Card key={idx} className="p-8 relative group hover:border-indigo-500/50">
                <span className="text-5xl font-black text-slate-200 dark:text-slate-800 absolute top-4 right-5 pointer-events-none group-hover:text-indigo-500/20 transition-colors">
                  {st.number}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mb-2">{st.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
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
