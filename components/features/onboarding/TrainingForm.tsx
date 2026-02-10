'use client';

import { useState, useRef } from 'react';
import { useOnboarding } from '@/components/providers/OnboardingProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Loader2, Play, Pause, CheckCircle } from 'lucide-react';

export function TrainingForm() {
  const { data, updateData, nextStep, prevStep, saveDraft } = useOnboarding();
  const [isWatched, setIsWatched] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate video progress
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
      if (progressPercent >= 95) {
        setIsWatched(true);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      updateData({ trainingCompleted: true });
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
    <div className="space-y-6">
      {/* Video Player Placeholder */}
      <Card className="overflow-hidden">
        <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
          {/* In a real app, this would be an actual video */}
          <video
            ref={videoRef}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => {
              setIsWatched(true);
              setIsPlaying(false);
            }}
            poster="/images/training-poster.jpg"
          >
            <source src="/videos/safety-training.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Overlay */}
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-slate-900" />
              ) : (
                <Play className="w-8 h-8 text-slate-900 ml-1" />
              )}
            </div>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Video Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Training Topics */}
      <Card className="p-4">
        <h4 className="font-medium mb-4">Training Covers:</h4>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Approach distances and safety zones
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            PPE requirements and inspection
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Downed conductor procedures
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Emergency contact protocols
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Photo documentation standards
          </li>
        </ul>
      </Card>

      {/* Acknowledgment */}
      <div
        className={`flex items-start gap-3 p-4 border rounded-lg ${
          isWatched ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        <Checkbox
          id="training-ack"
          checked={acknowledged}
          onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
        />
        <div className="space-y-1">
          <Label htmlFor="training-ack" className="font-medium cursor-pointer">
            I have completed the safety training
          </Label>
          <p className="text-sm text-slate-500">
            I understand the safety protocols and will follow all procedures when
            conducting damage assessments in the field.
          </p>
        </div>
      </div>

      {!isWatched && (
        <p className="text-sm text-amber-600">
          Please watch the entire training video before continuing.
        </p>
      )}

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
          disabled={!isWatched || !acknowledged || isSubmitting}
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
