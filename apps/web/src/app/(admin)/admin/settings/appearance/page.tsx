'use client';
import { Button } from '@invoice/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <ToggleThemeCard />
      </CardContent>

      <CardFooter className="border-t p-4 flex items-center justify-end">
        <Button type="submit" size="sm">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Page;
