'use client';
//LAYOUT, COMPONENTS
import DishCartCard from '_@landing/components/card/DishCartCard';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES

interface Props {
  data?: NonNullable<RouterOutputs['order']['getOrderById']>['cart']['dishesInCart'];
}

function DishList({ data }: Props) {
  if (!data) return null;
  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-18 text-blu-400 md:text-24">Item list</h3>
      <div className="grid grid-flow-row grid-cols-1 gap-4 md:gap-6">
        {data?.map((item) => (
          <DishCartCard.Default key={item.id} dish={item} />
        ))}
      </div>
    </div>
  );
}

export default DishList;
