'use client';
import { Button } from '@invoice/ui/button';
import { ROUTES } from '@/enums/route.enum';
import { TenantForm } from '@/modules/tenants/tenent.form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  return (
    <>
      <div className="max-w-full w-full lg:max-w-3xl mx-auto  space-y-3 p-2 sm:py-4 lg:px-6">
        <Button
          className="w-fit"
          variant="ghost"
          onClick={() => {
            router.replace(ROUTES.tenants.list);
          }}
        >
          <ArrowLeft />
          Back
        </Button>

        <TenantForm />
      </div>
    </>
  );
}

export default Page;
