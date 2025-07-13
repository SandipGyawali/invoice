'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { ROUTES } from '@/enums/route.enum';
import { Button } from '@invoice/ui/button';
import DataTable from '@invoice/ui/data-table';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Clients</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={[]}
          data={[]}
          actions={
            <Button onClick={() => router.push(ROUTES.addClient)}>Add</Button>
          }
        />
      </PageContent>

      {/* edit client section */}
    </PageContainer>
  );
}

export default Page;
