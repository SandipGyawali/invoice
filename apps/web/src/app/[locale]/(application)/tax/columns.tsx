'use client';
import { ITax } from '@/interfaces/ITax';
import { Badge } from '@invoice/ui/badge';
import { cn } from '@invoice/ui/lib/utils';
import { ColumnDef, Row } from '@tanstack/react-table';
import React from 'react';

export function getColumns(
  rowActions?: ({ row }: { row: Row<ITax> }) => React.ReactNode
): ColumnDef<ITax>[] {
  return [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => row.getValue('name'),
      enableHiding: false,
    },
    {
      header: 'Rate (%)',
      accessorKey: 'rate',
      cell: ({ row }) => row.getValue('rate'),
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
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return rowActions ? rowActions({ row }) : null;
      },
      enableHiding: false,
    },
  ];
}
