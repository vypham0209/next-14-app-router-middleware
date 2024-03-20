'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import { useRef, useState } from 'react';
import { useRouter } from 'next-intl/client';
import { useCartActor } from '_@landing/machine/cart';
import { processHtml } from '_@landing/utils/wordFormat';
import { useHideFooter } from '_@landing/app/[locale]/FooterProvider';
//LAYOUT, COMPONENTS
import TooltipRadix from '_@shared/components/Tooltip';
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import Slider from '_@landing/components/Slider/Slider';
import DishCard from '_@landing/components/card/DishCard';
import BrowserOnly from '_@shared/components/BrowserOnly';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
import { RouterOutputs, nextApi } from '_@shared/utils/api';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';
//RELATIVE MODULES
import './../DishDetail.css';
import ContentTabs from './ContentTabs';

const ContentDish = ({ dish }: { dish: RouterOutputs['dishes']['getDishById'] }) => {
  const router = useRouter();
  const nameTagRef = useRef<HTMLHeadingElement>(null);
  const [isMore, setIsMore] = useState(true);
  const filter = useFilterQueryString();

  useHideFooter();
  const [_, send] = useCartActor();

  const { data: recommendDishResponse } = nextApi.dishes.getRecommendedByDishId.useQuery(
    { id: dish?.id || 0, size: 3, page: 1 },
    { enabled: !!dish?.id },
  );

  const recommendDishes = recommendDishResponse?.data;

  const toggleSlideOver = (state: boolean) => () => {
    state && dish
      ? send({ type: 'SELECT_DISH_TO_ADD', payload: dish })
      : send({ type: 'DESELECT_DISH' });
  };

  const handleClickMore = () => {
    setIsMore((prevIsMore) => !prevIsMore);
  };

  const onBack = () => {
    router.back();
  };

  const onShowMore = () => {
    filter({ dishIds: dish?.id ? [dish.id] : [] }, '/exploring-food/recommend');
  };

  if (!dish) return null;
  return (
    <div className="wrap-dish-detail lg:full-fledge">
      <div className={classcat(['lg:flex lg:h-[calc(100vh-120px)] lg:flex-col'])}>
        {/* 80px: header | 40px: padding-bottom | 24px:gap with add-to-cart | 48px: height-add-tocart */}
        <div className="flex max-h-[calc(100vh_-_80px_-_40px_-_24px_-_48px)] flex-col lg:mb-6 lg:grow-[1]">
          <div
            onClick={onBack}
            className={classcat([
              'mt-4 flex h-7.5 w-7.5 items-center justify-center border border-blu-100 py-1.5',
              'group hover:bg-yel-50 hover:shadow-btn-navy-outlined-hover',
              'md:mt-10',
            ])}
          >
            <ArrowLeftIcon className="h-4 w-4 group-hover:text-yel-500" />
          </div>
          <p ref={nameTagRef} className={classcat(['mt-4 text-18 text-blu-400', 'md:text-24'])}>
            {dish.name}
          </p>
          {/* <div className={classcat(['hidden lg:contents'])}> */}
          <ContentTabs dish={dish} className="hidden lg:block" />
          {/* </div> */}
        </div>
        {/* Add to cart btn */}
        <div className="wrap-price-add-to-cart">
          <div className="space-i-2">
            {/* <span className={classcat('text-12lig text-blu-200 line-through')}>
              {dish.sizes?.find((size) => size.default)?.price.toFixed(2)} AED
            </span> */}
            <span className={classcat(['text-18 font-bold text-blu-400', 'md:text-24'])}>
              {dish.sizes?.find((size) => size.default)?.price.toFixed(2)} AED
            </span>
          </div>
          {dish.inStock ? (
            <TooltipRadix delayDuration={300} description="Add to cart" asChild>
              <Button
                onClick={toggleSlideOver(true)}
                type="button"
                color="navy"
                leadingIcon={<PlusIcon className="text-white" />}
                className="btn-big ow:w-[theme(spacing[38.75])]"
                variant="filled"
              >
                <span>Add to cart</span>
              </Button>
            </TooltipRadix>
          ) : (
            <div
              className={classcat([
                'flex items-center justify-center rounded-full border border-solid border-red-500 bg-red-200 py-2 pi-10',
              ])}
            >
              <span className="text-12lig text-red-800">Sold out</span>
            </div>
          )}
        </div>
      </div>
      <div
        className={classcat([
          'mt-2 pb-36',
          'lg:mt-0 lg:max-h-[calc(100vh-80px)] lg:overflow-auto  lg:scrollbar-hide',
          recommendDishes && recommendDishes?.length > 0 ? ' lg:pb-32' : ' lg:pb-0',
        ])}
      >
        <div>
          <Slider
            slickList={
              dish.images?.map((src) => `${process.env.NEXT_PUBLIC_CDN_HOST}${src}`) as string[]
            }
            MoreButton={
              <>
                {dish.presentation && !isMore && (
                  <Button
                    onClick={handleClickMore}
                    type="button"
                    color="secondary"
                    className={classcat([
                      'btn-small absolute bottom-0 start-1/2 mb-[7.5px] block -translate-x-1/2 mi-auto ow:w-[theme(spacing.20)]',
                      'md:hidden',
                    ])}
                    variant="filled"
                  >
                    MORE
                  </Button>
                )}
              </>
            }
            shouldHideArrowButtonWhenOnlyOne
          />
        </div>
        {isMore && dish.presentation ? (
          <div className="mx-[calc(var(--site-pad)_*_-1)] mt-5.5 space-y-2 bg-yel-50 py-4 lg:mx-[unset] lg:hidden">
            <BrowserOnly>
              <div
                className="rich-text-presentation rich-text px-3.75 lg:hidden"
                dangerouslySetInnerHTML={{ __html: processHtml(dish.presentation.trim()) }}
              />
            </BrowserOnly>
            <Button
              onClick={handleClickMore}
              type="button"
              color="secondary"
              className={classcat(['btn-small mx-auto', 'ow:w-[theme(spacing.20)]'])}
              variant="filled"
            >
              LESS
            </Button>
          </div>
        ) : null}
        {dish.presentation ? (
          <BrowserOnly>
            <div
              className={classcat([
                'rich-text-presentation rich-text hidden bg-yel-50 p-3.5 pt-10',
                'lg:mt-2 lg:block lg:p-15',
              ])}
              dangerouslySetInnerHTML={{ __html: processHtml(dish.presentation.trim()) }}
            />
          </BrowserOnly>
        ) : null}
        <div className={classcat(['mt-9.5 block', 'lg:mt-0 lg:hidden'])}>
          <ContentTabs dish={dish} />
        </div>
        <Show when={recommendDishes && recommendDishes?.length > 0}>
          <div
            className={classcat([
              '-me-6 ms-[calc(var(--site-pad)_*_-1)] space-y-6 ps-6',
              'sm:me-[unset]',
              'lg:mx-[unset] lg:space-y-10 lg:px-[unset]',
            ])}
          >
            <div className="mt-10 flex items-center justify-between">
              <h3
                className={classcat([
                  'text-center text-18 text-blu-400',
                  'md:text-start md:text-28',
                ])}
              >
                Maybe you'll like
              </h3>
              <Show when={recommendDishResponse && recommendDishResponse?.meta.total > 3}>
                <Button
                  onClick={onShowMore}
                  variant="ghost"
                  className="me-6.5 md:btn-medium md:me-20.5"
                  trailingIcon={<ArrowRightIcon />}
                >
                  Show more
                </Button>
              </Show>
            </div>
            <div
              className={classcat([
                'grid grid-flow-col justify-start gap-6 overflow-x-scroll scrollbar-hide',
                'lg:gap-6 lg:overflow-auto',
              ])}
            >
              {recommendDishes?.filter(Boolean).map((item, i) => (
                <DishCard.RatioSixDivFive
                  collisionPadding={{
                    bottom: 104,
                  }}
                  //@ts-ignore //temperarily
                  dishes={item}
                  key={i}
                  className="md:w-[theme(spacing.60)]"
                />
              ))}
            </div>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default ContentDish;
