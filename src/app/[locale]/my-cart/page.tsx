'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { useEffect, useState } from 'react';
import { useRouter } from 'next-intl/client';
import { calcBilling } from '_@landing/utils/calculate';
import { DishesInContext, useCartActor } from '_@landing/machine/cart';
//LAYOUT, COMPONENTS
import Portal from '_@shared/components/Portal';
import BillSumary from './components/BillSumary';
import Show from '_@shared/components/conditions/Show';
import Button from '_@shared/components/button/Button';
import CartCard from '_@landing/components/card/CartCard';
import Switch from '_@shared/components/conditions/Switch';
import GreatOfferModal from './components/GreatOfferModal';
import MaybeYouWillLike from '_@landing/components/MaybeYouWillLike';
import DishDetailSlideOver from '_@landing/components/dish-detail-slide-over';
//SHARED
import { nextApi } from '_@shared/utils/api';
import { TAX } from '_@landing/constants/shared';
import IllusIcon from '_@shared/icons/IllusIcon';
import useProfile from '_@shared/hooks/useProfile';

export default function Page() {
  const [{ context }, send] = useCartActor();
  const { dishes } = context;
  const [itemCount, setItemCount] = useState(0);
  const [openGreatOffer, setOpenGreatOffer] = useState<boolean>(false);
  const { push } = useRouter();
  const [user] = useProfile();
  const userId = user?.id;

  const { data } = nextApi.dishes.getDishByIdList.useQuery(
    dishes?.map((dish) => dish.originDishId),
    {
      enabled: !!dishes?.length,
    },
  );

  console.log({ context });

  const { totalCalories, subTotal } = calcBilling(dishes);

  const handleEditDish = (dish: DishesInContext[number]) => {
    const editedDish = data?.find((d) => d.id === dish.originDishId);
    if (!editedDish) return;
    send({ type: 'SELECT_DISH_TO_EDIT', payload: editedDish, defaultDish: dish });
  };

  const onCheckout = () => {
    if (!userId) {
      setOpenGreatOffer(true);
      return;
    }
    push('/checkout/information');
  };

  useEffect(() => {
    setItemCount(dishes?.reduce((acc, curr) => acc + curr.amount || 0, 0));
  }, [dishes]);

  return (
    <>
      <DishDetailSlideOver />
      <div
        className={classcat([
          'grid gap-6 pt-6 md:gap-10 md:pt-10',
          itemCount === 0 ? 'pb-20 md:pb-36' : 'pb-10 md:pb-20',
        ])}
      >
        <h2 className="text-28 text-blu-400 md:text-48">My Cart ({itemCount})</h2>

        <Switch.Root>
          <Switch.Case when={itemCount === 0}>
            <div className="grid justify-center gap-6">
              <div className="mb-6 mt-20 flex max-w-[calc(700rem/16)] flex-col items-center justify-center space-y-6 md:space-y-10">
                <IllusIcon className="h-30 w-35 md:h-39 md:w-45" />
                <p className="text-center text-16lig text-blu-400 md:text-20lig">
                  They say no man can be wise on an empty stomach. Start exploring our delicious
                  menu now ↓
                </p>
              </div>
              <Button
                as="link"
                color="navy"
                href="/exploring-food"
                className="btn-big mx-auto sm:btn-very-big sm:w-70"
              >
                Explore food
              </Button>
            </div>
          </Switch.Case>
          <Switch.Case when={itemCount !== 0}>
            <div className="grid items-start gap-6 sm:gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px] lg:gap-15">
              <div className="w-full space-y-10">
                {dishes.map((data) => (
                  <CartCard.CartCardDefault
                    handleEditDish={handleEditDish}
                    dish={data}
                    key={data.id}
                  />
                ))}
              </div>
              <BillSumary
                data={{
                  kcalTotal: totalCalories,
                  subTotal: subTotal,
                  tax: TAX * subTotal,
                  total: subTotal - TAX * subTotal,
                  shippingCost: 0,
                  promoDiscount: 0,
                }}
                onCheckout={onCheckout}
              />
            </div>
            <Portal
              container={typeof window !== 'undefined' ? document.getElementById('main') : null}
              asChild
            >
              <div className="sticky bottom-0 bg-yel-25 px-[--max-padding] pb-10 pt-4 full-fledge md:hidden">
                <Button color="navy" className="btn-big w-full uppercase" onClick={onCheckout}>
                  Checkout
                </Button>
              </div>
            </Portal>
          </Switch.Case>
        </Switch.Root>
      </div>
      <Show when={itemCount !== 0}>
        <MaybeYouWillLike />
      </Show>
      <GreatOfferModal open={openGreatOffer} setOpen={setOpenGreatOffer} />
    </>
  );
}
