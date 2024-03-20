'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import T from '_@shared/components/table/TableBuilder';
import Pagination from '_@landing/components/Pagination';
import Switch from '_@shared/components/conditions/Switch';
//HOOK, SERVER
import useTable from '../hooks/useTable';
//RELATIVE MODULES
import NoData from './NoData';

function Table() {
  const {
    table,
    metadata: { totalItems },
  } = useTable();

  return (
    <T.Root tableInstance={table}>
      <T.Table className="w-full">
        <T.Head
          className={classcat([
            'ow:border-blu-50 ow:[&>tr>th]:border-none',
            'ow:[&>tr>th]:px-0 ow:[&>tr>th]:pb-4 ow:[&>tr>th]:pt-0',
            'ow:hover:[&>tr]:bg-transparent',
          ])}
        />
        <Switch.Root>
          <Switch.Case when={!table.getRowModel().rows.length}>
            <NoData colSpan={table.getAllColumns().length} />
          </Switch.Case>
          <Switch.Case when={true}>
            <T.TBody
              className={classcat([
                'ow:border-none ow:[&>tr>td]:border-x-0 ow:[&>tr>td]:border-b ow:[&>tr>td]:border-t-0',
                'ow:[&>tr>td]:h-14',
                'ow:hover:[&>tr]:bg-transparent',
              ])}
            />
          </Switch.Case>
        </Switch.Root>
      </T.Table>
      <Show when={table.getRowModel().rows.length > 0}>
        <div className="flex justify-end pt-6">
          <Pagination perPage={5} totalItems={totalItems} />
        </div>
      </Show>
    </T.Root>
  );
}

export default Table;
