'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { StatusEnumType } from '@/interfaces/IStatus';
import UpdateProductCategory from '@/modules/product/UpdateProductCategory';
import { useTRPC } from '@/utils/trpc';
import { Button } from '@invoice/ui/button';
import DataTable from '@/components/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { EllipsisIcon, PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { getColumns } from './columns';

const AddProductCategory = dynamic(
  () => import('@/modules/product/AddProductCategory')
);

function Page() {
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState({});

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: productCategoryList, refetch } = useQuery(
    trpc.productCategory.listCategory.queryOptions({
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

  const columns = useMemo(() => getColumns(RowActions), []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Product Categories</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={productCategoryList ?? listQueryOpts}
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
