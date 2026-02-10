'use client';

import { TrainingForm } from '@/components/features/onboarding/TrainingForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap } from 'lucide-react';

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Safety Training</CardTitle>
          <CardDescription>
            Complete the required safety training video and acknowledge your understanding of our safety protocols.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <GraduationCap className="h-4 w-4" />
            <AlertDescription>
              This training is mandatory for all field contractors. You must watch the entire video and confirm completion.
            </AlertDescription>
          </Alert>
          
          <TrainingForm />
        </CardContent>
      </Card>
    </div>
  );
}
