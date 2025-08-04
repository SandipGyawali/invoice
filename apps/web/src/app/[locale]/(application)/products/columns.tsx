import { StatusBadge } from '@/components/status-badge';
import { ColumnDef, Row } from '@tanstack/react-table';

export function getColumns(
  rowActions?: ({ row }: { row: Row<any> }) => React.ReactNode
): ColumnDef<any>[] {
  return [
    {
      accessorKey: 'pName',
      header: 'Name',
      enableSorting: true,
      enableHiding: true,
      cell: ({ row }) => row.getValue('pName'),
    },
    {
      accessorKey: 'sku',
      header: 'Quantity',
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: 'pPrice',
      header: 'Purchase Price',
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: 'sPrice',
      header: 'Selling Price',
      enableHiding: true,
      enableSorting: true,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge row={row} />,
    },
    // {
    //   id: 'actions',
    //   header: 'Actions',
    //   cell: ({ row }) => <RowActions row={row} />,
    //   size: 60,
    //   enableHiding: false,
    // },
  ];
}
