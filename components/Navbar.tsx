import React from 'react';
import { Sparkles, LayoutDashboard, Globe, Shield, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  currentMode: 'website' | 'webapp' | 'admin';
  setMode: (mode: 'website' | 'webapp' | 'admin') => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  setMode,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header class="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div class="flex items-center gap-3 cursor-pointer" onClick={() => setMode('website')}>
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <div>
            <span class="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              CareerPath <span class="text-indigo-400 font-extrabold">AI</span>
            </span>
            <span class="hidden sm:block text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Student Career & Skill Intelligence
            </span>
          </div>
        </div>

        {/* Desktop Nav Mode Switcher */}
        <div class="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setMode('website')}
            class={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              currentMode === 'website'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Globe class="w-3.5 h-3.5" />
            Website
          </button>
          <button
            onClick={() => setMode('webapp')}
            class={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              currentMode === 'webapp'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard class="w-3.5 h-3.5" />
            Student App
          </button>
          <button
            onClick={() => setMode('admin')}
            class={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
              currentMode === 'admin'
                ? 'bg-slate-800 text-amber-400 border border-amber-500/30 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield class="w-3.5 h-3.5" />
            Admin Panel
          </button>
        </div>

        {/* Action Button */}
        <div class="hidden sm:flex items-center gap-3">
          {currentMode === 'website' ? (
            <Button size="sm" onClick={() => setMode('webapp')} class="gap-2">
              Launch Web App
              <ArrowRight class="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setMode('website')}>
              Back to Home
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          class="md:hidden p-2 text-slate-400 hover:text-white rounded-lg"
        >
          {mobileOpen ? <X class="w-6 h-6" /> : <Menu class="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div class="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-2">
          <button
            onClick={() => { setMode('website'); setMobileOpen(false); }}
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
          >
            <Globe class="w-4 h-4 text-indigo-400" />
            Marketing Website
          </button>
          <button
            onClick={() => { setMode('webapp'); setMobileOpen(false); }}
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
          >
            <LayoutDashboard class="w-4 h-4 text-emerald-400" />
            Student Web App
          </button>
          <button
            onClick={() => { setMode('admin'); setMobileOpen(false); }}
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900"
          >
            <Shield class="w-4 h-4 text-amber-400" />
            Admin Panel
          </button>
        </div>
      )}
    </header>
  );
};
