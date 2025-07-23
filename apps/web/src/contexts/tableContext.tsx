// table-context.tsx
import React, { createContext, useContext } from 'react';
import { type Table } from '@tanstack/react-table';

export const TableContext = createContext<Table<unknown> | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context)
    throw new Error('useTableContext must be used within a TableProvider');
  return context;
};

export function TableContextProvider({
  table,
  children,
}: {
  table: Table<unknown>;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={table}>{children}</TableContext.Provider>
  );
}
