'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Mail, CheckCircle } from 'lucide-react';

export default function PendingPage() {
  const router = useRouter();

  // Redirect if user tries to access this page directly without completing onboarding
  useEffect(() => {
    // In a real app, check if onboarding was submitted
    // For now, we'll just let them see this page
  }, []);

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          <CardDescription className="text-base">
            Your application is now under review. We&apos;ll notify you once it&apos;s approved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-slate-50 rounded-lg p-6 text-left space-y-4">
            <h3 className="font-semibold text-slate-900">What happens next?</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  <strong>Document Review:</strong> Our team will review your credentials and insurance (1-2 business days)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  <strong>Background Check:</strong> We&apos;ll conduct a standard background verification
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  <strong>Approval:</strong> You&apos;ll receive an email notification with next steps
                </span>
              </li>
            </ol>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Mail className="w-4 h-4" />
            <span>Check your email for updates</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/login')}
            >
              Sign in to check status
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Questions?</CardTitle>
          <CardDescription>
            Contact our contractor support team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-slate-600">
            <p className="font-medium">Contractor Support</p>
            <p>Email: contractors@gridelectric.com</p>
            <p>Phone: (555) 123-4567</p>
            <p className="text-slate-400 mt-1">Mon-Fri, 8am-5pm EST</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
