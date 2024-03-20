//THIRD PARTY MODULES
import React, { useMemo } from 'react';
//SHARED
import { nextApi } from '_@shared/utils/api';
import { ORDER_TAB_ALL } from '_@landing/constants/shared';
//RELATIVE MODULES
import Orders from './Orders';

function OrdersTab() {
  const { data: count } = nextApi.order.getOrderCountEachStatusByUser.useQuery();

  const dataCount: { [key: string]: number | undefined } = useMemo(
    () => ({
      [ORDER_TAB_ALL]: count?.countAll,
      ...count?.countEachStatus.reduce(
        (prev, cur) => ({ ...prev, [cur.status]: cur._count.status }),
        {},
      ),
    }),
    [count],
  );

  return <Orders dataCount={dataCount} />;
}

export default OrdersTab;
