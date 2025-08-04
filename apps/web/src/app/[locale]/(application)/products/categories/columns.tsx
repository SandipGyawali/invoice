import { StatusBadge } from '@/components/status-badge';
import { ColumnDef, Row } from '@tanstack/react-table';
import React from 'react';

export function getColumns(
  rowActions?: ({ row }: { row: Row<any> }) => React.ReactNode
): ColumnDef<any>[] {
  return [
    {
      accessorKey: 'catName',
      header: 'Name',
      cell: ({ row }) => row.getValue('catName'),
      enableSorting: true,
      enableHiding: true,
      enableGlobalFilter: false,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge row={row} />,
      enableGlobalFilter: false,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (rowActions ? rowActions({ row }) : null),
      size: 60,
      enableHiding: false,
      enableGlobalFilter: false,
    },
  ];
}
