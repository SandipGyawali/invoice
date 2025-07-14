'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { useTRPC } from '@/utils/trpc';
import { Badge } from '@invoice/ui/badge';
import { Button } from '@invoice/ui/button';
import DataTable from '@invoice/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { cn } from '@invoice/ui/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisIcon, PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';

const AddTax = dynamic(() => import('@/modules/tax/AddTax'));

function Page() {
  const trpc = useTRPC();

  const { data: listTax } = useQuery(trpc.tax.listTax.queryOptions());

  const handleEditClick = (data) => {
    // setDefaultData(data);
    // setOpenEditSheet(true);
  };

  function RowActions() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-start">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none"
              aria-label="Edit item"
            >
              <EllipsisIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => handleEditClick(row.original)}
            >
              <span>Edit</span>
              <PenBox />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const columns: ColumnDef<any>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => row.getValue('name'),
      enableHiding: false,
    },
    {
      header: 'Rate (%)',
      accessorKey: 'rate',
      cell: ({ row }) => row.getValue('rate'),
      enableHiding: false,
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
      cell: ({ row }) => <RowActions row={row} />,
      enableHiding: false,
    },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Taxes</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={listTax ?? []}
          actions={<AddTax />}
        />
      </PageContent>

      {/* edit client section */}
    </PageContainer>
  );
}

export default Page;
