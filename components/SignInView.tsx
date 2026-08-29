import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BrainCircuit, Mail, Lock, User, ArrowRight, Github, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { UserSession } from '@/src/themeContext';

interface SignInViewProps {
  onSignInSuccess: (user: UserSession) => void;
}

// Hardcoded demo credentials — no real backend
const ADMIN_EMAIL = 'admin@careerpath.ai';
const ADMIN_PASSWORD = 'admin123';
const STUDENT_EMAIL = 'ashwini@student.com';
const STUDENT_PASSWORD = 'student123';

// Derive a display name from an email: "john.doe@gmail.com" → "John Doe"
const nameFromEmail = (email: string): string => {
  const local = email.split('@')[0];
  return local
    .replace(/[._\-+]/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
};

export function SignInView({ onSignInSuccess }: SignInViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [githubClicked, setGithubClicked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const emailLower = email.toLowerCase().trim();

      if (isLogin) {
        // Admin login
        if (emailLower === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          onSignInSuccess({ email: ADMIN_EMAIL, name: 'Administrator', role: 'admin' });
          return;
        }
        // Demo student login
        if (emailLower === STUDENT_EMAIL && password === STUDENT_PASSWORD) {
          onSignInSuccess({ email: STUDENT_EMAIL, name: 'Ashwini Kate', role: 'student' });
          return;
        }
        // Any valid email + 6+ char password → sign them in with their email-derived name
        if (emailLower.includes('@') && emailLower.includes('.') && password.length >= 6) {
          onSignInSuccess({ email: emailLower, name: nameFromEmail(emailLower), role: 'student' });
          return;
        }
        // Invalid
        setError('Password must be at least 6 characters. Or use the demo credentials below.');
      } else {
        // Sign Up
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setIsLoading(false);
          return;
        }
        const displayName = fullName.trim() || nameFromEmail(email);
        onSignInSuccess({ email: email.toLowerCase().trim(), name: displayName, role: 'student' });
      }
    }, 800);
  };

  const handleGithub = () => {
    setGithubClicked(true);
    setTimeout(() => setGithubClicked(false), 2500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative">

      {/* Background glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md p-8 sm:p-10 relative z-10 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-500/10 rounded-3xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">

        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30 mb-2">
            <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isLogin
              ? 'Sign in to access your personal career dashboard'
              : 'Sign up to get personalized career recommendations'}
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-700 dark:text-red-400 font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Credentials (only on login mode) */}
        {isLogin && (
          <div className="mb-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl px-4 py-3 text-xs space-y-1.5">
            <p className="font-bold text-indigo-800 dark:text-indigo-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Demo Credentials
            </p>
            <p className="text-indigo-700 dark:text-indigo-300">
              🎓 <strong>Student:</strong> <code className="bg-indigo-100 dark:bg-indigo-900 px-1 rounded">ashwini@student.com</code> / <code className="bg-indigo-100 dark:bg-indigo-900 px-1 rounded">student123</code>
            </p>
            <p className="text-indigo-700 dark:text-indigo-300">
              🛡️ <strong>Admin:</strong> <code className="bg-indigo-100 dark:bg-indigo-900 px-1 rounded">admin@careerpath.ai</code> / <code className="bg-indigo-100 dark:bg-indigo-900 px-1 rounded">admin123</code>
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-[11px] pt-0.5">
              Or sign in with your own Gmail / email — your account will be created automatically.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name — sign up only */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label htmlFor="fullname" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  id="fullname"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                id="email"
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Password</label>
              {isLogin && (
                <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            variant="glow"
            disabled={isLoading}
            className="w-full h-12 text-base font-extrabold gap-2 mt-2"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {isLogin ? 'Signing in...' : 'Creating account...'}</>
            ) : (
              <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>

          {/* Divider */}
          <div className="relative flex items-center py-1">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* GitHub OAuth (Coming Soon) */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGithub}
            className="w-full h-12 gap-2 font-bold"
          >
            <Github className="w-5 h-5" />
            {githubClicked ? '⚡ GitHub OAuth — Coming Soon!' : 'Continue with GitHub'}
          </Button>

        </form>

        {/* Toggle Sign In / Sign Up */}
        <div className="mt-7 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); setFullName(''); }}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              {isLogin ? 'Sign up for free' : 'Sign in here'}
            </button>
          </p>
        </div>

      </Card>
    </div>
  );
}
