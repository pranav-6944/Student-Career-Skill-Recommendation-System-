import React from 'react';
import { Cpu, Target, BarChart2, BookOpen, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const BentoSection: React.FC<{ onLaunchApp: () => void }> = ({ onLaunchApp }) => {
  return (
    <section class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="default" class="px-3 py-1">AI-POWERED ARCHITECTURE</Badge>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Precision Career Guidance
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-base">
            Discover how our NLP resume parser, weighted skill matching matrix, and learning roadmaps work together.
          </p>
        </div>

        {/* Bento Grid */}
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: NLP Resume Engine (Large 7 cols) */}
          <Card class="md:col-span-7 p-8 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Cpu class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                NLP Resume Parser & Entity Extraction
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Extracts technical skills, frameworks, academic degrees, project experience, and certifications from PDF and DOCX files automatically with zero manual entry.
              </p>
            </div>

            {/* Visual Mini Mockup */}
            <div class="mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-700 dark:text-slate-300">Parser Output:</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">✓ 8 Skills Identified</span>
              </div>
              <div class="flex flex-wrap gap-1.5 pt-1">
                {['Python', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Excel', 'Git'].map((sk, idx) => (
                  <Badge key={idx} variant="success" class="text-[10px]">
                    ✓ {sk}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Card 2: Weighted Career Matcher (5 cols) */}
          <Card class="md:col-span-5 p-8 flex flex-col justify-between group">
            <div class="space-y-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Target class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Weighted Career Fit Index
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Evaluates your qualifications against core vs. secondary skill requirements for 50+ tech roles, returning exact percentage matches.
              </p>
            </div>

            <div class="mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-slate-800 dark:text-white">Data Analyst</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">82.5% Match</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-[82.5%]" />
              </div>
            </div>
          </Card>

          {/* Card 3: Skill Gap Priority Matrix (4 cols) */}
          <Card class="md:col-span-4 p-6 space-y-4">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <BarChart2 class="w-5 h-5" />
            </div>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">Skill Gap Priority Matrix</h4>
            <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Categorizes missing skills into High or Medium priority tags, ensuring focused study habits.
            </p>
          </Card>

          {/* Card 4: Curated Learning Path (4 cols) */}
          <Card class="md:col-span-4 p-6 space-y-4">
            <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <BookOpen class="w-5 h-5" />
            </div>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">Curated Course Integration</h4>
            <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Pairs missing skills directly with free and top-rated courses on Coursera, Udemy, and YouTube.
            </p>
          </Card>

          {/* Card 5: Institutional Admin Governance (4 cols) */}
          <Card class="md:col-span-4 p-6 space-y-4">
            <div class="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <ShieldCheck class="w-5 h-5" />
            </div>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white">Admin Management</h4>
            <p class="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Enables university career placement officers to track student readiness and configure custom job criteria.
            </p>
          </Card>

        </div>

      </div>
    </section>
  );
};
