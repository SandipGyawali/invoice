'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { IProductUnit } from '@/interfaces/IProductUnit';
import { StatusEnumType } from '@/interfaces/IStatus';
import AddProductUnit from '@/modules/product/AddProductUnit';
import UpdateProductUnit from '@/modules/product/UpdateProductUnit';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { useTRPC } from '@/utils/trpc';
import { Badge } from '@invoice/ui/badge';
import { Button } from '@invoice/ui/button';
import DataTable from '@/components/data-table';
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
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

function Page() {
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState({});

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: productUnitList, refetch } = useQuery(
    trpc.productUnit.listUnit.queryOptions({
      page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
      status: status == '' ? null : (status as StatusEnumType),
    })
  );

  const handleEditClick = (data) => {
    setDefaultData(data);
    setOpenEditSheet(true);
  };

  function RowActions({ row }: { row: Row<IProductUnit> }) {
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

  const columns: ColumnDef<IProductUnit>[] = [
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
          data={productUnitList ?? listQueryOpts}
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
