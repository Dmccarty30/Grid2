'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Shield, Clock, DollarSign } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-3xl">G</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome to Grid Electric
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
            Join our network of damage assessment professionals
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Competitive Pay</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Earn $75-125/hour based on work type
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Flexible Schedule</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Choose assignments that fit your availability
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Insurance Coverage</h3>
                <p className="text-sm text-slate-500 mt-1">
                  We verify all contractors are properly insured
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Quick Onboarding</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Get approved and start working within 48 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What to Expect */}
      <Card>
        <CardHeader>
          <CardTitle>What to expect</CardTitle>
          <CardDescription>
            The onboarding process takes about 15-20 minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">
                1
              </span>
              <span className="text-slate-700">Personal and business information</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">
                2
              </span>
              <span className="text-slate-700">Insurance certificate uploads</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">
                3
              </span>
              <span className="text-slate-700">Professional credentials and licenses</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">
                4
              </span>
              <span className="text-slate-700">Banking information for direct deposit</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium flex items-center justify-center">
                5
              </span>
              <span className="text-slate-700">Safety training video and quiz</span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg" 
          className="w-full"
          onClick={() => router.push('/onboarding/personal-info')}
        >
          Get Started
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full"
          onClick={() => router.push('/login')}
        >
          Already have an account? Sign in
        </Button>
      </div>
    </div>
  );
}
