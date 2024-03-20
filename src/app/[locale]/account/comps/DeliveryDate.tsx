//THIRD PARTY MODULES
import dayjs from 'dayjs'
import classcat from 'classcat'
import { DeliveryType, OrderStatus } from '@prisma/client'
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'
//RELATIVE MODULES

interface Props {
  data: RouterOutputs['order']['getOrdersByUser']['data'][number]
}

function DeliveryDate({ data }: Props) {
  return (
    <div className={classcat(['flex items-center space-x-2 whitespace-nowrap'])}>
      <p className={classcat(['text-12lig text-blu-300'])}>
        <Switch.Root>
          <Switch.Case when={data.status === OrderStatus.CANCELLED}>Cancelled time:</Switch.Case>
          <Switch.Case when={true}>Delivery date:</Switch.Case>
        </Switch.Root>
      </p>
      <Switch.Root>
        <Switch.Case when={data.status === OrderStatus.CANCELLED && data.updatedAt}>
          <p className={classcat(['text-14 text-blu-500'])}>
            {dayjs(data.updatedAt).format('HH:mm - DD/MM/YYYY')}
          </p>
        </Switch.Case>
        <Switch.Case when={data.deliveryType === DeliveryType.PRE_ORDER && data.preOrderDate}>
          <p className={classcat(['text-14 text-blu-500'])}>
            {dayjs(data.preOrderDate).format('HH:mm - DD/MM/YYYY')}
          </p>
        </Switch.Case>
        <Switch.Case when={data.deliveryType === DeliveryType.RIGHT_AWAY && data.cart.placedAt}>
          <p className={classcat(['text-14 text-blu-500'])}>
            {dayjs(data.cart.placedAt).format('HH:mm - DD/MM/YYYY')}
          </p>
        </Switch.Case>
      </Switch.Root>
    </div>
  )
}

export default DeliveryDate
