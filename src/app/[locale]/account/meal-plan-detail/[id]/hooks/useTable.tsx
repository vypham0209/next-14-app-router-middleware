'use client';
//THIRD PARTY MODULES
import dayjs from 'dayjs';
import classcat from 'classcat';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
//LAYOUT, COMPONENTS
import BrowserOnly from '_@shared/components/BrowserOnly';
import DeliveryStatusTag from '../components/DeliveryStatusTag';

type TData = {
  id: number;
  date: Date;
  status: string;
};

const columnHelper = createColumnHelper<TData>();

const columns = [
  columnHelper.accessor('date', {
    cell: (info) => (
      <BrowserOnly>
        <p className={classcat(['text-14lig text-blu-400'])}>
          {info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY, hh : mm') : ''}
        </p>
      </BrowserOnly>
    ),
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>
        Delivery Date
      </span>
    ),
    size: 410,
  }),
  columnHelper.accessor('status', {
    cell: (info) => {
      return <DeliveryStatusTag status={info.getValue()} />;
    },
    header: () => (
      <span className={classcat(['text-12 uppercase text-blu-500', 'md:text-14'])}>Status</span>
    ),
    size: 410,
  }),
];

const emptyArray: any[] = [];

export default function useTable() {
  const table = useReactTable({
    data: emptyArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    metadata: {
      totalItems: 15,
    },
  };
}
