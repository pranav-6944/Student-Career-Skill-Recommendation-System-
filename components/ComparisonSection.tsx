import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ComparisonSection: React.FC = () => {
  const comparisons = [
    {
      feature: "Resume Evaluation",
      traditional: "Manual human skimming (takes days)",
      careerpath: "Instant NLP skill & project entity extraction (sub-second)",
    },
    {
      feature: "Career Alignment",
      traditional: "Generic job applications regardless of skill fit",
      careerpath: "Weighted percentage match fit across 50+ roles",
    },
    {
      feature: "Skill Gap Identification",
      traditional: "Student guesses what skills are missing",
      careerpath: "Categorized priority matrix (High vs. Medium gaps)",
    },
    {
      feature: "Learning Resources",
      traditional: "Self-searched random tutorials",
      careerpath: "Curated direct course roadmaps (Coursera, Udemy, YouTube)",
    },
    {
      feature: "Admin Placement Oversight",
      traditional: "Excel spreadsheet tracking",
      careerpath: "Real-time readiness analytics & custom career criteria",
    },
  ];

  return (
    <section class="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            WHY CAREERPATH AI
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Traditional Guidance vs. CareerPath AI
          </h2>
        </div>

        <Card class="overflow-hidden shadow-xl border-slate-200 dark:border-slate-800">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <th class="p-4 sm:p-5 font-extrabold text-slate-900 dark:text-white w-1/3">Feature</th>
                  <th class="p-4 sm:p-5 font-bold text-slate-500 dark:text-slate-400 w-1/3">Traditional Method</th>
                  <th class="p-4 sm:p-5 font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 w-1/3">
                    CareerPath AI
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                {comparisons.map((item, idx) => (
                  <tr key={idx} class="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td class="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">{item.feature}</td>
                    <td class="p-4 sm:p-5 text-slate-500 dark:text-slate-400 flex items-start gap-2">
                      <XCircle class="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item.traditional}</span>
                    </td>
                    <td class="p-4 sm:p-5 font-semibold text-slate-800 dark:text-slate-100 bg-indigo-500/5 flex items-start gap-2">
                      <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item.careerpath}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </section>
  );
};
