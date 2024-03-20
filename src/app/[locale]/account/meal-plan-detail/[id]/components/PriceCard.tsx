'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
// import { useEffect, useState } from 'react'
import { OrderStatus, PaymentMethod } from '@prisma/client'
//LAYOUT, COMPONENTS
// import Portal from '_@shared/components/Portal'
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import CashIcon from '_@shared/icons/CashIcon'
import CardIcon from '_@shared/icons/CardIcon'
import { RouterOutputs } from '_@shared/utils/api'
import CustomerServiceIcon from '_@shared/icons/CustomerServiceIcon'
//RELATIVE MODULES
import PriceItem from './PriceItem'

interface Props {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data']
}

function PriceCard({ data }: Props) {
  // const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const container = document.getElementById('order-detail-section')
  //     setPortalContainer(container)
  //   }
  // }, [])

  if (!data) return null
  return (
    <div
      className={classcat([
        'flex basis-auto flex-col border border-blu-100 p-4 text-blu-400',
        'md:p-6',
        'lg:basis-100 lg:self-start',
      ])}
    >
      <div className={classcat(['grid grid-cols-1 gap-6'])}>
        <div className={classcat(['grid grid-cols-1 gap-4'])}>
          <div className={classcat(['grid grid-cols-1 gap-1', 'md:gap-2'])}>
            <div className={classcat(['grid grid-cols-1 gap-4'])}>
              <PriceItem label="Subtotal" value={data.subtotal} />
              <PriceItem label="Shipping cost" value={data.shippingCost} />
              <PriceItem label="Tax" value={data.tax} />
            </div>
          </div>
          <hr className={classcat(['bg-blu-100'])} />
          <div className={classcat(['flex justify-between'])}>
            <p className={classcat(['text-12 uppercase text-blu-400', 'md:text-14'])}>Total</p>
            <p className={classcat(['text-12 font-bold uppercase text-blu-400', 'md:text-14'])}>
              {data.total.toFixed(2)} AED
            </p>
          </div>
        </div>
        <div className={classcat(['hidden justify-center', 'md:flex'])}>
          <Button
            className={classcat(['btn-medium [&>span]:text-16'])}
            variant="ghost"
            leadingIcon={<CustomerServiceIcon className={classcat(['h-4 w-4'])} />}
          >
            Need help?
          </Button>
        </div>
        <Show when={(data.status as string) !== OrderStatus.REJECT}>
          <div
            className={classcat(['flex h-5.5 select-none items-center justify-center space-x-3'])}
          >
            <p className={classcat(['text-14lig text-blu-500'])}>Paid with</p>
            <Switch.Root>
              <Switch.Case when={data.paymentMethod === PaymentMethod.CARD}>
                <div className={classcat(['flex items-center space-x-1'])}>
                  <CardIcon className={classcat(['h-6 w-6'])} />
                  <p className="text-16 text-blu-500">Card</p>
                </div>
              </Switch.Case>
              <Switch.Case when={data.paymentMethod === PaymentMethod.COD}>
                <div className={classcat(['flex items-center space-x-1'])}>
                  <CashIcon className="h-6 w-6" />
                  <p className="text-16 text-blu-500">Cash</p>
                </div>
              </Switch.Case>
            </Switch.Root>
          </div>
        </Show>
      </div>
      {/* <Portal container={portalContainer} asChild>
        <div className="sticky bottom-0 grid gap-2.5 bg-yel-25 px-[--max-padding] pb-10 pt-4 full-fledge md:hidden">
          <div className={classcat(['flex justify-center'])}>
            <Button
              className={classcat(['btn-medium [&>span]:text-16'])}
              variant="ghost"
              leadingIcon={<CustomerServiceIcon className={classcat(['h-4 w-4'])} />}
            >
              Need help?
            </Button>
          </div>
        </div>
      </Portal> */}
    </div>
  )
}

export default PriceCard
