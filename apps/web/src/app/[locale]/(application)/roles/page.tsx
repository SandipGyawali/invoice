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
import { Checkbox } from '@invoice/ui/checkbox';
import DataTable from '@invoice/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { cn } from '@invoice/ui/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, Row } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import AddRoleForm from '@/modules/roles/addRole.form';
import UpdateRoleForm from '@/modules/roles/updateRole.form';
import { useRouter } from '@/i18n/navigation';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import { ApplicationModules } from '@/enums/routeModule.enum';

type IRoles = {
  id: number;
  name: string;
  tenantId: string;
  createdAt: string;
};

function Page() {
  const trpc = useTRPC();
  const router = useRouter();
  const { permission } = useRolePermission();
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [defaultData, setDefaultData] = useState({});
  const { data: roles } = useQuery(
    trpc.roles.tenantRoles.queryOptions({
      tenantId: 'e1065a8c',
    })
  );

  const availablePermissions = permission.get(ApplicationModules.user);

  if (!availablePermissions) {
    return <>Oops you don't have permission to access this </>;
  }
  console.log(availablePermissions);

  console.log(
    availablePermissions.some((perm) => perm.slug.includes('create'))
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
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleEditClick(row.original)}>
              <span>Edit</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push(`/roles/${row.original.id}`)}
            >
              <span>Permissions</span>
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <span>Delete</span>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const columns: ColumnDef<IRoles>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 28,
        enableSorting: false,
        enableHiding: false,
      },
      {
        header: 'Name',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
        size: 150,
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
        size: 100,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => <RowActions row={row} />,
        size: 60,
        enableHiding: false,
      },
    ],
    []
  );

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">User Roles</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={roles ?? []}
          actions={
            availablePermissions.some((prem) =>
              prem.slug.includes('create')
            ) && <AddRoleForm />
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

export default Page;
