'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOnboarding } from '@/components/providers/OnboardingProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowRight, Save } from 'lucide-react';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { data, updateData, nextStep, saveDraft } = useOnboarding();
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
    },
  });

  const onSubmit = async (formData: PersonalInfoData) => {
    setIsSubmitting(true);
    try {
      updateData(formData);
      await saveDraft();
      nextStep();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveDraft();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-700 font-medium">
            First Name <span className="text-[#cf2e2e]">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            className="h-11 border-gray-200 focus:border-[#2ea3f2] focus:ring-[#2ea3f2]/20"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="text-sm text-[#cf2e2e] flex items-center gap-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-700 font-medium">
            Last Name <span className="text-[#cf2e2e]">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Smith"
            className="h-11 border-gray-200 focus:border-[#2ea3f2] focus:ring-[#2ea3f2]/20"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="text-sm text-[#cf2e2e]">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Email Address <span className="text-[#cf2e2e]">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john.smith@example.com"
          className="h-11 border-gray-200 focus:border-[#2ea3f2] focus:ring-[#2ea3f2]/20"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-[#cf2e2e]">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700 font-medium">
          Phone Number <span className="text-[#cf2e2e]">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(555) 123-4567"
          className="h-11 border-gray-200 focus:border-[#2ea3f2] focus:ring-[#2ea3f2]/20"
          {...register('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-[#cf2e2e]">{errors.phone.message}</p>
        )}
      </div>

      {/* Info Alert */}
      <Alert className="bg-blue-50 border-blue-100">
        <AlertDescription className="text-sm text-gray-600">
          This information will be used for your 1099 tax documents and cannot be changed after submission without contacting support.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto h-11 px-6 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          onClick={handleSaveDraft}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </>
          )}
        </Button>
        <Button
          type="submit"
          className="w-full sm:w-auto sm:ml-auto h-11 px-6 bg-gradient-to-r from-[#002168] to-[#2ea3f2] hover:from-[#001545] hover:to-[#1a8fd9] shadow-md shadow-blue-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Continuing...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
