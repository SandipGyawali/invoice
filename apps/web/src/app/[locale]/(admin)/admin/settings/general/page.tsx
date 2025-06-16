'use client';
import LocaleSwitcher from '@/components/locale-switcher';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';

function General() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Language</CardTitle>
        <CardDescription>Choose your preferred language</CardDescription>
      </CardHeader>
      <CardContent>
        <LocaleSwitcher />
      </CardContent>
    </Card>
  );
}

export default General;
