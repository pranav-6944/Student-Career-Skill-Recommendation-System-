import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Ashwini Kate",
      degree: "B.Sc Computer Science, 3rd Year",
      quote: "CareerPath AI helped me discover that my Python and SQL skills made me an 82% fit for Data Analyst roles. Closing my gap in Statistics got me my first internship!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Rohan Sharma",
      degree: "B.Tech IT, Final Year",
      quote: "The instant NLP resume parser highlighted missing core requirements for Full-Stack jobs that I had omitted. The learning path directly guided my prep.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      name: "Priya Nair",
      degree: "B.CA, 3rd Year",
      quote: "As a student uncertain about specialization, the skill gap matrix gave me clear priorities instead of generic advice. Highly recommend!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Badge variant="default" className="px-3.5 py-1">STUDENT SUCCESS STORIES</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by 12,000+ College Students
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            See how students accelerated their career readiness using our AI platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="p-8 space-y-5 relative">
              <Quote className="w-10 h-10 text-indigo-500/20 absolute top-5 right-5 pointer-events-none" />
              
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed font-normal">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/40" />
                <div>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{t.degree}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
