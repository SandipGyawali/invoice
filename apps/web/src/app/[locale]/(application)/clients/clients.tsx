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
import { EllipsisIcon, PenBox, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { getColumns } from './columns';
import { useMemo } from 'react';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { StatusEnumType } from '@/interfaces/IStatus';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import { Row } from '@tanstack/react-table';
import { useRouter } from '@/i18n/navigation';

function Clients() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trpc = useTRPC();
  const { hasPermission } = useRolePermission();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: clientList } = useQuery(
    trpc.client.listClient.queryOptions({
      page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
      status: status == '' ? null : (status as StatusEnumType),
    })
  );

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
          {hasPermission(
            `${ApplicationModules.tax}:${ModuleOperations.update}`
          ) ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={
                  () => {}
                  //  handleEditClick(row.original)
                }
              >
                <span>Edit</span>
                <PenBox />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : null}

          <DropdownMenuSeparator />

          {hasPermission(
            `${ApplicationModules.tax}:${ModuleOperations.view}`
          ) ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex justify-between"
                onClick={() => router.push(`/clients/${row.original.id}`)}
              >
                <span>View</span>
                <PenBox />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // table columns
  const columns = useMemo(() => getColumns(RowActions), []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">Clients</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={clientList ?? listQueryOpts}
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

export default Clients;
