//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import Link from 'next-intl/link';
import * as HoverCard from '@radix-ui/react-hover-card';
import { firstUpper } from '_@landing/utils/wordFormat';
import { createContext, forwardRef, Fragment, useContext, useState } from 'react';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
import TooltipRadix from '_@shared/components/Tooltip';
//SHARED
import PlusIcon from '_@shared/icons/PlusIcon';
import SpicyIcon from '_@shared/icons/SpicyIcon';
import AllergenIcon from '_@shared/icons/AllergenIcon';
//HOOK, SERVER
import useDragScroll from '_@landing/hook/useDragScroll';
import useIsOverOffsetWidth from '_@landing/hook/useIsOverOffsetWidth';
import useSetDataSizeElement from '_@landing/hook/useSetDataSizeElement';
//TYPES MODULES
import type { Allergens } from '@prisma/client';
import type { ComponentPropsWithoutRef } from 'react';
import type { RouterOutputs } from '_@shared/utils/api';

export type DishType = NonNullable<RouterOutputs['dishes']['getDishById']>;
type CollisionPadding = HoverCard.HoverCardContentProps['collisionPadding'];
type CardRootType = {
  dishes: DishType;
  collisionPadding?: CollisionPadding;
} & ComponentPropsWithoutRef<'div'>;

type Context = {
  dishes: DishType;
  collisionPadding?: CollisionPadding;
};
const DishCardContext = createContext<Context>({} as any);

type ShowMoreDotsType = ComponentPropsWithoutRef<'button'> & {
  withPortal?: boolean;
  owStyle?: {
    contentClasses?: string;
  };
};

const ShowMoreDots = ({ children, className, owStyle, withPortal, ...props }: ShowMoreDotsType) => {
  const { collisionPadding } = useContext(DishCardContext);
  const Wrap = withPortal ? HoverCard.Portal : Fragment;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HoverCard.Root open={isOpen} onOpenChange={setIsOpen} openDelay={100}>
      <button
        className={classcat(['flex items-center', className])}
        onClick={() => {
          setIsOpen((prev) => !prev);
          return false;
        }}
        {...props}
      >
        <HoverCard.Trigger asChild>
          <div className="space-i-1 flex grow-0 bg-blu-50 px-1 py-1.5">
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={index} className="h-1 w-1 rounded-full bg-blu-100" />
            ))}
          </div>
        </HoverCard.Trigger>
        <Wrap>
          <HoverCard.Content
            collisionPadding={collisionPadding}
            sticky="always"
            className={owStyle?.contentClasses}
            sideOffset={5}
            align="end"
            side="bottom"
            style={{ zIndex: 1 }}
          >
            {children}
          </HoverCard.Content>
        </Wrap>
      </button>
    </HoverCard.Root>
  );
};

const Root = ({ dishes, className, collisionPadding, ...props }: CardRootType) => {
  const ref = useSetDataSizeElement();
  return (
    <DishCardContext.Provider
      value={{
        dishes,
        collisionPadding,
      }}
    >
      <div ref={ref} className={classcat(['flex w-full flex-col', className])} {...props}>
        {props.children}
      </div>
    </DishCardContext.Provider>
  );
};

function ImageCard({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { dishes } = useContext(DishCardContext);

  return (
    <div className={classcat(['relative z-[1px]', className])} {...props}>
      <Image
        className="bg-blu-50/20 object-cover"
        src={process.env.NEXT_PUBLIC_CDN_HOST + dishes?.images?.[0] || '/images/placeholder.png'}
        alt={dishes?.name}
        fill
        unoptimized
        sizes="(max-width: 640px) 100vw, 640px"
      />
      {props.children}
    </div>
  );
}

function CategoryButton({ category }: { category: DishType['category'][number] }) {
  return (
    <Button
      className={classcat([
        'shrink-0 md:btn-medium',
        'group-data-[is-dragging=true]/button:pointer-events-none',
      ])}
      variant="ghost"
      as="link"
      href={`/exploring-food?categoryId=${category.id}`}
    >
      {category.name}
    </Button>
  );
}

function Catagories() {
  const { dishes } = useContext(DishCardContext);
  const ref = useDragScroll();
  const isOver = useIsOverOffsetWidth(ref, dishes.id);

  return (
    <>
      <div className="space-i-3.5 relative flex">
        <div
          ref={ref}
          className={classcat([
            isOver ? 'cursor-grab data-[is-dragging=true]:cursor-grabbing' : '',
            'space-i-4 flex flex-1 scrollbar-hide',
            'group/button  overflow-auto',
          ])}
        >
          {dishes?.category?.map((category) => (
            <CategoryButton category={category} key={category.id} />
          ))}
        </div>

        <Show when={isOver}>
          <ShowMoreDots
            owStyle={{
              contentClasses: 'w-[--data-size-element-width]',
            }}
          >
            <div className="space-i-4 flex flex-wrap justify-center bg-yel-50 px-4 py-2 ">
              {dishes.category?.map((category) => (
                <CategoryButton category={category} key={category.id} />
              ))}
            </div>
          </ShowMoreDots>
        </Show>
      </div>
    </>
  );
}

function NameAndDescription() {
  const { dishes } = useContext(DishCardContext);

  return (
    <>
      <p className="truncate text-16 text-blu-400 sm:text-18">{firstUpper(dishes?.name)}</p>
      <p className="line-clamp-2 text-12lig text-blu-300 sm:text-14lig">
        {firstUpper(dishes?.description)}
      </p>
    </>
  );
}

const AllergenButton = ({
  allergen,
  ...props
}: { allergen: Allergens } & ComponentPropsWithoutRef<'span'>) => {
  return (
    <span
      className={classcat([
        'h-8 w-8',
        'flex shrink-0 items-center justify-center transition-colors duration-100',
        'rounded-sm border border-blu-200 bg-yel-25 text-blu-500',
        'hover:border-yel-500 hover:bg-yel-100',
      ])}
      {...props}
    >
      <AllergenIcon name={allergen.name}></AllergenIcon>
    </span>
  );
};

const AllergenButtonWithTooltip = ({ allergen }: { allergen: Allergens }) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipRadix open={open} description={`Contains ${allergen.name}`}>
      <AllergenButton
        //support mobile and desktop
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        allergen={allergen}
      />
    </TooltipRadix>
  );
};

function AllergenAndSpicy() {
  const { dishes } = useContext(DishCardContext);
  const ref = useDragScroll();
  const isOver = useIsOverOffsetWidth(ref, dishes.id);

  return (
    <div className="space-i-2 flex items-center justify-between ">
      <div className="relative flex w-full items-center justify-end">
        <div
          ref={ref}
          className={classcat([
            isOver ? 'cursor-grab data-[is-dragging=true]:cursor-grabbing' : '',
            'space-i-2 absolute inset-x-0 z-[0] flex h-8.25 flex-1 scrollbar-hide',
            'group/button overflow-auto pr-1',
          ])}
        >
          {dishes?.allergens?.map((allergen) => (
            <AllergenButtonWithTooltip key={allergen.id} allergen={allergen} />
          ))}
        </div>

        <Show when={isOver}>
          <ShowMoreDots
            withPortal
            className="absolute right-0 h-10 w-14 items-center justify-end bg-show-more"
            owStyle={{
              contentClasses: 'w-[327px]',
            }}
          >
            <div className="grid grid-cols-2 justify-center gap-x-4 gap-y-1 bg-yel-50 px-4 py-2 ">
              {dishes?.allergens?.map((allergen) => (
                <div className="space-i-2 flex items-center" key={allergen.id}>
                  <AllergenButton allergen={allergen} />
                  <span className="text-12lig text-blu-400">{allergen.name}</span>
                </div>
              ))}
            </div>
          </ShowMoreDots>
        </Show>
      </div>

      <SpicyIcon className="shrink-0" level={dishes.spicyLevel} size="small" />
    </div>
  );
}

const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
function PriceDisplay() {
  const { dishes } = useContext(DishCardContext);
  const sizeDefault = dishes.sizes?.find((size) => size.default);

  return (
    <div className="space-i-2">
      {/* <span className="text-12lig text-blu-200 line-through">
        {round(sizeDefault?.price || 0)} AED
      </span> */}
      <span className="text-18 font-bold text-blu-400">{round(sizeDefault?.price || 0)} AED</span>
    </div>
  );
}

function Line() {
  return <div className="h-px w-full bg-blu-100"></div>;
}

const AddToCartButton = forwardRef<
  HTMLButtonElement,
  Pick<ComponentPropsWithoutRef<'button'>, 'className' | 'onClick' | 'disabled'>
>(function forwardRef({ className, ...props }, ref) {
  return (
    <Button
      color="navy"
      className={classcat(['btn-medium ow:h-9 ow:w-9', className])}
      ref={ref}
      {...props}
    >
      <TooltipRadix asChild delayDuration={300} withPortal={false} description="Add to cart">
        <span className="flex h-full w-full items-center justify-center">
          <PlusIcon className="text-white" />
        </span>
      </TooltipRadix>
    </Button>
  );
});

function SoldOut() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-yel-1000/30">
      <span className="text-24 uppercase text-white">Sold Out</span>
    </div>
  );
}

function DishCardDefault({ soldOut, ...props }: CardRootType & { soldOut?: boolean }) {
  return (
    <DishCard.Root className="space-y-3 sm:space-y-6" {...props}>
      <Link href={`/dish-detail/${props.dishes.id}`}>
        <DishCard.Image className="aspect-[6/5] w-full sm:aspect-[5/6]">
          <Show when={soldOut}>
            <DishCard.SoldOut />
          </Show>
        </DishCard.Image>
      </Link>

      <div className="flex flex-1 flex-col space-y-2 sm:space-y-4">
        <div className="flex-1 space-y-1">
          <DishCard.Catagories />
          <Link className="grid gap-1" href={`/dish-detail/${props.dishes.id}`}>
            <DishCard.NameAndDescription />
          </Link>
        </div>
        <div className="space-y-2 sm:space-y-4">
          <DishCard.AllergenAndSpicy />
          <DishCard.Line />
          <div className="flex items-center justify-between">
            <DishCard.PriceDisplay />
            <DishCard.AddToCartButton />
          </div>
        </div>
      </div>
    </DishCard.Root>
  );
}

type RatioSixDivFive = CardRootType & { className: string; soldOut?: boolean };
function RatioSixDivFive({ className, soldOut, ...props }: RatioSixDivFive) {
  return (
    <DishCard.Root className="space-y-3" {...props}>
      <Link href={`/dish-detail/${props.dishes.id}`}>
        <DishCard.Image
          className={classcat([
            'aspect-[6/5] w-[theme(spacing[50])] xl:w-[290px] 2xl:w-[450px]',
            className,
          ])}
        >
          <Show when={soldOut}>
            <DishCard.SoldOut />
          </Show>
        </DishCard.Image>
      </Link>
      <div className="flex w-50 flex-1 flex-col space-y-3 xl:w-[290px] xl:px-4 2xl:w-[450px]">
        <div className="flex-1 space-y-3">
          <Link href={`/dish-detail/${props.dishes.id}`}>
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
  );
}

const DishCard = {
  Default: DishCardDefault,
  RatioSixDivFive,
  Root,
  SoldOut,
  Image: ImageCard,
  Catagories,
  NameAndDescription,
  AllergenAndSpicy,
  PriceDisplay,
  AddToCartButton,
  Line,
};

export default DishCard;
