import React from 'react';
import { FileText, Scale, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const TermsOfServiceView: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Last updated: August 2026
          </p>
        </div>

        <Card className="p-8 sm:p-12 space-y-8 prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-500" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using CareerPath AI, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-500" />
              2. Description of Service
            </h2>
            <p>
              CareerPath AI provides users with tools for resume analysis, skill extraction, and career recommendations ("Service"). You understand and agree that the Service is provided "AS-IS" and that CareerPath AI assumes no responsibility for the accuracy of career matching or hiring outcomes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. User Conduct
            </h2>
            <p>
              You agree to not use the Service to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Upload resumes or documents that contain false, misleading, or malicious information.</li>
              <li>Attempt to gain unauthorized access to any portion of the platform or any other systems connected to the platform.</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Intellectual Property
            </h2>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, data compilations, and software, is the property of CareerPath AI or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall CareerPath AI be liable for any direct, indirect, incidental, special, or consequential damages, or damages for loss of profits, revenue, data, or use, incurred by you or any third party, whether in an action in contract or tort, arising from your access to, or use of, the site or any services provided through the site.
            </p>
          </section>

        </Card>
      </div>
    </div>
  );
};
