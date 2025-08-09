'use client';
import React, { ReactNode, SetStateAction } from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@invoice/ui/alert';
import { cn } from '@invoice/ui/lib/utils';

interface InfoAlertProps {
  title?: string;
  description: ReactNode;
  className?: string;
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

export function InfoAlert({
  title = 'Information',
  description = 'description',
  className,
  show,
}: InfoAlertProps) {
  return (
    <div className={cn('block mb-3 -mt-3', className)}>
      {show && (
        <Alert
          variant="default"
          className="dark:border-t-muted-foreground/40 dark:border-b-muted-foreground/40 border-l border-l-5 border-l-primary border-r border-r-5 border-r-primary rounded-xl"
        >
          <AlertCircleIcon />
          <AlertTitle className="">{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
