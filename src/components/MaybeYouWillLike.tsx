//THIRD PARTY MODULES
import Link from 'next/link';
import classcat from 'classcat';
import { useCartActor } from '_@landing/machine/cart';
import { useMemo, type ComponentPropsWithoutRef } from 'react';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Button from '_@shared/components/button/Button';
import DishCard, { DishType } from '_@landing/components/card/DishCard';
//SHARED
import { nextApi } from '_@shared/utils/api';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';

type Props = ComponentPropsWithoutRef<'div'>;

export default function MaybeYouWillLike({ className, ...props }: Props) {
  const [{ context }] = useCartActor();
  const filter = useFilterQueryString();
  const { dishes = [] } = context;
  const { data: respData } = nextApi.dishes.getRecommendedByDishIds.useQuery({
    size: 3,
    ids: dishes.map((item) => item.originDishId),
  });

  const formatDishes = useMemo<DishType[]>(
    () =>
      respData?.data
        ? respData.data.map(({ spicy_level, ...item }: any) => ({
            ...item,
            spicyLevel: spicy_level,
            inStock: item.in_stock,
          }))
        : [],
    [respData],
  );

  const onShowMore = () => {
    filter({ dishIds: dishes.map((item) => item.originDishId) }, '/exploring-food/recommend');
  };

  return (
    <Show when={respData && respData?.data.length > 0}>
      <div
        className={classcat([
          'space-y-6 pb-20 pt-6 full-fledge md:space-y-10 md:pb-32 md:pt-10',
          className,
        ])}
        {...props}
      >
        <div className="max-content flex items-center justify-between">
          <h4 className="text-18 text-blu-400 md:text-28">Maybe you'll like</h4>
          <Show when={respData && respData?.meta.total > 3}>
            <Button
              onClick={onShowMore}
              variant="ghost"
              className="md:btn-medium"
              trailingIcon={<ArrowRightIcon />}
            >
              Show more
            </Button>
          </Show>
        </div>
        <div className="ml-[--max-padding] overflow-auto pr-[--max-padding] scrollbar-hide ">
          <div
            className={classcat([
              'grid w-max  grid-flow-col gap-4  md:gap-6',
              'auto-cols-[200px] sm:auto-cols-[280px] md:auto-cols-[360px] xl:auto-cols-[410px]',
            ])}
          >
            {formatDishes.map((dish, i) => (
              <DishCard.Root key={i} className="space-y-3" dishes={dish}>
                <Link href={`/dish-detail/${dish.id}`}>
                  <DishCard.Image className="aspect-[6/5]">
                    <Show when={!dish.inStock}>
                      <DishCard.SoldOut />
                    </Show>
                  </DishCard.Image>
                </Link>
                <div className="flex flex-1 flex-col space-y-3 md:px-4">
                  <div className="flex-1 space-y-3">
                    <Link href={`/dish-detail/${dish.id}`}>
                      <DishCard.NameAndDescription />
                    </Link>
                  </div>
                  <div className="space-y-3">
                    <DishCard.AllergenAndSpicy />
                    <DishCard.Line />
                    <div className="flex items-center justify-between">
                      <DishCard.PriceDisplay />
                    </div>
                  </div>
                </div>
              </DishCard.Root>
            ))}
          </div>
        </div>
      </div>
    </Show>
  );
}
