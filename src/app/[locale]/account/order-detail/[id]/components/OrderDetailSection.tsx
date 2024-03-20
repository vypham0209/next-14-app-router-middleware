//THIRD PARTY MODULES
import classcat from 'classcat'
import { OrderStatus } from '@prisma/client'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
import OrderStatusTag from '_@landing/components/OrderStatusTag'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'
//RELATIVE MODULES
import DishList from './DishList'
import PriceCard from './PriceCard'
import BackButton from './BackButton'
import OrderReason from './OrderReason'
import ShippingInfo from './ShippingInfo'
import CopyButton from '../../../comps/CopyButton'

//RELATIVE MODULES

interface Props {
  data?: RouterOutputs['order']['getOrderById']
}

export default function OrderDetailSection({ data }: Props) {
  if (!data) return null

  return (
    <div
      id="order-detail-section"
      className={classcat([
        'max-content relative space-y-6 py-6 full-fledge md:py-10',
        'md:space-y-10 ',
      ])}
    >
      <BackButton />
      <div
        className={classcat([
          'flex flex-col items-start justify-between space-x-0 space-y-6',
          'md:flex-row md:items-center md:space-x-10 md:space-y-0',
        ])}
      >
        <div className={classcat(['shrink-0 text-36 text-blu-400 lg:text-48'])}>Order details</div>
        <div className={classcat(['space-i-2 flex w-full justify-between'])}>
          <Show when={data.status}>
            <OrderStatusTag status={data.status} />
          </Show>
          <CopyButton
            id={data.id}
            textClassname="ow:md:text-20lig ow:text-16lig"
            iconClassname="ow:w-6 ow:h-6"
            wrapperClassname="ow:space-x-3"
          />
        </div>
      </div>
      <Show when={data.status === OrderStatus.CANCELLED && data.rejectReason}>
        <OrderReason reason={data.rejectReason} />
      </Show>
      <div
        className={classcat(['flex flex-col space-y-6', 'lg:space-i-15 lg:flex-row lg:space-y-0'])}
      >
        <div className={classcat(['flex flex-1 flex-col space-y-6', 'md:space-y-10'])}>
          <ShippingInfo data={data} />
          <DishList data={data.cart.dishesInCart} />
        </div>
        <PriceCard data={data} />
      </div>
    </div>
  )
}
