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
import { EllipsisIcon, PenBox, PlusIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { StatusEnumType } from '@/interfaces/IStatus';
import { useMemo } from 'react';
import { getColumns } from './columns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import { Row } from '@tanstack/react-table';
import { useRouter } from '@/i18n/navigation';

function Products() {
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const router = useRouter();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  // const [defaultData, setDefaultData] = useState<Partial<any>>({});
  // const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);

  const { data: productList } = useQuery(
    trpc.product.listProduct.queryOptions({
      page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
      status: status == '' ? null : (status as StatusEnumType),
    })
  );

  const columns = useMemo(() => getColumns(RowActions), []);

  function RowActions({ row }: { row: Row<any> }) {
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
          {/* {hasPermission(
            `${ApplicationModules.tax}:${ModuleOperations.update}`
          ) ? ( */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => router.push(`/products/edit/${row.original.id}`)}
            >
              <span>Edit</span>
              <PenBox />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {/* ) : null} */}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Products</PageTitle>
      </PageHeader>
      <PageContent className="max-w-7xl overflow-x-auto">
        <DataTable
          columns={columns}
          data={productList ?? listQueryOpts}
          actions={
            <Button size="sm" onClick={() => router.push(ROUTES.addProduct)}>
              <PlusIcon />
              Add
            </Button>
          }
        />
      </PageContent>

      {/* edit client section */}
      {/* <UpdateProductForm
        defaultValue={defaultData}
        handleCloseSheet={() => {
          setDefaultData({});
          setOpenEditSheet(false);
        }}
        state={openEditSheet}
        refetchTaxList={() => {}}
      /> */}
    </PageContainer>
  );
}

export default Products;
