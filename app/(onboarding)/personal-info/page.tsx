'use client';

import { PersonalInfoForm } from '@/components/features/onboarding/PersonalInfoForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PersonalInfoPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Tell us about yourself. This information will be used for your profile and 1099 tax documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
