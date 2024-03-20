//THIRD PARTY MODULES
import { Table } from '@tanstack/react-table';
import { PropsWithChildren, createContext, useContext } from 'react';

type TData = {
  id: number;
  date: Date;
  status: string;
};

const TableContext = createContext<Table<TData>>({} as Table<TData>);

export const useTableContext = () => useContext(TableContext);

export function TableProvider({ children, table }: PropsWithChildren<{ table: Table<TData> }>) {
  return <TableContext.Provider value={table}>{children}</TableContext.Provider>;
}
