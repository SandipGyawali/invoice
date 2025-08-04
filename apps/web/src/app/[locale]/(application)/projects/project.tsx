'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-layout';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import { IProject } from '@/interfaces/IProjects';
import { StatusEnumType } from '@/interfaces/IStatus';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { useTRPC } from '@/utils/trpc';
import {
  ApplicationModules,
  ModuleOperations,
} from '@invoice/enums/routeModule.enum';
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
import { EllipsisIcon, Eye, PenBox, PlusIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { getColumns } from './columns';
import { useTranslations } from 'next-intl';

function Project() {
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const router = useRouter();
  const t = useTranslations('Project');
  const { hasPermission } = useRolePermission();

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');
  const status = searchParams.get('status');

  const { data: projectList, isLoading: isProjectLoading } = useQuery(
    trpc.project.listProjects.queryOptions({
      page: page ? Number(page) + 1 : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
      status: status == '' ? null : (status as StatusEnumType),
    })
  );

  const handleEditClick = (data) => {
    // setDefaultData(data);
    // setOpenEditSheet(true);
  };

  function RowActions({ row }: { row: Row<IProject> }) {
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
            {hasPermission(
              `${ApplicationModules.project}:${ModuleOperations.update}`
            ) && (
              <DropdownMenuItem
                className="flex justify-between"
                onClick={() => handleEditClick(row.original)}
              >
                <span>Edit</span>
                <PenBox />
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {hasPermission(
              `${ApplicationModules.project}:${ModuleOperations.view}`
            ) && (
              <DropdownMenuItem
                className="flex justify-between"
                onClick={() => router.push(`/projects/${row.original.id}`)}
              >
                <span>View</span>
                <Eye />
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // table columns
  const columns = useMemo(() => getColumns(RowActions), []);

  console.log(projectList);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">{t('projects')} </PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          data={projectList ?? listQueryOpts}
          actions={
            <Button onClick={() => router.push('/projects/add')}>
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

export default Project;
