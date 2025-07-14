'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { ROUTES } from '@/enums/route.enum';
import { useTRPC } from '@/utils/trpc';
import { Badge } from '@invoice/ui/badge';
import { Button } from '@invoice/ui/button';
import DataTable from '@invoice/ui/data-table';
import { cn } from '@invoice/ui/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const trpc = useTRPC();

  const { data: clientList } = useQuery(trpc.client.listClient.queryOptions());

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'firstName',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) =>
        `${row.getValue('firstName')} ${row.getValue('lastName') ?? ''}`,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: 'country',
      header: 'Country',
      enableHiding: true,
      enableSorting: true,
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue('country')}</span>
      ),
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      enableHiding: true,
      enableSorting: true,
    },

    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge
          className={cn(
            row.getValue('status') === 'Inactive' &&
              'bg-destructive text-primary-foreground'
          )}
        >
          {row.getValue('status') == 1 ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      // cell: ({ row }) => <RowActions row={row} />,
      size: 60,
      enableHiding: false,
    },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Clients</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={clientList ?? []}
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
