import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: "How does the NLP resume parser extract skills?",
      a: "Our domain-tuned phrase matching engine parses PDF and DOCX documents to extract programming languages, libraries, frameworks, degrees, and certifications without requiring manual user input.",
    },
    {
      q: "How is the career match percentage calculated?",
      a: "The match score evaluates your extracted skills against weighted skill requirements for each career role. Core skills contribute higher weights than optional skills, generating an accurate 0–100% fit score.",
    },
    {
      q: "Is my resume data stored securely?",
      a: "Yes. All uploads are processed securely in compliance with standard data protection guidelines, and used strictly to generate your career recommendations.",
    },
    {
      q: "Can university administrators customize career roles?",
      a: "Absolutely. The Institutional Admin Console allows career placement officers to add new job roles, update required skill weights, and monitor student readiness metrics.",
    },
    {
      q: "Are the recommended learning path courses free?",
      a: "We curate a mix of top-rated free courses (YouTube, HackerRank) and certified university courses (Coursera, Udemy) so students can choose based on budget and learning goals.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section class="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p class="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Got Questions? We Have Answers
          </h2>
        </div>

        <div class="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={idx}
                class="overflow-hidden cursor-pointer transition-all duration-200"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div class="p-5 flex items-center justify-between gap-4">
                  <h3 class="font-bold text-base text-slate-900 dark:text-white flex items-center gap-3">
                    <HelpCircle class="w-4 h-4 text-indigo-500 flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <ChevronDown class={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                </div>

                {isOpen && (
                  <div class="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
