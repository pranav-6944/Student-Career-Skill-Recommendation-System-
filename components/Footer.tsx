import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer class="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles class="w-4 h-4" />
            </div>
            <span class="font-bold text-base text-white">CareerPath AI</span>
          </div>

          <div class="flex flex-wrap gap-6 text-slate-400">
            <a href="#features" class="hover:text-white transition-colors">Features</a>
            <a href="#how" class="hover:text-white transition-colors">How It Works</a>
            <a href="#careers" class="hover:text-white transition-colors">Career Mappings</a>
            <a href="#admin" class="hover:text-white transition-colors">For Institutions</a>
          </div>

          <div class="flex items-center gap-4 text-slate-400">
            <a href="https://github.com/pranav-6944/Student-Career-Skill-Recommendation-System-" target="_blank" rel="noreferrer" class="hover:text-white">
              <Github class="w-4 h-4" />
            </a>
            <a href="#" class="hover:text-white"><Twitter class="w-4 h-4" /></a>
            <a href="#" class="hover:text-white"><Linkedin class="w-4 h-4" /></a>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2024 CareerPath AI. Built with React, TypeScript & Tailwind CSS.</p>
          <p>Designed for College Career Recommendation & Placement Intelligence.</p>
        </div>

      </div>
    </footer>
  );
};
