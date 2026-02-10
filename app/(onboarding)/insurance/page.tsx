'use client';

import { InsuranceUploadForm } from '@/components/features/onboarding/InsuranceUploadForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

export default function InsurancePage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Insurance Coverage</CardTitle>
          <CardDescription>
            Upload your current insurance certificates. All contractors must maintain active coverage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Minimum required coverage: General Liability ($1M), Workers Comp (if applicable), Auto Liability ($1M)
            </AlertDescription>
          </Alert>
          
          <InsuranceUploadForm />
        </CardContent>
      </Card>
    </div>
  );
}
