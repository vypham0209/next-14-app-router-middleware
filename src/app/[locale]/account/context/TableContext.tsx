//THIRD PARTY MODULES
import { Table } from '@tanstack/react-table';
import { PropsWithChildren, createContext, useContext } from 'react';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';

type TData = RouterOutputs['mealPlan']['getMealPlanOrderList']['data'][number];

const TableContext = createContext<Table<TData>>({} as Table<TData>);

export const useTableContext = () => useContext(TableContext);

export function TableProvider({ children, table }: PropsWithChildren<{ table: Table<TData> }>) {
  return <TableContext.Provider value={table}>{children}</TableContext.Provider>;
}
