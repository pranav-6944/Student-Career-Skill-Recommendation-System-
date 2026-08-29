import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BrainCircuit, Mail, Lock, ArrowRight, Github, Loader2, AlertCircle } from 'lucide-react';

interface SignInViewProps {
  onSignInSuccess: (role: 'student' | 'admin') => void;
}

// Test credentials (frontend-only simulation — no real backend)
const ADMIN_EMAIL = 'admin@careerpath.ai';
const ADMIN_PASSWORD = 'admin123';
const STUDENT_EMAIL = 'ashwini@student.com';
const STUDENT_PASSWORD = 'student123';

export function SignInView({ onSignInSuccess }: SignInViewProps) {
  const [isLogin, setIsLogin] = useState(true);
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

      if (isLogin) {
        // Admin login check
        if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          onSignInSuccess('admin');
          return;
        }
        // Student login check — accept exact student creds OR any registered email with 6+ char password
        if (email.toLowerCase() === STUDENT_EMAIL && password === STUDENT_PASSWORD) {
          onSignInSuccess('student');
          return;
        }
        // Allow any properly formatted email with 6+ char password for demo sign-up flow
        if (email.includes('@') && email.includes('.') && password.length >= 6) {
          onSignInSuccess('student');
          return;
        }
        // Wrong credentials
        setError('Invalid email or password. Try student123 or admin123.');
        setIsLoading(false);
        return;
      } else {
        // Sign up — always creates a student account in simulation mode
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          return;
        }
        onSignInSuccess('student');
      }
    }, 800);
  };

  const handleGithub = () => {
    setGithubClicked(true);
    setTimeout(() => setGithubClicked(false), 2500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 relative">

      {/* Background glow decoration */}
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
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? 'Sign in to access your career dashboard' : 'Sign up to jumpstart your career path'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-700 dark:text-red-400 font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Demo Credentials Hint */}
        {isLogin && (
          <div className="mb-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-xl px-4 py-3 text-xs text-indigo-700 dark:text-indigo-300 font-medium space-y-1">
            <p className="font-bold text-indigo-800 dark:text-indigo-200">Demo Credentials:</p>
            <p>🎓 Student: <code>ashwini@student.com</code> / <code>student123</code></p>
            <p>🛡️ Admin: <code>admin@careerpath.ai</code> / <code>admin123</code></p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                required
                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Password</label>
              {isLogin && (
                <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            variant="glow"
            disabled={isLoading}
            className="w-full h-12 text-base font-extrabold gap-2 mt-2"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
            ) : (
              <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGithub}
            className="w-full h-12 gap-2 font-bold"
          >
            <Github className="w-5 h-5" />
            {githubClicked ? 'GitHub OAuth — Coming Soon!' : 'Continue with GitHub'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
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
