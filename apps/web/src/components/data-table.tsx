'use client';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  Columns3Icon,
  FilterIcon,
  ListFilterIcon,
  TrashIcon,
} from 'lucide-react';
import { cn } from '@invoice/ui/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@invoice/ui/alert-dialog';
import { Button } from '@invoice/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@invoice/ui/dropdown-menu';
import { Input } from '@invoice/ui/input';
import { Label } from '@invoice/ui/label';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@invoice/ui/pagination';
import { Popover, PopoverContent, PopoverTrigger } from '@invoice/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@invoice/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@invoice/ui/table';
import { Checkbox } from '@invoice/ui/checkbox';
import {
  getInitialPaginationFromURL,
  getInitialSearchFromURL,
} from '@/utils/params';

type Item = {
  id: string;
  name: string;
  email: string;
  location: string;
  flag: string;
  status: 'Active' | 'Inactive' | 'Pending';
  balance: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: {
    data: TData[];
    total: number;
    page: number;
    pageSize: number;
  };
  actions?: React.ReactNode;
}

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  actions,
}: DataTableProps<TData, TValue>) {
  const id = useId();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [pagination, setPagination] = useState<PaginationState>(
    getInitialPaginationFromURL()
  );
  const [globalFilter, setGlobalFilter] = React.useState<string>(
    getInitialSearchFromURL()
  );
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  // pagination params filter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', pagination.pageIndex.toString());
    params.set('pageSize', pagination.pageSize.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    if (typeof window !== undefined) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [pagination]);

  // search params filter
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      params.set('search', globalFilter);
      const newUrl = `${window.location.pathname}?${params.toString()}`;

      if (typeof window !== undefined) {
        window.history.replaceState(null, '', newUrl);
      }
    }, 300); // optional debounce

    return () => clearTimeout(handler);
  }, [globalFilter]);

  // handle delete rows
  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data?.data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    );
    // setData(updatedData);
    table.resetRowSelection();
  };

  const table = useReactTable({
    data: data?.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    manualPagination: true,
    pageCount: Math.ceil(data.total / data.pageSize),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      globalFilter,
      columnVisibility,
    },
  });

  // status params filter
  useEffect(() => {
    const filterValue = table.getColumn('status')?.getFilterValue() as
      | string[]
      | undefined;

    const params = new URLSearchParams(window.location.search);
    // for initial status value by default
    // const currentStatus = params.get('status');
    // if (!currentStatus) {
    //   params.set('status', '');
    //   const newUrl = `${window.location.pathname}?${params.toString()}`;
    //   if (typeof window != undefined) {
    //     window.history.replaceState(null, '', newUrl);
    //   }
    //   return;
    // }

    if (filterValue && filterValue.length > 0) {
      params.set('status', filterValue.join(','));
    } else {
      params.delete('status');
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    if (typeof window != undefined) {
      window.history.replaceState(null, '', newUrl);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getColumn('status')?.getFilterValue()]);

  // Get counts for each status
  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn('status');
    if (!statusColumn) return new Map();
    return statusColumn.getFacetedUniqueValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getColumn('status')?.getFacetedUniqueValues()]);

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn('status')?.getFilterValue() as string[];
    return filterValue ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getColumn('status')?.getFilterValue()]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const currentValue = table.getColumn('status')?.getFilterValue() as
      | string[]
      | undefined;

    if (checked) {
      // Replace any existing value with the new one
      table.getColumn('status')?.setFilterValue([value]);
    } else {
      // If the same one is unchecked, clear the filter
      if (currentValue?.includes(value)) {
        table.getColumn('status')?.setFilterValue(undefined);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filter by name or email */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className="min-w-60 ps-9 peer"
              value={table.getState().globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Filter by Searching..."
              type="text"
            />

            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
          </div>
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <FilterIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Status
                {selectedStatuses.length > 0 && (
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3" align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">
                  Filters
                </div>
                <div className="space-y-3">
                  <div className="space-y-3">
                    {/* Active */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-active`}
                        checked={selectedStatuses.includes('1')}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, '1')
                        }
                      />
                      <Label
                        htmlFor={`${id}-active`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        Active
                        <span className="text-muted-foreground ms-2 text-xs">
                          {statusCounts.get('1') ?? 0}
                        </span>
                      </Label>
                    </div>

                    {/* Inactive */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-inactive`}
                        checked={selectedStatuses.includes('0')}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, '0')
                        }
                      />
                      <Label
                        htmlFor={`${id}-inactive`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        Inactive
                        <span className="text-muted-foreground ms-2 text-xs">
                          {statusCounts.get('0') ?? 0}
                        </span>
                      </Label>
                    </div>

                    {/* Clear Button */}
                    {selectedStatuses.length > 0 && (
                      <div className="pt-2">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="text-xs text-foreground"
                          onClick={() =>
                            table.getColumn('status')?.setFilterValue(undefined)
                          }
                        >
                          Clear Status Filter
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Toggle columns visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                      }}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <TrashIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Delete
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{' '}
                      {table.getSelectedRowModel().rows.length} selected{' '}
                      {table.getSelectedRowModel().rows.length === 1
                        ? 'row'
                        : 'rows'}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* table action button for top */}
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="bg-background dark:bg-muted/30 overflow-hidden rounded-lg border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              'flex h-full cursor-pointer items-center justify-start gap-2 select-none'
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-8">
        {/* Results per page */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">
            Rows per page
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Page number information */}
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-muted-foreground text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-foreground">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{' '}
            of{' '}
            <span className="text-foreground">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Pagination buttons */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* First page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to first page"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Previous page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Next page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Last page button */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to last page"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
