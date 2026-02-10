'use client';

import { BusinessInfoForm } from '@/components/features/onboarding/BusinessInfoForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BusinessInfoPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            How should we pay you? This information is required for 1099 tax reporting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}
