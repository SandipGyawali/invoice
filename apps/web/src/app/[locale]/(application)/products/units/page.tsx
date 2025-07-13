'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import AddProductUnit from '@/modules/product/AddProductUnit';
import UpdateProductUnit from '@/modules/product/UpdateProductUnit';
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
import { ColumnDef, Row } from '@tanstack/react-table';
import { EllipsisIcon, PenBox } from 'lucide-react';
import { useState } from 'react';

function Page() {
  const trpc = useTRPC();
  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState({});

  const { data: productUnitList, refetch } = useQuery(
    trpc.productUnit.listUnit.queryOptions()
  );

  const handleEditClick = (data) => {
    setDefaultData(data);
    setOpenEditSheet(true);
  };

  function RowActions({ row }: { row: Row<{}> }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-start">
            <Button
              size="icon"
              variant="ghost"
              className="w-full shadow-none"
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
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('name'),
    },
    {
      header: 'Name (Plural)',
      accessorKey: 'namePlural',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('namePlural'),
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
      size: 60,
      enableHiding: false,
    },
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Units</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={productUnitList ?? []}
          actions={<AddProductUnit />}
        />
      </PageContent>

      {/* edit client section */}
      {openEditSheet && (
        <UpdateProductUnit
          defaultData={defaultData}
          openEditSheet={openEditSheet}
          refetch={() => refetch()}
          setOpenEditSheet={() => setOpenEditSheet(false)}
        />
      )}
    </PageContainer>
  );
}

export default Page;
