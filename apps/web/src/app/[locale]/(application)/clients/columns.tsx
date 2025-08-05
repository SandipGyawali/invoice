import { StatusBadge } from '@/components/status-badge';
import { ColumnDef, Row } from '@tanstack/react-table';

export function getColumns(
  rowActions?: ({ row }: { row: Row<any> }) => React.ReactNode
): ColumnDef<any> {
  return [
    {
      accessorKey: 'firstName',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) =>
        `${row.getValue('firstName')} ${row.getValue('lastName') ?? ''}`,
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      enableHiding: true,
      enableSorting: true,
      enableGlobalFilter: false,
    },

    {
      accessorKey: 'country',
      header: 'Country',
      enableHiding: true,
      enableSorting: true,
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue('country')}</span>
      ),
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
      enableHiding: true,
      enableSorting: true,
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
