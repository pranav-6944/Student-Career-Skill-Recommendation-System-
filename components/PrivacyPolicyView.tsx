import React from 'react';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Last updated: August 2026
          </p>
        </div>

        <Card className="p-8 sm:p-12 space-y-8 prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-500" />
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when using the CareerPath AI platform. This includes your name, email address, educational background, and any information contained within resumes (PDF/DOCX) you upload to our system for NLP parsing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-500" />
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide, maintain, and improve the career recommendation services.</li>
              <li>To extract skills and generate personalized learning roadmaps.</li>
              <li>To communicate with you regarding updates, security alerts, and support messages.</li>
              <li>To provide aggregated, anonymized metrics to institutional partners (if applicable).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              3. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your personal information. Resume data uploaded for skill extraction is processed securely and is not shared with third-party marketers. Passwords (if applicable) are securely hashed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Data Retention and Deletion
            </h2>
            <p>
              Your data is retained only as long as necessary to provide our services. You may request the deletion of your account and associated resume data at any time by contacting our support team.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

        </Card>
      </div>
    </div>
  );
};
