'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { StatusEnumType } from '@/interfaces/IStatus';
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
import { IProductCategory } from '@/interfaces/IProductCategory';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';

const AddProductCategory = dynamic(
  () => import('@/modules/product/AddProductCategory')
);
const UpdateProductCategory = dynamic(
  () => import('@/modules/product/UpdateProductCategory')
);

function ProductCategories() {
  const { hasPermission } = useRolePermission();
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState<Partial<IProductCategory>>({});

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: productCategoryList, refetch: refetchProductCategory } =
    useQuery(
      trpc.productCategory.listCategory.queryOptions({
        page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
        pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
        search: search ?? '',
        status: status == '' ? null : (status as StatusEnumType),
      })
    );

  const handleEditClick = (data: IProductCategory) => {
    setDefaultData(data);
    setOpenEditSheet(true);
  };

  function RowActions({ row }: { row: Row<IProductCategory> }) {
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
          {hasPermission(
            `${ApplicationModules.productCategory}:${ModuleOperations.update}`
          ) ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={() => handleEditClick(row.original)}
              >
                <span>Edit</span>
                <PenBox />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : null}
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
          actions={
            hasPermission(
              `${ApplicationModules.productCategory}:${ModuleOperations.create}`
            ) ? (
              <AddProductCategory refetch={refetchProductCategory} />
            ) : null
          }
        />
      </PageContent>

      {/* update product-category */}
      {openEditSheet && (
        <UpdateProductCategory
          defaultData={defaultData}
          openEditSheet={openEditSheet}
          setOpenEditSheet={() => setOpenEditSheet(false)}
          refetch={() => refetchProductCategory()}
        />
      )}
    </PageContainer>
  );
}

export default ProductCategories;
