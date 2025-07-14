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
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const trpc = useTRPC();
  const router = useRouter();

  const { data: productList } = useQuery(
    trpc.product.listProduct.queryOptions()
  );

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'pName',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('pName'),
    },
    {
      accessorKey: 'sku',
      header: 'Quantity',
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: 'pPrice',
      header: 'Purchase Price',
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: 'sPrice',
      header: 'Selling Price',
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
    // {
    //   id: 'actions',
    //   header: 'Actions',
    //   cell: ({ row }) => <RowActions row={row} />,
    //   size: 60,
    //   enableHiding: false,
    // },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Products</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={productList ?? []}
          actions={
            <Button onClick={() => router.push(ROUTES.addProduct)}>
              <PlusIcon />
              Add
            </Button>
          }
        />
      </PageContent>

      {/* edit client section */}
    </PageContainer>
  );
}

export default Page;
