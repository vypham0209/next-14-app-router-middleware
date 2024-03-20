//THIRD PARTY MODULES
import classcat from 'classcat';
import { headers } from 'next/headers';
import { DeliveryType } from '@prisma/client';
import { getUrlOnServer } from '_@landing/utils/getUrlOnServer';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/DeprecatedButton';
import Switch from '_@shared/components/conditions/Switch';
//SHARED
import KitchenIcon from '_@shared/icons/KitchenIcon';
import { TrackingType } from '_@shared/schemas/tracking';
//RELATIVE MODULES
import { CheckOutType } from '../types/checkout-type';
//RELATIVE MODULES

export default function Page() {
  const isAuth = headers().get('x-is-auth');
  const url = getUrlOnServer();
  const deliveryType = url?.searchParams.get('delivery_type') ?? '';
  const orderId = url?.searchParams.get('order_id') ?? '';
  const checkoutType = url?.searchParams.get('checkout_type') ?? CheckOutType.Order;
  const isMealPlan = checkoutType === CheckOutType.MealPlan;

  return (
    <div className="flex flex-col items-center space-y-10 px-4 pb-35 pt-10 md:pt-20">
      <KitchenIcon className="h-50 w-50.5 md:h-69 md:w-69.5" />

      <div className="grid gap-6 text-center">
        <h3 className="text-36 text-blu-400 md:text-64">Order placed!</h3>
        <Switch.Root>
          <Switch.Case when={isMealPlan || deliveryType === DeliveryType.PRE_ORDER}>
            <p className="text-center text-20lig text-blu-400">
              Sit back and relax. Your meals will arrive on the date you chose.
            </p>
          </Switch.Case>
          <Switch.Case when={true}>
            <p className="text-center text-20lig text-blu-400">
              Sit back and relax. Your meal will arrive in no time.
            </p>
          </Switch.Case>
        </Switch.Root>
      </div>

      <Switch.Root>
        <Switch.Case when={isAuth}>
          <Button
            className="w-full py-3.25 md:w-70"
            color="navy"
            as="link"
            href={`/account?tab=${isMealPlan ? 'meal-plans' : 'orders'}`}
          >
            View my {isMealPlan ? 'plan' : 'order'}
          </Button>
        </Switch.Case>
        <Switch.Case when={!isAuth}>
          <div
            className={classcat(['grid items-center justify-center gap-2 bg-yel-50 p-4 md:w-175'])}
          >
            <div className={classcat(['flex flex-wrap items-center justify-center space-x-2'])}>
              <p className={classcat(['whitespace-nowrap text-20 text-blu-400'])}>Your order ID:</p>
              <p
                className={classcat(['whitespace-nowrap text-20 text-yel-500'])}
              >{`#${orderId}`}</p>
            </div>
            <p className={classcat(['text-center text-12lig text-blu-300 md:text-14lig'])}>
              Please write this order ID down somewhere in case you want to track your order later.
            </p>
          </div>
          <Button
            className="w-full py-3.25 md:w-70"
            color="navy"
            as="link"
            href={`/tracking-order?type=${
              isMealPlan ? TrackingType['meal-plan'] : TrackingType.order
            }`}
          >
            {isMealPlan ? 'Track my order' : 'View my plan'}
          </Button>
        </Switch.Case>
      </Switch.Root>
    </div>
  );
}
