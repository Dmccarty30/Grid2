'use client';

import { ReviewForm } from '@/components/features/onboarding/ReviewForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

export default function ReviewPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Review & Submit</CardTitle>
          <CardDescription>
            Review your information before submitting your application. You can go back to make changes if needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              By submitting, you confirm that all information provided is accurate and complete. 
              False information may result in termination of your contractor agreement.
            </AlertDescription>
          </Alert>
          
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
