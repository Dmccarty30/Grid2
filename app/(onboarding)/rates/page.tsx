'use client';

import { RatesForm } from '@/components/features/onboarding/RatesForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign } from 'lucide-react';

export default function RatesPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Compensation Rates</CardTitle>
          <CardDescription>
            Review and agree to your hourly rates for different types of work.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <DollarSign className="h-4 w-4" />
            <AlertDescription>
              These are standard rates for new contractors. Rates may be adjusted based on experience and performance after your first 90 days.
            </AlertDescription>
          </Alert>
          
          <RatesForm />
        </CardContent>
      </Card>
    </div>
  );
}
