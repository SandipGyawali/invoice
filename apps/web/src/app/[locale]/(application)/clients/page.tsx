'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { ROUTES } from '@/enums/route.enum';
import { useTRPC } from '@/utils/trpc';
import { Button } from '@invoice/ui/button';
import DataTable from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getColumns } from './columns';
import { useMemo } from 'react';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { StatusEnumType } from '@/interfaces/IStatus';

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trpc = useTRPC();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: clientList } = useQuery(
    trpc.client.listClient.queryOptions({
      page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
      status: status == '' ? null : (status as StatusEnumType),
    })
  );

  // table columns
  const columns = useMemo(() => getColumns(() => <>hello</>), []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Clients</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={clientList ?? listQueryOpts}
          actions={
            <Button onClick={() => router.push(ROUTES.addClient)}>
              <Plus />
              New Client
            </Button>
          }
        />
      </PageContent>

      {/* edit client section */}
    </PageContainer>
  );
}

export default Page;
