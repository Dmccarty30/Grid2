'use client';

import { useState } from 'react';
import { useOnboarding } from '@/components/providers/OnboardingProvider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, File, X } from 'lucide-react';

interface InsuranceFile {
  file: File;
  coverage?: string;
  expirationDate?: string;
}

export function InsuranceUploadForm() {
  const { data, updateData, nextStep, prevStep, saveDraft } = useOnboarding();
  const [files, setFiles] = useState<{
    generalLiability?: InsuranceFile;
    workersComp?: InsuranceFile;
    autoInsurance?: InsuranceFile;
    umbrella?: InsuranceFile;
  }>(data.insuranceFiles || {});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (
    type: keyof typeof files,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [type]: { file, ...(prev[type] || {}) },
      }));
    }
  };

  const handleRemoveFile = (type: keyof typeof files) => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[type];
      return newFiles;
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      updateData({ insuranceFiles: files });
      await saveDraft();
      nextStep();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      updateData({ insuranceFiles: files });
      await saveDraft();
    } finally {
      setIsSaving(false);
    }
  };

  const renderFileUpload = (
    type: keyof typeof files,
    label: string,
    required: boolean
  ) => {
    const fileData = files[type];

    return (
      <div className="space-y-2">
        <Label>
          {label} {required && '*'}
        </Label>
        {fileData ? (
          <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
            <File className="w-5 h-5 text-blue-600" />
            <span className="flex-1 text-sm truncate">{fileData.file.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveFile(type)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="relative">
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(type, e)}
              className="cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-50 border rounded-md">
              <div className="flex items-center gap-2 text-slate-500">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload {label}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const isValid = files.generalLiability && files.workersComp && files.autoInsurance;

  return (
    <div className="space-y-6">
      {renderFileUpload('generalLiability', 'General Liability', true)}
      {renderFileUpload('workersComp', 'Workers Compensation', true)}
      {renderFileUpload('autoInsurance', 'Auto Insurance', true)}
      {renderFileUpload('umbrella', 'Umbrella (optional)', false)}

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
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
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
