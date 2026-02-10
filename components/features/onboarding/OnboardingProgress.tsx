'use client';

import { usePathname } from 'next/navigation';
import { useOnboarding } from '@/components/providers/OnboardingProvider';

const ONBOARDING_STEPS = [
  { path: '/onboarding/welcome', label: 'Welcome', step: 0 },
  { path: '/onboarding/personal-info', label: 'Personal', step: 1 },
  { path: '/onboarding/business-info', label: 'Business', step: 2 },
  { path: '/onboarding/insurance', label: 'Insurance', step: 3 },
  { path: '/onboarding/credentials', label: 'Credentials', step: 4 },
  { path: '/onboarding/banking', label: 'Banking', step: 5 },
  { path: '/onboarding/rates', label: 'Rates', step: 6 },
  { path: '/onboarding/agreements', label: 'Agreements', step: 7 },
  { path: '/onboarding/training', label: 'Training', step: 8 },
  { path: '/onboarding/profile-photo', label: 'Photo', step: 9 },
  { path: '/onboarding/review', label: 'Review', step: 10 },
  { path: '/onboarding/pending', label: 'Pending', step: 11 },
];

export function OnboardingProgress() {
  const pathname = usePathname();
  const { currentStep, totalSteps } = useOnboarding();

  // Don't show progress on welcome or pending pages
  if (pathname === '/onboarding/welcome' || pathname === '/onboarding/pending') {
    return null;
  }

  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-500 hidden sm:block">
        Step {currentStep} of {totalSteps - 1}
      </span>
      <div className="w-32 sm:w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export function OnboardingStepIndicator() {
  const pathname = usePathname();
  const currentStepInfo = ONBOARDING_STEPS.find(s => s.path === pathname);
  
  if (!currentStepInfo || currentStepInfo.step === 0 || currentStepInfo.step === 11) {
    return null;
  }

  return (
    <div className="flex justify-center gap-1 mb-6">
      {ONBOARDING_STEPS.slice(1, 11).map((step, index) => {
        const isActive = step.step === currentStepInfo.step;
        const isCompleted = step.step < currentStepInfo.step;
        
        return (
          <div
            key={step.path}
            className={`w-2 h-2 rounded-full transition-colors ${
              isActive
                ? 'bg-blue-600'
                : isCompleted
                ? 'bg-blue-300'
                : 'bg-slate-200'
            }`}
          />
        );
      })}
    </div>
  );
}
