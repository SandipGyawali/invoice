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
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { EllipsisIcon, PenBox } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import type { ITax } from '@/interfaces/ITax';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { useRolePermission } from '@/contexts/rolePermissionContext';
import { ApplicationModules } from '@/enums/routeModule.enum';
import { getColumns } from './columns';
import { useSearchParams } from 'next/navigation';
import { listQueryOpts } from '@/utils/defaultQueryOpts';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@/constants';

const AddTax = dynamic(() => import('@/modules/tax/AddTax'));
const UpdateTax = dynamic(() => import('@/modules/tax/UpdateTax'));

function Page() {
  const searchParams = useSearchParams();
  const rbac = useRolePermission();
  const t = useTranslations('Tax');
  const trpc = useTRPC();
  const [defaultData, setDefaultData] = useState<Partial<ITax>>({});
  const [openEditSheet, setOpenEditSheet] = useState<boolean>(false);

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const search = searchParams.get('search');

  const {
    data: listTax,
    isLoading: isTaxListLoading,
    refetch: refetchList,
  } = useQuery(
    trpc.tax.listTax.queryOptions({
      page: page ? Number(page + 1) : DEFAULT_PAGE_INDEX + 1,
      pageSize: pageSize ? Number(pageSize) : DEFAULT_PAGE_SIZE,
      search: search ?? '',
    })
  );

  const handleEditClick = (data: ITax) => {
    setDefaultData(data);
    setOpenEditSheet(true);
  };

  function RowActions({ row }: { row: Row<ITax> }) {
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
        <DropdownMenuContent align="start">
          {rbac.hasPermission(ApplicationModules.tax) ? (
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

  // table columns
  const columns = useMemo(() => getColumns(RowActions), []);

  if (isTaxListLoading) return <Loader className="w-full h-full" />;

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle className="md:text-2xl">{t('taxes')}</PageTitle>
      </PageHeader>
      <PageContent>
        <DataTable
          columns={columns}
          actions={
            rbac.hasPermission(ApplicationModules.tax) ? (
              <AddTax refetchTaxList={refetchList} />
            ) : null
          }
          data={listTax ?? listQueryOpts}
        />
      </PageContent>

      {/* update tax */}
      <UpdateTax
        defaultValue={defaultData}
        handleCloseSheet={() => {
          setDefaultData({});
          setOpenEditSheet(false);
        }}
        state={openEditSheet}
        refetchTaxList={() => {}}
      />
    </PageContainer>
  );
}

export default Page;
