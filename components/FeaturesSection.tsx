import React from 'react';
import { FileSearch, Target, BookOpen, ShieldCheck, BarChart3, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FileSearch,
      title: "NLP Resume Extraction",
      description: "Automatically parses PDF and DOCX resumes using domain-tuned natural language processing to extract skills, education, and projects with zero manual entry.",
      color: "from-indigo-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Target,
      title: "Career Match Algorithm",
      description: "Calculates real-time weighted percentage fit against 50+ career roles based on skill importance, degree requirements, and industry benchmarks.",
      color: "from-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: BarChart3,
      title: "Skill Gap Matrix",
      description: "Visualizes matched vs. missing skills with high/medium priority tags so students know exactly what core technologies to master next.",
      color: "from-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: BookOpen,
      title: "Curated Learning Paths",
      description: "Pairs missing skills with top-rated courses from Coursera, Udemy, YouTube, and Mode Analytics to bridge career readiness gaps effectively.",
      color: "from-amber-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: ShieldCheck,
      title: "Institutional Admin Panel",
      description: "Provides university placement administrators with student readiness statistics, career trends, and custom role skill criteria management.",
      color: "from-sky-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Rocket,
      title: "Placement Readiness Index",
      description: "Monitors overall student career readiness based on top career matches, giving students actionable steps to boost placement potential.",
      color: "from-rose-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="default" className="px-3.5 py-1">ENGINEERING & ANALYTICS FEATURES</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything Students Need to Master Their Career Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            From raw resume parsing to target skill growth — our AI framework turns student qualifications into clear, actionable career roadmaps.
          </p>
        </div>

        {/* Feature Cards Grid with Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} className="group p-5 flex flex-col justify-between border-2 border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 rounded-3xl shadow-xl hover:border-indigo-500/50 hover:shadow-2xl transition-all duration-300">
                
                {/* Card Image Container with Inset Margin & Rounded Corners */}
                <div className="h-48 w-full overflow-hidden rounded-2xl relative mb-5 border border-slate-200 dark:border-slate-800">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Icon badge */}
                  <div className={`absolute bottom-3 left-4 w-11 h-11 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Text Content with Generous Padding */}
                <div className="space-y-3 px-2 pb-2">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
