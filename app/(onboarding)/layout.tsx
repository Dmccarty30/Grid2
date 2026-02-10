'use client';

import { ReactNode } from 'react';
import { OnboardingProgress } from '@/components/features/onboarding/OnboardingProgress';
import { OnboardingProvider } from '@/components/providers/OnboardingProvider';

export default function OnboardingLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 hidden sm:block">
                Grid Electric
              </span>
            </div>
            <OnboardingProgress />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  );
}
