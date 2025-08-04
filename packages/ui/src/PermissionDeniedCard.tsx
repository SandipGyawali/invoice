'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@invoice/ui/card';
import { Button } from '@invoice/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

export function AccessDeniedCard() {
  return (
    <Card className="w-full max-w-md mx-auto mt-20 border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200 shadow-sm">
      <CardHeader className="flex flex-col items-center text-center">
        <AlertTriangle className="w-12 h-12 mb-2 text-red-500 dark:text-red-300" />
        <CardTitle className="text-xl font-bold">Access Denied</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm">
          You do not have the necessary permissions to view this page or perform
          this action.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center gap-3">
        <Button
          variant="destructive"
          onClick={() => {
            if (typeof window !== undefined) {
              window.location.href = '/dashboard';
            }
          }}
        >
          <Home />
          Home
        </Button>
      </CardFooter>
    </Card>
  );
}
