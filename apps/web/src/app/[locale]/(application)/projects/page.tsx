'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { ProjectStatusBadge, StatusBadge } from '@/components/status-badge';
import { ROUTES } from '@/enums/route.enum';
import { formatDate } from '@/utils/formatDate';
import { useTRPC } from '@/utils/trpc';
import { Button } from '@invoice/ui/button';
import DataTable from '@invoice/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, Row } from '@tanstack/react-table';
import { EllipsisIcon, Eye, PenBox, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Page() {
  const trpc = useTRPC();
  const router = useRouter();

  const { data: projectList } = useQuery(
    trpc.project.listProjects.queryOptions()
  );

  const handleEditClick = (data) => {
    // setDefaultData(data);
    // setOpenEditSheet(true);
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
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex justify-between"
              onClick={() => router.push(`/projects/${row.original.id}`)}
            >
              <span>View</span>
              <Eye />
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
      enableHiding: false,
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'createdAt',
      header: 'CreatedAt',
      enableHiding: true,
      enableSorting: true,
      cell: ({ row }) => formatDate(row.getValue('createdAt') ?? ''),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge row={row} />,
    },
    {
      accessorKey: 'pStatus',
      header: 'Project Status',
      enableHiding: true,
      enableSorting: true,
      cell: ({ row }) => <ProjectStatusBadge row={row} />,
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
        <PageTitle className="md:text-2xl">Projects</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={projectList ?? []}
          actions={
            <Button onClick={() => router.push(ROUTES.addProduct)}>
              <PlusIcon />
              Add
            </Button>
          }
        />
      </PageContent>

      {/* edit client section */}
    </PageContainer>
  );
}

export default Page;
