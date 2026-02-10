'use client';

import { cn } from '@/lib/utils';

type StatusVariant = 
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'active'
  | 'inactive'
  | 'pending'
  | 'approved'
  | 'rejected';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<StatusVariant, string> = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  active: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  inactive: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-sm',
};

// Auto-determine variant based on status text
function getVariantFromStatus(status: string): StatusVariant {
  const lowerStatus = status.toLowerCase();
  
  if (lowerStatus.includes('active') || lowerStatus.includes('complete') || lowerStatus.includes('approved')) {
    return 'success';
  }
  if (lowerStatus.includes('pending') || lowerStatus.includes('in progress') || lowerStatus.includes('onboarding')) {
    return 'warning';
  }
  if (lowerStatus.includes('inactive') || lowerStatus.includes('expired') || lowerStatus.includes('rejected')) {
    return 'danger';
  }
  if (lowerStatus.includes('in route') || lowerStatus.includes('on site')) {
    return 'info';
  }
  if (lowerStatus.includes('draft') || lowerStatus.includes('unassigned')) {
    return 'neutral';
  }
  
  return 'default';
}

export function StatusBadge({ 
  status, 
  variant,
  className,
  size = 'md' 
}: StatusBadgeProps) {
  const determinedVariant = variant || getVariantFromStatus(status);
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium capitalize',
        variantStyles[determinedVariant],
        sizeStyles[size],
        className
      )}
    >
      <span className={cn(
        'w-1.5 h-1.5 rounded-full mr-1.5',
        determinedVariant === 'success' && 'bg-green-500',
        determinedVariant === 'warning' && 'bg-yellow-500',
        determinedVariant === 'danger' && 'bg-red-500',
        determinedVariant === 'info' && 'bg-blue-500',
        determinedVariant === 'neutral' && 'bg-slate-400',
        determinedVariant === 'default' && 'bg-slate-400',
      )} />
      {status}
    </span>
  );
}
