'use client'
//THIRD PARTY MODULES
import dayjs from 'dayjs'
import classcat from 'classcat'
import { useState } from 'react'
import { OrderBy } from '_@rpc/routers/meal-plan/meal-plan.schema'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import {
  FULL_WEEK_WIDTH,
  categoryOptionsObject,
  deliverySlotOptionsObject,
  mealPlanOptionsObject,
} from '_@landing/constants/meal-plan'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import BrowserOnly from '_@shared/components/BrowserOnly'
//SHARED
import { RouterOutputs, nextApi } from '_@shared/utils/api'
//RELATIVE MODULES
import MealPlanModal from '../comps/MealPlanModal'
import MealPlanCategoryTag from '../comps/MealPlanCategoryTag'

type TData = RouterOutputs['mealPlan']['getMealPlanOrderList']['data'][number]

const columnHelper = createColumnHelper<TData>()

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => (
      <MealPlanModal id={info.getValue()}>
        <Button className="ow:w-fit" color="primary" variant="filled">
          View
        </Button>
      </MealPlanModal>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>Action</span>
    ),
    size: 100,
  }),
  columnHelper.accessor('mealPlanCategory', {
    cell: (info) => <MealPlanCategoryTag label={categoryOptionsObject[info.getValue()].label} />,
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>Plan</span>
    ),
    size: 140,
  }),
  columnHelper.accessor('total', {
    cell: (info) => (
      <p className={classcat(['text-14lig text-blu-400'])}>{info.getValue()?.toFixed(2)}</p>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>
        Total (AED)
      </span>
    ),
    size: 140,
  }),
  columnHelper.accessor('placedAt', {
    cell: (info) => (
      <BrowserOnly>
        <p className={classcat(['text-14lig text-blu-400'])}>
          {info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY, hh : mm') : ''}
        </p>
      </BrowserOnly>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>Paid</span>
    ),
    size: 200,
  }),
  columnHelper.accessor('mealSelected', {
    cell: (info) => (
      <BrowserOnly>
        <p className={classcat(['text-14lig text-blu-400'])}>
          {info
            .getValue()
            ?.map((item) => mealPlanOptionsObject?.[item]?.label)
            ?.join(', ')}
        </p>
      </BrowserOnly>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>
        Meals Selected
      </span>
    ),
    size: 248,
  }),
  columnHelper.accessor('deliverySlot', {
    cell: (info) => (
      <BrowserOnly>
        <p className={classcat(['text-14lig text-blu-400'])}>
          {deliverySlotOptionsObject?.[info.getValue()]?.shortLabel}
        </p>
      </BrowserOnly>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>Slot</span>
    ),
    size: 140,
  }),
  columnHelper.accessor('deliveryOn', {
    cell: (info) => {
      const value = info.getValue()
      return (
        <BrowserOnly>
          <p className={classcat(['text-14lig text-blu-400'])}>
            {value.length === FULL_WEEK_WIDTH ? 'Full week' : value.join(', ')}
          </p>
        </BrowserOnly>
      )
    },
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>
        Delivery On
      </span>
    ),
    size: 140,
  }),
  columnHelper.accessor('startDate', {
    cell: (info) => (
      <BrowserOnly>
        <p className={classcat(['text-14lig text-blu-400'])}>
          {info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY') : ''}
        </p>
      </BrowserOnly>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>
        Start Delivering
      </span>
    ),
    size: 200,
  }),
  columnHelper.accessor('duration', {
    cell: (info) => (
      <BrowserOnly>
        <p className={classcat(['text-14lig text-blu-400'])}>
          {`${info.getValue()} week${info.getValue() > 1 ? 's' : ''}`}
        </p>
      </BrowserOnly>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>Duration</span>
    ),
    size: 140,
  }),
]

const emptyArray: any[] = []

type TPagination = {
  page: number
  size: number
}

export default function useTable() {
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    size: 5,
  })

  const { data, isLoading } = nextApi.mealPlan.getMealPlanOrderByUserId.useQuery({
    paging: {
      page: pagination.page,
      size: pagination.size,
    },
    sortBy: {
      field: 'createdAt',
      order: OrderBy.DESC,
    },
  })

  const table = useReactTable({
    data: data?.data || emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    isLoading,
    pagination,
    metadata: {
      totalItems: data?.meta.total || 0,
    },
    setPagination,
  }
}
