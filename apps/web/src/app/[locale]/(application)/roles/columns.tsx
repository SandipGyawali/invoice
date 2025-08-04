import { StatusBadge } from '@/components/status-badge';
import { IRoles } from '@/interfaces/IRole';
import { ColumnDef, Row } from '@tanstack/react-table';
import React from 'react';

export function getColumns(
  rowActions?: ({ row }: { row: Row<IRoles> }) => React.ReactNode
): ColumnDef<IRoles>[] {
  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   size: 28,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
      size: 150,
      enableHiding: false,
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
      cell: ({ row }) => {
        return rowActions ? rowActions({ row }) : null;
      },
      size: 60,
      enableHiding: false,
      enableGlobalFilter: false,
    },
  ];
}
