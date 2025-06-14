'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import * as React from 'react';
import ToggleThemeCard from '@/components/toggle-theme-card';

function Page() {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Appearance Settings</CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose your preferred theme to personalize your experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <ToggleThemeCard />
      </CardContent>

      {/* <CardFooter className="border-t p-4 flex items-center justify-end">
        <Button type="submit" size="sm">
          Submit
        </Button>
      </CardFooter> */}
    </Card>
  );
}

export default Page;
