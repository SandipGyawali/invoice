import { ProjectStatusBadge, StatusBadge } from '@/components/status-badge';
import { IProject } from '@/interfaces/IProjects';
import { formatDate } from '@/utils/formatDate';
import { ColumnDef, Row } from '@tanstack/react-table';
import React from 'react';

export function getColumns(
  rowActions?: ({ row }: { row: Row<IProject> }) => React.ReactNode
): ColumnDef<IProject>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      enableHiding: false,
      enableGlobalFilter: false,
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'createdAt',
      header: 'CreatedAt',
      enableHiding: true,
      enableSorting: true,
      enableGlobalFilter: false,
      cell: ({ row }) => formatDate(row.getValue('createdAt') ?? ''),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      enableGlobalFilter: false,
      cell: ({ row }) => <StatusBadge row={row} />,
    },
    {
      accessorKey: 'pStatus',
      header: 'Project Status',
      enableHiding: true,
      enableSorting: true,
      enableGlobalFilter: false,
      cell: ({ row }) => <ProjectStatusBadge row={row} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return rowActions ? rowActions({ row }) : null;
      },
      size: 60,
      enableGlobalFilter: false,
      enableHiding: false,
    },
  ];
}
