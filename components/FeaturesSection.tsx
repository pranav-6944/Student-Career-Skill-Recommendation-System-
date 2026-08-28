import React from 'react';
import { FileSearch, Target, BookOpen, ShieldCheck, BarChart3, Rocket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: FileSearch,
      title: "NLP Resume Extraction",
      description: "Automatically parses PDF and DOCX resumes using domain-tuned natural language processing to extract skills, education, and projects.",
      color: "from-indigo-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Target,
      title: "Career Match Algorithm",
      description: "Calculates real-time weighted percentage fit against 50+ career roles based on skill importance and core domain requirements.",
      color: "from-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: BarChart3,
      title: "Skill Gap Matrix",
      description: "Visualizes matched vs. missing skills with high/medium priority tags so students know exactly what to learn next.",
      color: "from-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: BookOpen,
      title: "Curated Learning Paths",
      description: "Pairs missing skills with top-rated courses from Coursera, Udemy, YouTube, and Mode Analytics to bridge career readiness gaps.",
      color: "from-amber-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: ShieldCheck,
      title: "Institutional Admin Panel",
      description: "Provides university administrators with student readiness statistics, career trends, and custom career role criteria management.",
      color: "from-sky-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    },
    {
      icon: Rocket,
      title: "Placement Readiness Index",
      description: "Monitors overall career readiness based on top career matches, giving students actionable steps to boost placement potential.",
      color: "from-rose-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section class="py-20 bg-slate-950/60 relative border-t border-b border-slate-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            ENGINEERING & ANALYTICS FEATURES
          </h2>
          <p class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything Students Need to Master Their Career Journey
          </p>
          <p class="text-slate-400 text-base">
            From raw resume parsing to target skill growth — our AI framework turns student qualifications into clear career roadmaps.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card key={idx} class="group overflow-hidden border-slate-800/80 hover:border-slate-700 bg-slate-900/60">
                
                {/* Image preview top */}
                <div class="h-44 w-full overflow-hidden relative">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Icon badge */}
                  <div class={`absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon class="w-5 h-5" />
                  </div>
                </div>

                <CardHeader class="pt-4">
                  <CardTitle class="text-lg text-white group-hover:text-indigo-400 transition-colors">
                    {feat.title}
                  </CardTitle>
                  <CardDescription class="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
