'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useOnboarding } from '@/components/providers/OnboardingProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader2, Plus, X } from 'lucide-react';

const credentialSchema = z.object({
  type: z.string().min(1, 'Credential type is required'),
  name: z.string().min(1, 'Credential name is required'),
  number: z.string().min(1, 'Credential number is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expirationDate: z.string().min(1, 'Expiration date is required'),
});

type CredentialData = z.infer<typeof credentialSchema>;

const COMMON_CREDENTIALS = [
  'Electrical License',
  'OSHA 10-Hour',
  'OSHA 30-Hour',
  'CPR/First Aid',
  'Climber Certification',
  'Bucket Truck Operation',
  'Hot Stick Certification',
  'Confined Space',
  'Other',
];

export function CredentialsForm() {
  const { data, updateData, nextStep, prevStep, saveDraft } = useOnboarding();
  const [credentials, setCredentials] = useState<
    Array<CredentialData & { id: string }>
  >(data.credentials || []);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CredentialData>({
    resolver: zodResolver(credentialSchema),
  });

  const handleAddCredential = (formData: CredentialData) => {
    setCredentials((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
    setIsAdding(false);
    reset();
  };

  const handleRemoveCredential = (id: string) => {
    setCredentials((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    try {
      updateData({ credentials });
      await saveDraft();
      nextStep();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      updateData({ credentials });
      await saveDraft();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* List of added credentials */}
      {credentials.length > 0 && (
        <div className="space-y-3">
          {credentials.map((credential) => (
            <Card key={credential.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{credential.name}</p>
                  <p className="text-sm text-slate-500">
                    #{credential.number} • Expires: {credential.expirationDate}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCredential(credential.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add new credential form */}
      {isAdding ? (
        <Card className="p-4 space-y-4">
          <h4 className="font-medium">Add Credential</h4>
          <form
            onSubmit={handleSubmit(handleAddCredential)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Credential Type</Label>
              <select
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
                {...register('type')}
              >
                <option value="">Select type...</option>
                {COMMON_CREDENTIALS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Credential Name</Label>
              <Input
                placeholder="e.g., Master Electrician License"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>License/Cert Number</Label>
              <Input placeholder="License number" {...register('number')} />
              {errors.number && (
                <p className="text-sm text-red-600">{errors.number.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input type="date" {...register('issueDate')} />
                {errors.issueDate && (
                  <p className="text-sm text-red-600">
                    {errors.issueDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Expiration Date</Label>
                <Input type="date" {...register('expirationDate')} />
                {errors.expirationDate && (
                  <p className="text-sm text-red-600">
                    {errors.expirationDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Credential
        </Button>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleSaveDraft}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Draft'
          )}
        </Button>
        <Button
          type="button"
          className="w-full sm:w-auto sm:ml-auto"
          disabled={credentials.length === 0 || isSubmitting}
          onClick={handleSubmitAll}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Continuing...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
}
