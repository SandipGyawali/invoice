'use client';
import { ROUTES } from '@/enums/route.enum';
import { TenantForm } from '@/modules/tenants/tenent.form';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  return (
    <>
      <div className="pt-2">
        home
      </div>

      <div className="max-w-full p-2 sm:py-4 lg:px-6">
        <TenantForm />
      </div>
    </>
  );
}

export default Page;
