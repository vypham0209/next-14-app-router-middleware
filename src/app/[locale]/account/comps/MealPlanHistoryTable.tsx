'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
import T from '_@shared/components/table/TableBuilder'
import Pagination from '_@landing/components/Pagination'
import ScrollArea from '_@landing/components/ScrollArea'
import Switch from '_@shared/components/conditions/Switch'
//HOOK, SERVER
import useTable from '../hooks/useTable'
//RELATIVE MODULES
import Loading from './Loading'
import NoMealPlan from './NoMealPlan'

function MealPlanHistoryTable() {
  const {
    table,
    isLoading,
    metadata: { totalItems },
    pagination,
    setPagination,
  } = useTable()

  const onChangePagination = (page: number, size: number) => {
    setPagination({
      page,
      size,
    })
  }

  return (
    <Switch.Root>
      <Switch.Case when={isLoading}>
        <Loading />
      </Switch.Case>
      <Switch.Case when={!table.getRowModel().rows.length}>
        <NoMealPlan />
      </Switch.Case>
      <Switch.Case when={true}>
        <div
          className={classcat([
            'w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2))] md:w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2)_-_theme(spacing[68]))]',
            'mt-6 border border-blu-100 p-4',
            'md:mt-0 md:p-6',
          ])}
        >
          <ScrollArea
            owStyle={{
              viewPortClasses: 'ow:mb-0 ow:pb-2',
            }}
          >
            <T.Root tableInstance={table}>
              <T.Table className="w-full min-w-[calc(1448rem/16)] ">
                <T.Head
                  className={classcat([
                    'ow:border-blu-50 ow:bg-transparent ow:[&>tr>th]:border-none',
                    'ow:[&>tr>th]:px-0 ow:[&>tr>th]:pb-4 ow:[&>tr>th]:pt-0',
                    'ow:hover:[&>tr]:bg-transparent',
                  ])}
                />
                <T.TBody
                  className={classcat([
                    'ow:border-none ow:[&>tr>td]:border-x-0 ow:[&>tr>td]:border-b ow:[&>tr>td]:border-t-0',
                    'ow:[&>tr>td]:h-14',
                    'ow:hover:[&>tr]:bg-transparent',
                  ])}
                />
              </T.Table>
            </T.Root>
          </ScrollArea>
          <Show when={table.getRowModel().rows.length > 0}>
            <div className="flex justify-end pt-6">
              <Pagination
                perPage={pagination.size}
                totalItems={totalItems}
                page={pagination.page}
                onChange={onChangePagination}
              />
            </div>
          </Show>
        </div>
      </Switch.Case>
    </Switch.Root>
  )
}

export default MealPlanHistoryTable
