//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import OrderStatusTag from '_@landing/components/OrderStatusTag';
//SHARED
import { RouterOutputs, nextApi } from '_@shared/utils/api';
//RELATIVE MODULES
import DishCard from './DishCard';
import CopyButton from './CopyButton';
import CartAction from './OrderAction';
import DeliveryDate from './DeliveryDate';

export type CartCardProps = RouterOutputs['order']['getOrdersByUser']['data'][number];

const TOTAL_SHOW_DISH_CARD = 3;

function CartCard({ data }: { data: CartCardProps }) {
  const utils = nextApi.useContext();
  const onRefresh = () => {
    utils.order.getOrdersByUser.invalidate();
    utils.order.getOrderCountEachStatusByUser.invalidate();
  };

  return (
    <div
      className={classcat([
        'grid w-full grid-cols-1 space-y-3 border border-solid border-blu-100 p-4',
        'md:space-y-4 md:p-6',
      ])}
    >
      <div className={classcat(['space-i-2 flex items-start justify-between', 'md:items-center'])}>
        <div
          className={classcat(['flex flex-col space-y-3', 'md:flex-row md:space-x-8 md:space-y-0'])}
        >
          <OrderStatusTag
            status={data.status}
            className={classcat([
              'w-33 justify-center',
              'ow:grid-cols-[theme(spacing.[4.5])_1fr] ow:gap-1 ow:py-1 ow:pi-4',
              'ow:md:grid-cols-[theme(spacing.[6])_1fr] ow:md:gap-2 ow:md:py-1 ow:md:pi-4',
              '[&>svg]:h-4.5 [&>svg]:w-4.5 [&>svg]:md:h-6 [&>svg]:md:w-6',
              '[&>p]:text-14 [&>p]:md:text-16',
            ])}
          />
          <DeliveryDate data={data} />
        </div>
        <CopyButton id={data.id} />
      </div>
      <hr className={classcat(['bg-blu-100'])}></hr>
      <div className="flex flex-col justify-center space-y-1 md:space-y-2">
        <div className="w-full space-y-1 md:space-y-2">
          {data.cart.dishesInCart.slice(0, 3).map((item) => (
            <DishCard key={item.id} data={item} />
          ))}
        </div>
        <Show when={data.cart.dishesInCart.length > TOTAL_SHOW_DISH_CARD}>
          <p className="text-center text-12lig text-blu-300">
            + {data.cart.dishesInCart.length - TOTAL_SHOW_DISH_CARD} more
          </p>
        </Show>
      </div>
      <hr className={classcat(['bg-blu-100'])}></hr>
      <div
        className={classcat([
          'flex flex-col justify-between space-y-3 align-middle',
          'md:flex-col md:space-y-3',
          'lg:flex-row lg:space-y-0',
        ])}
      >
        <div className={classcat(['flex items-center justify-end space-x-2'])}>
          <p className={classcat(['text-18 font-normal text-blu-200'])}>Total</p>
          <p className={classcat(['text-18 font-bold text-blu-400'])}>
            {data.total.toFixed(2)} AED
          </p>
        </div>
        <CartAction status={data.status} id={data.id} onRefresh={onRefresh} />
      </div>
    </div>
  );
}

export default CartCard;
