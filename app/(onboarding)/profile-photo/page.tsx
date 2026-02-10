'use client';

import { ProfilePhotoForm } from '@/components/features/onboarding/ProfilePhotoForm';
import { OnboardingStepIndicator } from '@/components/features/onboarding/OnboardingProgress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera } from 'lucide-react';

export default function ProfilePhotoPage() {
  return (
    <div className="space-y-6">
      <OnboardingStepIndicator />
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>
            Take or upload a clear photo of yourself for identification and your contractor profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Camera className="h-4 w-4" />
            <AlertDescription>
              Please use a clear, well-lit photo with a neutral background. This photo may be used for site access badges.
            </AlertDescription>
          </Alert>
          
          <ProfilePhotoForm />
        </CardContent>
      </Card>
    </div>
  );
}
