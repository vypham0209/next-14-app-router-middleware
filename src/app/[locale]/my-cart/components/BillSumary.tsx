//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//TYPES MODULES
import type { BillSumary } from '_@landing/machine/cart';

const billSummary: Array<{
  name: string;
  key: keyof Pick<BillSumary, 'subTotal' | 'shippingCost' | 'tax'>;
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
];

const BillSummaryRender = (props: Pick<BillSumary, 'subTotal' | 'shippingCost' | 'tax'>) => {
  return (
    <>
      {billSummary.map((data, i) => (
        <div className="flex" key={i}>
          <p className="grow text-14 uppercase text-blu-400">{data.name}</p>
          <p className="text-14 text-blu-400">{props[data.key]} AED</p>
        </div>
      ))}
    </>
  );
};

type BillSummaryProps = {
  data: BillSumary;
  onCheckout: () => void;
};

export default function BillSumary({ data, onCheckout }: BillSummaryProps) {
  return (
    <div className="grid gap-4 p-4 shadow-[0_0_0_1px] shadow-blu-100 md:gap-6 md:p-6">
      <Button color="navy" className="btn-big hidden w-full uppercase md:grid" onClick={onCheckout}>
        Checkout
      </Button>

      <div className="bg-yel-50 py-2 text-center">
        <p className="text-18 font-normal text-blu-500">{data.kcalTotal} kcal</p>
        <div className="grid justify-center gap-1 pt-2 md:space-i-1 md:flex md:gap-0">
          <span className="text-12lig text-blu-500">Not sure how much to consume?</span>
          <Button
            variant="ghost"
            as="link"
            target="_blank"
            rel="noopener noreferrer"
            href={'/calories-calculator'}
            className="mx-auto pt-1 text-12 text-yel-500 md:mx-0"
          >
            Use calories calculator
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <BillSummaryRender
          shippingCost={data.shippingCost}
          subTotal={data.subTotal}
          tax={data.tax}
        />

        <div className="h-px bg-blu-100" />

        <div className="flex">
          <p className="grow text-14 font-bold uppercase text-blu-400">Total</p>
          <p className="text-14 font-bold text-blu-400">{data.total} AED</p>
        </div>
      </div>

      <p className="text-12lig text-blu-200">*Promo codes can be applied at checkout</p>
    </div>
  );
}
