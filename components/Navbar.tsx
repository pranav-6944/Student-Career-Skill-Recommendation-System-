import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, LayoutDashboard, Globe, Shield, ArrowRight, Sun, Moon, User, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/src/themeContext';

type AppMode = 'website' | 'webapp' | 'admin' | 'auth' | 'privacy' | 'terms' | 'contact';

interface NavbarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const isAuthenticated = (mode: AppMode) => mode === 'webapp' || mode === 'admin';

export const Navbar: React.FC<NavbarProps> = ({ currentMode, setMode }) => {
  const { theme, toggleTheme, role, currentUser } = useTheme();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when mode changes
  useEffect(() => {
    setProfileDropdownOpen(false);
  }, [currentMode]);

  const handleStudentAppClick = () => {
    // If not authenticated, go to login first
    if (!isAuthenticated(currentMode)) {
      setMode('auth');
    } else {
      setMode('webapp');
    }
  };

  const handleAdminClick = () => {
    if (role === 'admin') {
      setMode('admin');
    }
  };

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    setMode('auth');
  };

  const handleGoToDashboard = () => {
    setProfileDropdownOpen(false);
    setMode(role === 'admin' ? 'admin' : 'webapp');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand — always goes to website */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setMode('website')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              CareerPath <span className="text-indigo-600 dark:text-indigo-400 font-black">AI</span>
            </span>
            <span className="hidden sm:block text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
              Student Career & Skill Intelligence
            </span>
          </div>
        </div>

        {/* Center Nav — mode switcher */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
          <button
            onClick={() => setMode('website')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
              ['website', 'privacy', 'terms', 'contact'].includes(currentMode)
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Website
          </button>

          <button
            onClick={handleStudentAppClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
              currentMode === 'webapp'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Student App
          </button>

          {/* Admin Console — ONLY shown when role is admin */}
          {role === 'admin' && (
            <button
              onClick={handleAdminClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                currentMode === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-amber-500 hover:bg-amber-500/10'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Console
            </button>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Profile Dropdown — ONLY shown when authenticated (webapp or admin mode) */}
          {isAuthenticated(currentMode) && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-bold cursor-pointer transition-colors"
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] text-white ${role === 'admin' ? 'bg-amber-500' : 'bg-indigo-600'}`}>
                  {currentUser
                    ? currentUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                    : role === 'admin' ? 'AD' : '?'}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {currentUser ? currentUser.name : role === 'admin' ? 'Admin Profile' : 'Student'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 text-xs space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="font-bold text-slate-900 dark:text-white truncate">
                      {currentUser ? currentUser.name : role === 'admin' ? 'Administrator' : 'Student'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {currentUser?.email}
                    </p>
                    <p className="text-[11px] mt-0.5">
                      Role: <span className={`font-bold uppercase ${role === 'admin' ? 'text-amber-500' : 'text-indigo-600 dark:text-indigo-400'}`}>{role}</span>
                    </p>
                  </div>

                  <button
                    onClick={handleGoToDashboard}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    {role === 'admin' ? 'Admin Console' : 'My Dashboard'}
                  </button>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Launch App Button — shown on website/auth mode only */}
          {(currentMode === 'website' || currentMode === 'auth') && (
            <Button size="default" onClick={() => setMode('auth')} className="hidden sm:inline-flex gap-1.5 font-bold shadow-md">
              {currentMode === 'auth' ? 'Sign In' : 'Launch App'}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          )}

        </div>
      </div>
    </header>
  );
};
