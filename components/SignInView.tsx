import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BrainCircuit, Mail, Lock, ArrowRight, Github } from 'lucide-react';

interface SignInViewProps {
  onSignInSuccess: () => void;
}

export function SignInView({ onSignInSuccess }: SignInViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setTimeout(() => {
      onSignInSuccess();
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      
      {/* Background decoration */}
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
            {isLogin ? 'Enter your details to access your dashboard' : 'Sign up to jumpstart your career path'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Full Name</label>
              <input id="name" type="text" placeholder="Ashwini Kate" required className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input 
                id="email" 
                type="email" 
                placeholder="ashwini@example.com" 
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required 
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Password</label>
              {isLogin && <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</a>}
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
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              />
            </div>
          </div>

          <Button type="submit" size="lg" variant="glow" className="w-full h-12 text-base font-extrabold gap-2 mt-2">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          
          <Button type="button" variant="outline" size="lg" className="w-full h-12 gap-2 text-slate-700 dark:text-slate-300 font-bold bg-white dark:bg-slate-950">
            <Github className="w-5 h-5" />
            GitHub
          </Button>

        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
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
