import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="default" className="px-3.5 py-1">WHY CAREERPATH AI</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Traditional Guidance vs. CareerPath AI
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            See how our AI career recommendation engine replaces outdated manual placement drives.
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-slate-800/90 rounded-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800">
                  <th className="p-5 sm:p-6 font-extrabold text-slate-900 dark:text-white w-1/4">
                    Feature
                  </th>
                  <th className="p-5 sm:p-6 font-bold text-slate-600 dark:text-slate-400 w-3/8 border-l border-slate-200 dark:border-slate-800">
                    Traditional Method
                  </th>
                  <th className="p-5 sm:p-6 font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 w-3/8 border-l border-slate-200 dark:border-slate-800">
                    CareerPath AI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {comparisons.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    
                    {/* Column 1: Feature */}
                    <td className="p-5 sm:p-6 font-bold text-slate-900 dark:text-white">
                      {item.feature}
                    </td>

                    {/* Column 2: Traditional Method */}
                    <td className="p-5 sm:p-6 text-slate-600 dark:text-slate-400 border-l border-slate-200 dark:border-slate-800">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>

                    {/* Column 3: CareerPath AI */}
                    <td className="p-5 sm:p-6 font-semibold text-slate-900 dark:text-slate-100 bg-indigo-500/5 border-l border-slate-200 dark:border-slate-800">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item.careerpath}</span>
                      </div>
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
