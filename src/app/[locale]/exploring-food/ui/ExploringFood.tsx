'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import Link from 'next-intl/link';
import { usePathname } from 'next-intl/client';
import { useSearchParams } from 'next/navigation';
import { useCartActor } from '_@landing/machine/cart';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
import Switch from '_@shared/components/conditions/Switch';
import DishCard, { DishType } from '_@landing/components/card/DishCard';
//SHARED
import { api } from '_@shared/utils/api';
//RELATIVE MODULES
import { LoaderType } from '../page';
import NotFound from '../comps/NotFound';
import { useFoodContext } from './ExploringFoodLayout';
import { LoaderMaybeYouWillLikeType } from '../recommend/page';

export default function ExploringFood({ data }: { data: LoaderType | LoaderMaybeYouWillLikeType }) {
  const { categoryActive } = useFoodContext();
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [_, send] = useCartActor();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const isRecommend = segments?.[2] === 'recommend';

  const onAddCart = (dishId: number) => async () => {
    const dish = await api.dishes.getDishById.query(dishId);
    if (!dish) return;
    send({ type: 'SELECT_DISH_TO_ADD', payload: dish });
  };

  return data.dishes?.data.length > 0 ? (
    <>
      <h3
        className={classcat([
          'text-center text-28 text-blu-400 sm:text-start sm:text-48',
          keyword || isRecommend ? 'hidden sm:block' : '',
        ])}
      >
        <Switch.Root>
          <Switch.Case when={isRecommend}>Maybe you'll like</Switch.Case>
          <Switch.Case when={keyword}>Search results</Switch.Case>
          <Switch.Case when={true}>{categoryActive.metaCategory}</Switch.Case>
        </Switch.Root>
      </h3>
      <div
        className={classcat([
          'grid gap-6 sm:gap-y-16',
          'grid-cols-[repeat(auto-fill,minmax(calc(192rem/16),1fr))]',
          'sm:grid-cols-[repeat(auto-fill,minmax(calc(212rem/16),1fr))]',
          'lg:grid-cols-[repeat(auto-fill,minmax(calc(243rem/16),1fr))]',
        ])}
      >
        {data.dishes.data.map((item, i) => {
          return item && !item.hidden ? (
            <DishCard.Root className="space-y-3 sm:space-y-6" dishes={item as DishType} key={i}>
              <Link href={`/dish-detail/${item.id}`}>
                <DishCard.Image className="aspect-[6/5] w-full sm:aspect-[5/6]">
                  <Show when={!item.inStock}>
                    <DishCard.SoldOut />
                  </Show>
                </DishCard.Image>
              </Link>

              <div className="flex flex-1 flex-col space-y-2 sm:space-y-4">
                <div className="flex-1 space-y-1">
                  <DishCard.Catagories />
                  <Link className="grid gap-1" href={`/dish-detail/${item.id}`}>
                    <DishCard.NameAndDescription />
                  </Link>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  <DishCard.AllergenAndSpicy />
                  <DishCard.Line />
                  <div className="flex items-center justify-between">
                    <DishCard.PriceDisplay />
                    <DishCard.AddToCartButton
                      disabled={!item.inStock}
                      onClick={onAddCart(item.id)}
                    />
                  </div>
                </div>
              </div>
            </DishCard.Root>
          ) : null;
        })}
      </div>
    </>
  ) : (
    <NotFound />
  );
}
