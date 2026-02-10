'use client';

import { BankingForm } from '@/components/features/onboarding/BankingForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

export default function BankingPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Set up direct deposit for fast, secure payments. All information is encrypted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Your banking information is encrypted using AES-256 and stored securely. 
              We never store your full account number in plain text.
            </AlertDescription>
          </Alert>
          
          <BankingForm />
        </CardContent>
      </Card>
    </div>
  );
}
