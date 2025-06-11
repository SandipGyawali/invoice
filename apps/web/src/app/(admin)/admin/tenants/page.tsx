'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ROUTES } from '@/enums/route.enum';
import { useTRPC } from '@/utils/trpc';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const trpc = useTRPC();
  const { data: tenantList } = useQuery(trpc.tenant.listTenant.queryOptions());
  console.log(tenantList);

  return (
    <div className="max-w-full p-2 sm:py-4 lg:px-6">
      <Card className="border-none shadow-none max-w-full">
        <CardHeader className="w-full flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-xl">Tenant List</CardTitle>
            <CardDescription>My companies tenant lists</CardDescription>
          </div>

          <div className="w-fit">
            <Button size="sm" onClick={() => router.push(ROUTES.tenants.add)}>
              <Plus />
              New
            </Button>
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="border rounded-lg overflow-hidden">
            {tenantList?.data?.map((val) => (
              <div
                className="group border flex w-full max-w-full items-center justify-between overflow-hidden px-4 py-4 sm:px-6"
                key={val.id}
              >
                <p>{val.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
