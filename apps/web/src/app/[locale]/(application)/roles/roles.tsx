'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { useTRPC } from '@/utils/trpc';
import { Button } from '@invoice/ui/button';
import DataTable from '@/components/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddRoleForm from '@/modules/roles/addRole.form';
import UpdateRoleForm from '@/modules/roles/updateRole.form';
import { useRouter } from '@/i18n/navigation';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { StatusEnumType } from '@/interfaces/IStatus';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { IRoles } from '@/interfaces/IRole';
import { getColumns } from './columns';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';

function RolesPage() {
  const { hasPermission } = useRolePermission();
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const router = useRouter();
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [defaultData, setDefaultData] = useState({});

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: roles } = useQuery(
    trpc.roles.tenantRoles.queryOptions({
      page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
      status: status == '' ? null : (status as StatusEnumType),
    })
  );

  const handleEditClick = (data: IRoles) => {
    setDefaultData(data);
    setOpenEditSheet(true);
  };

  function RowActions({ row }: { row: Row<IRoles> }) {
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
            `${ApplicationModules.role}:${ModuleOperations.update}`
          ) ? (
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleEditClick(row.original)}>
                <span>Edit</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          ) : null}
          <DropdownMenuSeparator />
          {hasPermission(
            `${ApplicationModules.permission}:${ModuleOperations.list}`
          ) ? (
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push(`/roles/${row.original.id}`)}
              >
                <span>Permissions</span>
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
        <PageTitle className="md:text-2xl">User Roles</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={roles ?? listQueryOpts}
          actions={
            hasPermission(
              `${ApplicationModules.role}:${ModuleOperations.create}`
            ) ? (
              <AddRoleForm />
            ) : null
          }
        />
      </PageContent>

      {/* edit form sheet */}
      {openEditSheet && (
        <UpdateRoleForm
          openEditSheet={openEditSheet}
          setOpenEditSheet={setOpenEditSheet}
          defaultData={defaultData}
        />
      )}
    </PageContainer>
  );
}

export default RolesPage;
