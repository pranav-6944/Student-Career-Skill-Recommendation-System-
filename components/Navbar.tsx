import React, { useState } from 'react';
import { Sparkles, LayoutDashboard, Globe, Shield, ArrowRight, Sun, Moon, User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/src/themeContext';

interface NavbarProps {
  currentMode: 'website' | 'webapp' | 'admin';
  setMode: (mode: 'website' | 'webapp' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentMode, setMode }) => {
  const { theme, toggleTheme, role, setRole } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleRoleChange = (newRole: 'student' | 'admin') => {
    setRole(newRole);
    setProfileDropdownOpen(false);
    if (newRole === 'admin') {
      setMode('admin');
    } else if (currentMode === 'admin') {
      setMode('webapp');
    }
  };

  return (
    <header class="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div class="flex items-center gap-3 cursor-pointer" onClick={() => setMode('website')}>
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <div>
            <span class="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              CareerPath <span class="text-indigo-600 dark:text-indigo-400 font-black">AI</span>
            </span>
            <span class="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
              Student Career & Skill Intelligence
            </span>
          </div>
        </div>

        {/* Desktop Nav Navigation */}
        <div class="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <button
            onClick={() => setMode('website')}
            class={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentMode === 'website'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <Globe class="w-3.5 h-3.5" />
            Website
          </button>
          
          <button
            onClick={() => setMode('webapp')}
            class={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              currentMode === 'webapp'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard class="w-3.5 h-3.5" />
            Student App
          </button>

          {/* ADMIN CONSOLE BUTTON — Visible ONLY when User Role is Admin! */}
          {role === 'admin' && (
            <button
              onClick={() => setMode('admin')}
              class={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                currentMode === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/30'
                  : 'text-amber-500 hover:bg-amber-500/10'
              }`}
            >
              <Shield class="w-3.5 h-3.5" />
              Admin Console
            </button>
          )}
        </div>

        {/* Right Controls: Dark/Light Mode + Role Switcher */}
        <div class="flex items-center gap-3">
          
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun class="w-4 h-4 text-amber-400" /> : <Moon class="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Account & Role Switcher Dropdown */}
          <div class="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold cursor-pointer transition-colors"
            >
              <div class="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                {role === 'admin' ? 'AD' : 'AK'}
              </div>
              <span class="hidden sm:inline">
                {role === 'admin' ? 'Admin Profile' : 'Ashwini Kate (Student)'}
              </span>
              <ChevronDown class="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div class="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 text-xs space-y-1">
                <div class="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p class="font-bold text-slate-900 dark:text-white">Active Account</p>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">
                    Role: <span class="font-bold text-indigo-600 dark:text-indigo-400 uppercase">{role}</span>
                  </p>
                </div>

                <p class="px-3 pt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Perspective:</p>
                
                <button
                  onClick={() => handleRoleChange('student')}
                  class={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                    role === 'student' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span class="flex items-center gap-2">
                    <User class="w-3.5 h-3.5" />
                    Student Mode
                  </span>
                  {role === 'student' && <span class="text-[10px] text-emerald-500 font-bold">Active</span>}
                </button>

                <button
                  onClick={() => handleRoleChange('admin')}
                  class={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                    role === 'admin' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span class="flex items-center gap-2">
                    <Shield class="w-3.5 h-3.5 text-amber-500" />
                    Admin Mode
                  </span>
                  {role === 'admin' && <span class="text-[10px] text-amber-500 font-bold">Active</span>}
                </button>
              </div>
            )}
          </div>

          {/* Launch App Button */}
          {currentMode === 'website' && (
            <Button size="sm" onClick={() => setMode('webapp')} class="hidden sm:inline-flex gap-1.5">
              Launch App
              <ArrowRight class="w-3.5 h-3.5" />
            </Button>
          )}

        </div>
      </div>
    </header>
  );
};
