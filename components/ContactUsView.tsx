import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ContactUsView: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => {
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-16">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Have questions about CareerPath AI, need support, or want to explore an institutional partnership? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <Card className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Chat to Sales</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Speak to our friendly team.</p>
                <a href="mailto:sales@careerpath.ai" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">sales@careerpath.ai</a>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Support</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">We're here to help you.</p>
                <a href="mailto:support@careerpath.ai" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">support@careerpath.ai</a>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Office</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  100 Tech Park Way,<br />
                  Silicon Valley, CA 94000
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Your Email</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                <textarea
                  required
                  rows={6}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-indigo-500 outline-none resize-none"
                />
              </div>

              <Button type="submit" className="w-full h-12 font-bold flex items-center justify-center gap-2">
                {isSent ? (
                  <span className="text-emerald-400">Message Sent Successfully!</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>

        </div>
      </div>
    </div>
  );
};
