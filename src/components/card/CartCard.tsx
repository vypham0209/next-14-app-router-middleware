'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
import { DishesType } from '@prisma/client'
import { createContext, useContext } from 'react'
import { dishTypeLabel } from '_@landing/constants/dish-type'
import { DishesInContext, useCartActor } from '_@landing/machine/cart'
import { calcTotalCaloriesOfDish, calcTotalPriceOfDish } from '_@landing/utils/calculate'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
import DeleteModal from '_@landing/components/confirm-modal/DeleteModal'
//SHARED
import EditIcon from '_@shared/icons/EditIcon'
import DeleteIcon from '_@shared/icons/DeleteIcon'

type DishType = DishesInContext[number]

export const CartCardContext = createContext<{ dish: DishType }>({} as any)

type RootProps = { dish: DishType } & React.ComponentPropsWithoutRef<'section'>

const Root = ({ dish, children, className, ...props }: RootProps) => {
  return (
    <CartCardContext.Provider value={{ dish }}>
      <div className={classcat(['flex', className])} {...props}>
        {children}
      </div>
    </CartCardContext.Provider>
  )
}

const ProductImage = ({ children, className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const { dish } = useContext(CartCardContext)
  return (
    <div className={classcat(['relative shrink-0', className])} {...props}>
      <img
        src={process.env.NEXT_PUBLIC_CDN_HOST + dish?.images[0] || ''}
        className="h-full w-full object-cover"
        alt=""
      />

      {children}
    </div>
  )
}

const NameAndQuantity = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const { dish } = useContext(CartCardContext)
  return (
    <div className={classcat(['space-i-1 flex items-center', className])} {...props}>
      <p className="line-clamp-1 grow text-14 font-bold text-blu-400 md:text-18">{dish?.name}</p>
      <span className="shrink-0 text-14 font-bold text-yel-500 md:text-18">x {dish.amount}</span>
    </div>
  )
}

const Description = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const { dish } = useContext(CartCardContext)
  return (
    <Show when={dish?.size}>
      <p className={classcat(['line-clamp-2 text-blu-400', className])} {...props}>
        {dishTypeLabel?.[dish?.type || DishesType.FOOD]}: {dish?.size?.name}{' '}
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
      <p
        className={classcat([
          'line-clamp-1 bg-yel-50 font-medium text-blu-400 pi-1 md:py-1',
          className,
        ])}
        {...props}
      >
        <span className={classcat(['text-12 text-blu-400', 'md:text-14 '])}>Note: </span>
        {note}
      </p>
    </Show>
  )
}

const Price = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const { dish } = useContext(CartCardContext)
  const price = calcTotalPriceOfDish(dish)
  return (
    <Show when={price}>
      <p className={classcat(['line-through', className])} {...props}>
        {price?.toFixed(2)} AED
      </p>
    </Show>
  )
}

const DiscountPrice = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const { dish } = useContext(CartCardContext)
  const price = calcTotalPriceOfDish(dish)
  return (
    <Show when={price}>
      <p className={className} {...props}>
        {price?.toFixed(2)} AED
      </p>
    </Show>
  )
}

const Kcal = ({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) => {
  const { dish } = useContext(CartCardContext)
  const calories = calcTotalCaloriesOfDish(dish)
  return (
    <Show when={calories}>
      <span
        className={classcat(['inline-block rounded-full bg-blu-50 py-0.25 pi-2', className])}
        {...props}
      >
        {calories}kcal
      </span>
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

const Edit = ({
  className,
  handleEditDish,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & { handleEditDish: (data: DishType) => void }) => {
  const { dish } = useContext(CartCardContext)

  const onEditCard = () => {
    handleEditDish(dish)
  }

  return (
    <button onClick={onEditCard} className={className} {...props}>
      <EditIcon />
    </button>
  )
}

const CartCardDefault = ({
  handleEditDish,
  ...props
}: RootProps & {
  handleEditDish: (data: DishType) => void
}) => {
  return (
    <Root className="space-i-3 md:space-i-6" {...props}>
      <ProductImage className="h-[calc(96rem/16)] w-[calc(96rem/16)] md:h-[calc(164rem/16)] md:w-[calc(164rem/16)]">
        <Remove />
      </ProductImage>
      <div className="flex grow flex-col md:space-y-4">
        <div className="grow md:space-y-3">
          <NameAndQuantity />
          <Description className="mt-2 text-12lig md:text-14lig" />
          <Note className="mt-2 text-12lig md:text-14lig" />
        </div>
        <div className="mt-2.5 md:hidden">
          <Kcal className="text-12lig text-blu-400 md:text-14lig" />
        </div>
        <div className="space-i-4 mt-1 flex items-end justify-between">
          <div className="space-i-2 flex items-center md:space-i-4">
            <div className="space-i-1 flex items-center">
              {/* <Price className="text-12lig text-blu-200" /> */}
              <DiscountPrice className="text-14 font-bold text-blu-400 md:text-18" />
              <Kcal className="hidden text-12lig text-blu-400 md:ms-4 md:block md:text-14lig" />
            </div>
          </div>

          <Edit handleEditDish={handleEditDish} />
        </div>
      </div>
    </Root>
  )
}

const CartCard = {
  CartCardDefault,
  Root,
  Image: ProductImage,
  NameAndQuantity,
  Description,
  Note,
  Price,
  DiscountPrice,
  Kcal,
  Remove,
  Edit,
}

export default CartCard
