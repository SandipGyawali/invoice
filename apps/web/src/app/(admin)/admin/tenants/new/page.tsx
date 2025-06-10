'use client';
import { Button } from '@/components/ui/button';
import { TenantForm } from '@/modules/tenants/tenent.form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  return (
    <>
      <Button
        className="w-fit"
        variant="ghost"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
      </Button>

      <div className="max-w-full p-2 sm:py-4 lg:px-6">
        <TenantForm />
      </div>
    </>
  );
}

export default Page;
