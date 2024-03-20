//HOOK, SERVER
import useTable from '../hooks/useTable';
//RELATIVE MODULES
import { TableProvider } from '../context/TableContext';
import MealPlanHistoryTable from './MealPlanHistoryTable';

function MealPlanPurchaseHistory() {
  const { table } = useTable();
  return (
    <TableProvider table={table}>
      <MealPlanHistoryTable />
    </TableProvider>
  );
}

export default MealPlanPurchaseHistory;
