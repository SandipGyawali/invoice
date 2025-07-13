'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import UpdateProductCategory from '@/modules/product/UpdateProductCategory';
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
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddProductCategory = dynamic(
  () => import('@/modules/product/AddProductCategory')
);

function Page() {
  const trpc = useTRPC();
  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState({});

  const { data: productCategoryList, refetch } = useQuery(
    trpc.productCategory.listCategory.queryOptions()
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
      accessorKey: 'catName',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('catName'),
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
        <PageTitle className="md:text-2xl">Product Categories</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={productCategoryList ?? []}
          actions={<AddProductCategory />}
        />
      </PageContent>

      {openEditSheet && (
        <UpdateProductCategory
          defaultData={defaultData}
          openEditSheet={openEditSheet}
          setOpenEditSheet={() => setOpenEditSheet(false)}
          refetch={() => refetch()}
        />
      )}
    </PageContainer>
  );
}

export default Page;
