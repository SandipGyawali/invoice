import { Button } from '@invoice/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@invoice/ui/card';
import { useTranslations } from 'next-intl';

function Page() {
  const t = useTranslations();

  return (
    <div className="mx-auto w-full max-w-7xl">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Danger Zone</CardTitle>
          <CardDescription className="text-muted-foreground">
            Delete your account permanently. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">Delete your account</CardContent>

        <CardFooter className="border-t p-4 flex items-center justify-end">
          <Button type="submit" variant="destructive" size="sm">
            {t('submit')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
