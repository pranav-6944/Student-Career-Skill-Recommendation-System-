import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-white">CareerPath AI</span>
          </div>

          <div className="flex flex-wrap gap-6 text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#careers" className="hover:text-white transition-colors">Career Mappings</a>
            <a href="#features" className="hover:text-white transition-colors">For Institutions</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="mailto:support@careerpath.ai" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:support@careerpath.ai" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:support@careerpath.ai" className="hover:text-white transition-colors">Contact Us</a>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://github.com/pranav-6944/Student-Career-Skill-Recommendation-System-" target="_blank" rel="noreferrer" className="hover:text-white">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2024 CareerPath AI. Built with React, TypeScript & Tailwind CSS.</p>
          <p>Designed for College Career Recommendation & Placement Intelligence.</p>
        </div>

      </div>
    </footer>
  );
};
