import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
    <section class="py-20 bg-slate-950 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            STUDENT SUCCESS STORIES
          </h2>
          <p class="text-3xl font-extrabold text-white tracking-tight">
            Trusted by 12,000+ College Students
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} class="p-6 space-y-4 bg-slate-900/50 border-slate-800 relative">
              <Quote class="w-8 h-8 text-indigo-500/20 absolute top-4 right-4" />
              
              <div class="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} class="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p class="text-sm text-slate-300 italic leading-relaxed">
                "{t.quote}"
              </p>

              <div class="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.name} class="w-10 h-10 rounded-full object-cover border border-indigo-500/40" />
                <div>
                  <p class="text-xs font-bold text-white">{t.name}</p>
                  <p class="text-[11px] text-slate-400">{t.degree}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
