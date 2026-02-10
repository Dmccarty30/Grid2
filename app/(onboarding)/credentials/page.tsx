'use client';

import { CredentialsForm } from '@/components/features/onboarding/CredentialsForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function CredentialsPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Professional Credentials</CardTitle>
          <CardDescription>
            Add your licenses, certifications, and training records. These help us verify your qualifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Common credentials include: Electrical License, OSHA 10/30, CPR/First Aid, Climber Certification
            </AlertDescription>
          </Alert>
          
          <CredentialsForm />
        </CardContent>
      </Card>
    </div>
  );
}
