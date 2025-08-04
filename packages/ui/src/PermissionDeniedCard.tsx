import { Card, CardContent, CardHeader, CardTitle } from './card';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './button';

function PermissionDeniedCard() {
  const router = useRouter();

  return (
    <Card className="max-w-3xl mx-5 mx-auto mt-24 shadow-sm border border-red-300 bg-red-500/5 dark:bg-red-500/10">
      <CardHeader className="flex items-center gap-3 text-red-700 dark:text-red-300">
        <ShieldAlert className="h-10 w-10" />
        <CardTitle className="text-2xl font-bold tracking-tight dark:text-white">
          Access Denied
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground">
          You don’t have permission to view this page. Reach out to your admin
          if this seems wrong.
        </p>

        <div className="pt-4 mx-auto w-full">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { PermissionDeniedCard };
