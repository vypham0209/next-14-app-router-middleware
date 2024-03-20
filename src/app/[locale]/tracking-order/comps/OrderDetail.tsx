//THIRD PARTY MODULES
import classcat from 'classcat';
import { OrderStatus } from '@prisma/client';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import OrderStatusTag from '_@landing/components/OrderStatusTag';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import OrderReason from './OrderReason';
import ShippingInfo from './ShippingInfo';

interface Props {
  data?: RouterOutputs['order']['trackingOrder'];
}

const OrderDetail = ({ data }: Props) => {
  if (!data) return null;
  return (
    <div className="mt-10 border border-blu-100 p-3 md:p-6">
      <h2 className="text-24 text-blu-400 md:text-36">Order #{data.id}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <OrderStatusTag
          status={data.status}
          className={classcat(['ow:py-2 ow:pi-4', 'ow:md:py-3 ow:md:pi-6'])}
        />
        <Show when={data.status === OrderStatus.CANCELLED && data.rejectReason}>
          <OrderReason reason={data.rejectReason} />
        </Show>
        <ShippingInfo data={data} />
      </div>
    </div>
  );
};

export default OrderDetail;
