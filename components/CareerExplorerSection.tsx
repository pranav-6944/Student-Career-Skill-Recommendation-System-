import React, { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CareerExplorerSection: React.FC<{ onLaunchApp: () => void }> = ({ onLaunchApp }) => {
  const roles = [
    {
      title: "Data Analyst",
      salary: "₹4.5 – 12 LPA",
      growth: "+24% YoY",
      department: "Data & Analytics",
      skills: ["Python", "SQL", "Pandas", "Excel", "Power BI", "Statistics"],
    },
    {
      title: "Data Scientist",
      salary: "₹8 – 20 LPA",
      growth: "+32% YoY",
      department: "AI & Machine Learning",
      skills: ["Python", "Pandas", "Scikit-Learn", "Machine Learning", "SQL", "TensorFlow"],
    },
    {
      title: "Full-Stack Developer",
      salary: "₹6 – 18 LPA",
      growth: "+28% YoY",
      department: "Web & Engineering",
      skills: ["React", "Node.js", "TypeScript", "SQL", "Git", "REST APIs"],
    },
    {
      title: "Cloud Architect",
      salary: "₹10 – 25 LPA",
      growth: "+35% YoY",
      department: "Cloud & Infrastructure",
      skills: ["AWS", "Docker", "Kubernetes", "Linux", "Terraform", "Python"],
    },
  ];

  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = roles[activeRoleIndex];

  return (
    <section class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            EXPLORE HIGH-DEMAND ROLES
          </p>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Mapped Career Roles
          </h2>
        </div>

        {/* Role Tab Selector */}
        <div class="flex items-center justify-center gap-2 flex-wrap mb-10">
          {roles.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRoleIndex(idx)}
              class={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeRoleIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-500'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Selected Role Detailed Card */}
        <Card class="max-w-4xl mx-auto p-8 border-indigo-500/30 shadow-2xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <Badge variant="default">{activeRole.department}</Badge>
                <Badge variant="success" class="gap-1">
                  <TrendingUp class="w-3 h-3" />
                  {activeRole.growth}
                </Badge>
              </div>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {activeRole.title}
              </h3>
              <p class="text-slate-500 dark:text-slate-400 text-sm font-semibold">
                Average Industry Package: <span class="text-indigo-600 dark:text-indigo-400 font-bold">{activeRole.salary}</span>
              </p>
            </div>

            <Button onClick={onLaunchApp} size="lg" class="gap-2 self-start md:self-center">
              Check My Match Percentage
              <ArrowRight class="w-4 h-4" />
            </Button>
          </div>

          <div class="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Core Industry Skill Standards ({activeRole.skills.length}):
            </p>
            <div class="flex flex-wrap gap-2">
              {activeRole.skills.map((sk, idx) => (
                <span
                  key={idx}
                  class="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                >
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
};
