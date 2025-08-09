import { StatusBadge } from '@/components/status-badge';
import { IProductUnit } from '@/interfaces/IProductUnit';
import { ColumnDef, Row } from '@tanstack/react-table';

export function getColumns(
  rowActions?: ({ row }: { row: Row<IProductUnit> }) => React.ReactNode
): ColumnDef<IProductUnit>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('name'),
    },
    {
      header: 'Name (Plural)',
      accessorKey: 'namePlural',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('namePlural'),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge row={row} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return rowActions ? rowActions({ row }) : null;
      },
      size: 60,
      enableHiding: false,
    },
  ];
}
