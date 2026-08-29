import React from 'react';
import { Cpu, Target, BarChart2, BookOpen, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const BentoSection: React.FC<{ onLaunchApp: () => void }> = ({ onLaunchApp }) => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="default" className="px-3.5 py-1">AI-POWERED ARCHITECTURE</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Precision Career Guidance
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Discover how our NLP resume parser, weighted skill matching matrix, and learning roadmaps work together.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Card 1: NLP Resume Engine (Large 7 cols) */}
          <Card className="md:col-span-7 p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                NLP Resume Parser & Entity Extraction
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Extracts technical skills, frameworks, academic degrees, project experience, and certifications from PDF and DOCX files automatically with zero manual entry.
              </p>
            </div>

            {/* Visual Mini Mockup */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Parser Output:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ 8 Skills Identified</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Python', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Excel', 'Git'].map((sk, idx) => (
                  <Badge key={idx} variant="success" className="text-[10px]">
                    ✓ {sk}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Card 2: Weighted Career Matcher (5 cols) */}
          <Card className="md:col-span-5 p-8 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Weighted Career Fit Index
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Evaluates your qualifications against core vs. secondary skill requirements for 50+ tech roles, returning exact percentage matches.
              </p>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-white">Data Analyst</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">82.5% Match</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full w-[82.5%]" />
              </div>
            </div>
          </Card>

          {/* Card 3: Skill Gap Priority Matrix (4 cols) */}
          <Card className="md:col-span-4 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Skill Gap Priority Matrix</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Categorizes missing skills into High or Medium priority tags, ensuring focused study habits.
            </p>
          </Card>

          {/* Card 4: Curated Learning Path (4 cols) */}
          <Card className="md:col-span-4 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Curated Course Integration</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Pairs missing skills directly with free and top-rated courses on Coursera, Udemy, and YouTube.
            </p>
          </Card>

          {/* Card 5: Institutional Admin Governance (4 cols) */}
          <Card className="md:col-span-4 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Admin Management</h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              Enables university career placement officers to track student readiness and configure custom job criteria.
            </p>
          </Card>

        </div>

      </div>
    </section>
  );
};
