'use client';

import { AgreementsForm } from '@/components/features/onboarding/AgreementsForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText } from 'lucide-react';

export default function AgreementsPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Agreements & Contracts</CardTitle>
          <CardDescription>
            Please review and sign the following documents to complete your contractor agreement.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              These are legally binding documents. Please read each agreement carefully before signing.
            </AlertDescription>
          </Alert>
          
          <AgreementsForm />
        </CardContent>
      </Card>
    </div>
  );
}
