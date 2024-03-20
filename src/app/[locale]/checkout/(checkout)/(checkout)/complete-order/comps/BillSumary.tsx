//THIRD PARTY MODULES
import classcat from 'classcat';
import { PaymentMethod } from '@prisma/client';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Switch from '_@shared/components/conditions/Switch';
import InlineNotification from '_@shared/components/InlineNotification';
//SHARED
import CashIcon from '_@shared/icons/CashIcon';
import CardIcon from '_@shared/icons/CardIcon';
//TYPES MODULES
import type { BillSumary } from '_@landing/machine/cart';

type PickKey = 'subTotal' | 'shippingCost' | 'tax' | 'promoDiscount';
const billSummary: Array<{
  name: string;
  key: keyof Pick<BillSumary, PickKey>;
}> = [
  {
    name: 'Subtotal',
    key: 'subTotal',
  },
  {
    name: 'Shipping cost',
    key: 'shippingCost',
  },
  {
    name: 'Tax',
    key: 'tax',
  },
  {
    name: 'Promo code',
    key: 'promoDiscount',
  },
];

const BillSummaryRender = (props: Pick<BillSumary, PickKey>) => {
  return (
    <div className="space-y-4">
      {billSummary.map((data, i) => (
        <div className="flex" key={i}>
          <p className="grow text-14 uppercase text-blu-400">{data.name}</p>
          <p className="text-14 text-blu-400">
            {`${data.key === 'promoDiscount' && props[data.key] ? '-' : ''} ${
              props[data.key] || 0
            } AED`}
          </p>
        </div>
      ))}
    </div>
  );
};

type BillSummaryProps = {
  data: BillSumary;
  paymentMethod?: PaymentMethod;
  className?: string;
  isLoading: boolean;
  handlePlace: () => void;
};

export default function BillSumary({
  data,
  paymentMethod,
  className,
  isLoading,
  handlePlace,
}: BillSummaryProps) {
  return (
    <div className={classcat(['grid gap-4 border border-blu-100 p-4 md:gap-6 md:p-6', className])}>
      <div className="hidden gap-6 md:grid">
        <Button
          isLoading={isLoading}
          className={classcat(['btn-big text-14'])}
          onClick={handlePlace}
          color="navy"
        >
          PLACE ORDER
        </Button>

        <div className="space-i-3 flex justify-center">
          <span className="text-14lig text-blu-500">Pay with</span>

          <Switch.Root>
            <Switch.Case when={paymentMethod === PaymentMethod.CARD}>
              <div className="space-i-1 flex items-center">
                <CardIcon className={classcat(['h-6 w-6'])} />
                <p className="text-16 text-blu-500">Card</p>
              </div>
            </Switch.Case>
            <Switch.Case when={paymentMethod === PaymentMethod.COD}>
              <div className="space-i-1 flex items-center">
                <CashIcon className="h-6 w-6" />
                <p className="text-16 text-blu-500">Cash</p>
              </div>
            </Switch.Case>
          </Switch.Root>
        </div>
      </div>

      <div className={classcat(['grid gap-4'])}>
        <BillSummaryRender
          shippingCost={data.shippingCost}
          subTotal={data.subTotal}
          tax={data.tax}
          promoDiscount={data.promoDiscount}
        />

        <div className="h-px bg-blu-100" />

        <div className="flex">
          <p className="grow text-14 uppercase text-blu-400">Total</p>
          <p className="text-14 font-bold text-blu-400">{data.total} AED</p>
        </div>
      </div>

      <InlineNotification description="Please check carefully before placing" color="warning" />
    </div>
  );
}
