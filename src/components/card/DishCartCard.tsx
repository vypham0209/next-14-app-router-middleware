'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
import { DishesType } from '@prisma/client'
import { createContext, useContext } from 'react'
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { dishTypeLabel } from '_@landing/constants/dish-type'
import { calcTotalPriceOfDish } from '_@landing/utils/calculate'
import { DishesInContext, useCartActor } from '_@landing/machine/cart'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
import DeleteModal from '_@landing/components/confirm-modal/DeleteModal'
//SHARED
import DeleteIcon from '_@shared/icons/DeleteIcon'
import { RouterOutputs } from '_@shared/utils/api'

type DishType =
  | DishesInContext[number]
  | NonNullable<RouterOutputs['order']['getOrderById']>['cart']['dishesInCart'][number]

export const CartCardContext = createContext<{ dish: DishType }>({} as any)

type RootProps = { dish: DishType } & React.ComponentPropsWithoutRef<'section'>

const Root = ({ dish, children, className, ...props }: RootProps) => {
  return (
    <CartCardContext.Provider value={{ dish }}>
      <div
        className={classcat(['space-x-6 border-b border-blu-100 pb-4', 'md:pb-6', className])}
        {...props}
      >
        <div
          className={classcat([
            'grid grid-flow-col grid-cols-[theme(spacing[16])_1fr] items-start gap-3 md:grid-cols-[theme(spacing[22.5])_1fr] md:gap-4',
          ])}
        >
          {children}
        </div>
      </div>
    </CartCardContext.Provider>
  )
}

const ProductImage = ({ children, className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const { dish } = useContext(CartCardContext)
  return (
    <div className={classcat(['relative w-16 md:w-22.5', className])} {...props}>
      <AspectRatio.Root ratio={1 / 1}>
        <img
          src={process.env.NEXT_PUBLIC_CDN_HOST + dish?.images[0] || ''}
          alt="image"
          className={classcat(['h-full w-full object-cover'])}
        />
      </AspectRatio.Root>
      {children}
    </div>
  )
}

const NameAndQuantity = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const { dish } = useContext(CartCardContext)
  return (
    <div className={classcat(['flex items-start space-x-1 ', className])} {...props}>
      <p className={classcat(['truncate text-14 font-bold text-blu-400 ', 'md:text-18'])}>
        {dish.name}
      </p>
      <p className={classcat(['whitespace-nowrap text-14 font-bold text-yel-500 ', 'md:text-18'])}>
        x {dish.amount}
      </p>
    </div>
  )
}

const Price = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const { dish } = useContext(CartCardContext)
  const price = calcTotalPriceOfDish(dish)
  return (
    <Show when={price >= 0}>
      <p
        className={classcat([
          'whitespace-nowrap text-14 font-bold text-blu-400',
          'text-right md:text-18',
          className,
        ])}
        {...props}
      >
        {price.toFixed(2)} AED
      </p>
    </Show>
  )
}

const Description = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const { dish } = useContext(CartCardContext)
  return (
    <Show when={dish?.size}>
      <p className={classcat(['text-12lig text-blu-400', 'md:text-14lig', className])} {...props}>
        {dishTypeLabel?.[dish?.type || DishesType.FOOD]}: {dish?.size?.name}
        {dish.addons.length ? `/ ` : ''}
        {dish.addons
          .map((addon) => `${addon.name}: ${addon.options.map((opt) => opt.name).join(', ')}`)
          .join(' / ')}
      </p>
    </Show>
  )
}

const Note = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const {
    dish: { note },
  } = useContext(CartCardContext)
  return (
    <Show when={note?.replace(/\s+/g, '').length}>
      <div
        className={classcat(['flex justify-start space-x-1 bg-yel-50 p-0.5', 'md:p-1', className])}
        {...props}
      >
        <p className={classcat(['text-12 text-blu-400', 'md:text-14 '])}>Note: </p>
        <p className={classcat(['truncate text-12lig text-blu-400', 'md:text-14lig'])}>{note}</p>
      </div>
    </Show>
  )
}

const Remove = ({ className, ...props }: React.ComponentPropsWithoutRef<'button'>) => {
  const { dish } = useContext(CartCardContext)

  const [_, send] = useCartActor()

  const onRemove = (id: string) => async () => {
    send({ type: 'REMOVE_ITEM', payload: { id } })
  }

  return (
    <DeleteModal asChild onDelete={onRemove(dish.id)} isShowToast={false}>
      <button
        className={classcat([
          'absolute -start-2 -top-2 flex h-[calc(30rem/16)] w-[calc(30rem/16)] items-center justify-center bg-red-500',
          className,
        ])}
        {...props}
      >
        <DeleteIcon className="h-4 w-4 text-white" />
      </button>
    </DeleteModal>
  )
}

const Error = ({
  className,
  error,
  ...props
}: React.ComponentPropsWithoutRef<'p'> & { error?: boolean }) => {
  return (
    <Show when={error}>
      <p className={classcat(['text-12lig text-red-500', 'md:text-14lig', className])} {...props}>
        Not available. Please remove item to place order.
      </p>
    </Show>
  )
}

const Default = ({
  error,
  ...props
}: RootProps & {
  error?: boolean
}) => {
  return (
    <Root {...props}>
      <ProductImage>
        <Show when={error}>
          <Remove />
        </Show>
      </ProductImage>
      <div
        className={classcat([
          'flex w-full items-start gap-2 overflow-hidden',
          'md:grid-flow-col md:gap-6',
        ])}
      >
        <div
          className={classcat(['flex flex-1 flex-col space-y-2 overflow-hidden', 'md:space-y-3'])}
        >
          <NameAndQuantity />
          <Description />
          <Note />
          <Error error={error} />
        </div>
        <Price />
      </div>
    </Root>
  )
}

const DishCartCard = {
  Default: Default,
  Root,
  Image: ProductImage,
  NameAndQuantity,
  Description,
  Note,
  Remove,
  Price,
  Error,
}

export default DishCartCard
