'use client';
//HOOK, SERVER
import useTable from '../hooks/useTable';
//RELATIVE MODULES
import Table from './Table';
import { TableProvider } from '../contexts/TableContext';

function DeliveryHistory() {
  const { table } = useTable();
  return (
    <div className="grid gap-4">
      <h3 className="text-18 text-blu-400 md:text-24">Delivery history</h3>
      <TableProvider table={table}>
        <Table />
      </TableProvider>
    </div>
  );
}

export default DeliveryHistory;
