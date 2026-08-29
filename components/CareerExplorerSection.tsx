import React, { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
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
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="default" className="px-3.5 py-1">EXPLORE HIGH-DEMAND ROLES</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Popular Mapped Career Roles
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Click roles below to preview core technical skill benchmarks.
          </p>
        </div>

        {/* Role Tab Selector */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-10">
          {roles.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRoleIndex(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeRoleIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500'
              }`}
            >
              {r.title}
            </button>
          ))}
        </div>

        {/* Selected Role Detailed Card */}
        <Card className="max-w-4xl mx-auto p-8 sm:p-10 border-2 border-indigo-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="default">{activeRole.department}</Badge>
                <Badge variant="success" className="gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {activeRole.growth}
                </Badge>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {activeRole.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold">
                Average Industry Package: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{activeRole.salary}</span>
              </p>
            </div>

            <Button onClick={onLaunchApp} size="lg" className="gap-2 self-start md:self-center font-extrabold px-6 shadow-xl">
              Check My Match Percentage
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Core Industry Skill Standards ({activeRole.skills.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {activeRole.skills.map((sk, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs font-bold py-1 px-3">
                  ✓ {sk}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

      </div>
    </section>
  );
};
