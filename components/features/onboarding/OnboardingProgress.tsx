'use client';

import { usePathname } from 'next/navigation';
import { useOnboarding } from '@/components/providers/OnboardingProvider';

const ONBOARDING_STEPS = [
  { path: '/welcome', label: 'Welcome', step: 0 },
  { path: '/personal-info', label: 'Personal', step: 1 },
  { path: '/business-info', label: 'Business', step: 2 },
  { path: '/insurance', label: 'Insurance', step: 3 },
  { path: '/credentials', label: 'Credentials', step: 4 },
  { path: '/banking', label: 'Banking', step: 5 },
  { path: '/rates', label: 'Rates', step: 6 },
  { path: '/agreements', label: 'Agreements', step: 7 },
  { path: '/training', label: 'Training', step: 8 },
  { path: '/profile-photo', label: 'Photo', step: 9 },
  { path: '/review', label: 'Review', step: 10 },
  { path: '/pending', label: 'Pending', step: 11 },
];

export function OnboardingProgress() {
  const pathname = usePathname();
  const { currentStep, totalSteps } = useOnboarding();

  // Don't show progress on welcome or pending pages
  if (pathname === '/welcome' || pathname === '/pending') {
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
