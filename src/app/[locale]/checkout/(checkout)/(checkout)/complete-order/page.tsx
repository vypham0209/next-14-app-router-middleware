'use client'

//THIRD PARTY MODULES
import dayjs from 'dayjs'
import classcat from 'classcat'
import { useRouter } from 'next-intl/client'
import { Elements } from '@stripe/react-stripe-js'
import { CartValidateError } from '_@rpc/routers/cart/cart.services'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { PaymentFor } from '_@rpc/routers/payment/payment.validators'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeliverySlot, DeliveryType, PaymentMethod } from '@prisma/client'
import { calcBilling, calcTotalPriceOfDish } from '_@landing/utils/calculate'
import { TConfig, useMealPlanActor } from '_@landing/machine/meal-plan.machine'
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider'
import { formatPhoneNumber, getDialCodeFromId } from '_@landing/utils/phoneFormat'
import { CustomizePlanSchema } from '_@landing/app/[locale]/meal-plan/schema/customize-plan-schema'
import { BillSumary as BillSumaryType, DishesInContext, useCartActor } from '_@landing/machine/cart'
import BillSumary from '_@landing/app/[locale]/checkout/(checkout)/(checkout)/complete-order/comps/BillSumary'
import { preOrderDateSchema } from '_@landing/app/[locale]/checkout/(checkout)/(checkout)/information/interface'
import {
  CalculateMealPlanSubTotalInput,
  CreateMealPlanOrderInput,
} from '_@rpc/routers/meal-plan/meal-plan.schema'
//LAYOUT, COMPONENTS
import Portal from '_@shared/components/Portal'
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import Switch from '_@shared/components/conditions/Switch'
import DishCartCard from '_@landing/components/card/DishCartCard'
//SHARED
import CardIcon from '_@shared/icons/CardIcon'
import CashIcon from '_@shared/icons/CashIcon'
import MailIcon from '_@shared/icons/MailIcon'
import NoteIcon from '_@shared/icons/NoteIcon'
import UserIcon from '_@shared/icons/UserIcon'
import { TAX } from '_@landing/constants/shared'
import PhoneIcon from '_@shared/icons/PhoneIcon'
import LocationIcon from '_@shared/icons/LocationIcon'
import { RouterInputs, nextApi } from '_@shared/utils/api'
import { useToastStore } from '_@shared/stores/toast/useToastStore'
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString'
//RELATIVE MODULES
import PaymentModal from './comps/PaymentModal'
import MealPlanInfo from './comps/MealPlanInfo'
import { MAX_TIMES_FAILED_PAYMENTS } from '../constant'
import TroublePayingModal from './comps/TroublePayingModal'
import { CheckOutType } from '../../../types/checkout-type'
import { OrderInfo, useOrderContext } from '../../context/OrderContext'

const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const validErrorCode = [
  'OUT_OF_STOCK',
  'SIZE_NOT_EXISTED',
  'ADDON_NOT_EXISTED',
  'ADDON_OPTION_NOT_EXISTED',
]

const renderData = (data?: OrderInfo, dialCode?: string) => {
  if (!data) return []
  return [
    { icon: LocationIcon, label: data.address },
    { icon: PhoneIcon, label: formatPhoneNumber(data.phoneNumber, dialCode) },
    { icon: UserIcon, label: data.customerName },
    { icon: MailIcon, label: data.email },
    { icon: NoteIcon, label: data.note },
  ]
}

const stripeElementOption: StripeElementsOptions = {
  fonts: [
    {
      cssSrc: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&display=swap',
    },
  ],
  appearance: {
    theme: 'none',
    variables: {
      fontSizeBase: '14px',
      fontFamily: 'Outfit, sans-serif',
      borderRadius: '0px',
    },
    rules: {
      '.Input': {
        color: '#00314F',
        border: '1px solid #BFCDD5',
        backgroundColor: 'transparent',
        marginBottom: '6px',
      },
      '.Label': {
        color: '#00314F',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '8px',
      },
    },
  },
}

export default function CheckoutPage() {
  const { showToast } = useToastStore()
  const { orderInfo, timesOfFailedPayments, setTimesOfFailedPayments } = useOrderContext()
  const [clientSecret, setClientSecret] = useState<string>()
  const [orderId, setOrderId] = useState<string>('')
  const [deliveryType, setDeliveryType] = useState<string>('')
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false)
  const [stripePromise] = useState(() =>
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string),
  )
  const [errors, setErrors] = useState<Array<string | number>>([])
  const triggerRef = useRef<HTMLButtonElement>(null)
  const filter = useFilterQueryString()
  const global = useGlobalContext()
  const userId = global.user?.id
  const countryOptions = global.countryOptions || []
  const router = useRouter()
  const [{ context }, orderSend] = useCartActor()
  const { dishes, cartId } = context
  const [
    {
      context: { plan: mealPlan, config: mealPlanConfig },
    },
    mealPlanSend,
  ] = useMealPlanActor()
  const utils = nextApi.useContext()

  const isMealPlan = useMemo(() => orderInfo?.type === CheckOutType.MealPlan, [orderInfo?.type])

  const { data: totalPriceMealPlan } = nextApi.mealPlan.calculateMealPlanSubTotal.useQuery(
    {
      dishesInMealPlanOrder: flatDataMealPlan(mealPlan),
    },
    {
      enabled: isMealPlan,
    },
  )

  const billSummaryMealPlan = useMemo(() => {
    return {
      kcalTotal: 0,
      subTotal: totalPriceMealPlan?.data || 0,
      tax: 0,
      total: totalPriceMealPlan?.data || 0,
      shippingCost: 0,
      promoDiscount: 0,
    }
  }, [totalPriceMealPlan?.data])

  const billSummary: BillSumaryType = useMemo(() => {
    let totalCalories = 0
    let subTotal = 0
    if (dishes) {
      const { totalCalories: _totalCalories, subTotal: _subTotal } = calcBilling(dishes)
      totalCalories = _totalCalories
      subTotal = _subTotal
    }

    return {
      kcalTotal: totalCalories,
      subTotal: subTotal,
      tax: TAX * subTotal,
      total: subTotal - TAX * subTotal,
      shippingCost: 0,
      promoDiscount: 0,
    }
  }, [dishes])

  const { mutate: validateCartGuest } = nextApi.cart.validateGuestCart.useMutation({
    onSuccess: (rp) => setErrors(rp.errorMessages),
    onError: () => setErrors([]),
  })

  const { mutate: validateCartUser } = nextApi.cart.validateCartById.useMutation({
    onSuccess: (rp) => setErrors(rp.errorMessages),
    onError: () => setErrors([]),
  })

  const { mutate: createPaymentIntent } = nextApi.payment.createPayment.useMutation({
    onSuccess: (data) => {
      const clientSecret = data.clientSecret as string
      stripeElementOption.clientSecret = clientSecret
      setIsModalPaymentOpen(true)
      setClientSecret(clientSecret)
    },
    onError: () => {
      showToast({ type: 'error', description: 'Something went wrong.' })
    },
  })

  const { mutate: createUserOrder, isLoading: isCreatingUserOrder } =
    nextApi.order.createUserOrder.useMutation({
      onSuccess: ({ id, email, total, deliveryType }) => {
        if (orderInfo && orderInfo.paymentMethod === PaymentMethod.CARD) {
          setOrderId(id)
          setDeliveryType(deliveryType)
          createPaymentIntent({
            amount: total,
            metadata: {
              email,
              orderId: id,
              userId,
            },
          })
          return
        }
        orderSend({ type: 'CHECKOUT_CART_DONE' })
        setTimesOfFailedPayments(0)
        filter({ order_id: id, delivery_type: deliveryType }, '/checkout/done')
        showToast({ type: 'success', description: 'Order placed' })
        utils.userProfile.getMyProfile.invalidate()
      },
      onError: ({ message }) => {
        setErrorsToStateAndToast(message)
      },
    })

  const { mutate: createGuestOrder, isLoading: isCreatingGuestOrder } =
    nextApi.order.createGuestOrder.useMutation({
      onSuccess: ({ email, id, total, deliveryType }) => {
        if (orderInfo && orderInfo.paymentMethod === PaymentMethod.CARD) {
          setOrderId(id)
          setDeliveryType(deliveryType)
          createPaymentIntent({
            amount: total,
            metadata: {
              email,
              orderId: id,
              userId,
            },
          })
          return
        }
        orderSend({ type: 'CHECKOUT_CART_DONE' })
        filter({ order_id: id, delivery_type: deliveryType }, '/checkout/done')
        showToast({ type: 'success', description: 'Order placed' })
      },
      onError: ({ message }) => {
        setErrorsToStateAndToast(message)
      },
    })

  const { mutate: createUserMealPlan, isLoading: isCreatingUserMealPlan } =
    nextApi.mealPlan.createUserMealPlanOrder.useMutation({
      onSuccess: ({ id, total, address }) => {
        if (orderInfo && orderInfo.paymentMethod === PaymentMethod.CARD) {
          setOrderId(id)
          setDeliveryType('')
          createPaymentIntent({
            amount: total,
            metadata: {
              email: address?.email || orderInfo.email,
              orderId: id,
              userId,
              payFor: PaymentFor.MEAL_PLAN,
            },
          })
          return
        }
        mealPlanSend({ type: 'CHECKOUT_DONE' })
        setTimesOfFailedPayments(0)
        filter({ order_id: id, checkout_type: CheckOutType.MealPlan }, '/checkout/done')
        showToast({ type: 'success', description: 'Meal plan placed' })
        utils.userProfile.getMyProfile.invalidate()
      },
      onError: ({ message }) => {
        showToast({ type: 'error', description: message })
      },
    })

  const { mutate: createGuestMealPlan, isLoading: isCreatingGuestMealPlan } =
    nextApi.mealPlan.createGuestMealPlanOrder.useMutation({
      onSuccess: ({ id, total, address }) => {
        if (orderInfo && orderInfo.paymentMethod === PaymentMethod.CARD) {
          setOrderId(id)
          setDeliveryType('')
          createPaymentIntent({
            amount: total,
            metadata: {
              email: address?.email || orderInfo.email,
              orderId: id,
              userId,
              payFor: PaymentFor.MEAL_PLAN,
            },
          })
          return
        }
        mealPlanSend({ type: 'CHECKOUT_DONE' })
        filter({ order_id: id, checkout_type: CheckOutType.MealPlan }, '/checkout/done')
        showToast({ type: 'success', description: 'Meal plan placed' })
      },
      onError: ({ message }) => {
        showToast({ type: 'error', description: message })
      },
    })

  const setErrorsToStateAndToast = (message: string) => {
    if (message) {
      try {
        const errorsObj = JSON.parse(message) as any
        const checkValidError = !(errorsObj as CartValidateError[]).find(
          (item) => !validErrorCode.includes(item.message),
        )
        if (checkValidError) {
          setErrors(errorsObj)
          showToast({ type: 'error', description: 'Validate cart was failed' })
        } else {
          showToast({
            type: 'error',
            description: errorsObj?.[0]?.message || 'Validate cart was failed',
          })
        }
      } catch (error) {
        showToast({ type: 'error', description: message })
        setErrors([])
      }
    }
  }

  const handlePlaceOrder = () => {
    if (!orderInfo) return
    const basePayload = getBaseOrderPayload(orderInfo, billSummary, userId)

    if (
      basePayload.orderCondition.deliveryType === 'PRE_ORDER' &&
      !preOrderDateSchema.safeParse(basePayload.orderCondition.preOrderDate).success
    ) {
      showToast({
        description: 'Pre-order time must be at least 2 hours in advance.',
        type: 'error',
      })
      return
    }

    if (userId) {
      if (!cartId) return
      const userPayload: RouterInputs['order']['createUserOrder'] = {
        ...basePayload,
        cartId,
      }
      createUserOrder(userPayload)
    } else {
      const guestPayload: RouterInputs['order']['createGuestOrder'] = {
        ...basePayload,
        cart: getOrderCartPayload(dishes),
      }
      createGuestOrder(guestPayload)
    }
  }

  const handlePlaceMealPlan = () => {
    if (!orderInfo) return
    const payload = getMealPlanPayload(mealPlanConfig, mealPlan, orderInfo, userId)
    if (userId) createUserMealPlan(payload)
    else createGuestMealPlan(payload)
  }

  const backToInformation = useCallback(() => {
    router.push('/checkout/information?scroll=payment-method')
  }, [router])

  const _showTroublePayingModalWhenFailManyTimes = useCallback(() => {
    if (
      orderInfo?.paymentMethod === 'CARD' &&
      timesOfFailedPayments >= MAX_TIMES_FAILED_PAYMENTS &&
      triggerRef.current
    ) {
      triggerRef.current.click()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderInfo?.paymentMethod])

  const _validateCart = useCallback(() => {
    if (!isMealPlan && orderInfo && dishes) {
      if (userId) {
        if (!cartId) return
        validateCartUser(cartId)
      } else {
        validateCartGuest(getOrderCartPayload(dishes))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartId, orderInfo, userId, validateCartGuest, validateCartUser])

  useEffect(() => {
    _showTroublePayingModalWhenFailManyTimes()
  }, [_showTroublePayingModalWhenFailManyTimes])

  useEffect(() => {
    if (!orderInfo) {
      router.replace('/checkout/information')
    }
  }, [orderInfo, router])

  useEffect(() => {
    _validateCart()
  }, [_validateCart])

  return (
    <>
      {clientSecret && (
        <Elements options={stripeElementOption} stripe={stripePromise}>
          <PaymentModal
            orderId={orderId}
            open={isModalPaymentOpen}
            deliveryType={deliveryType}
            setOpen={setIsModalPaymentOpen}
            checkOutType={orderInfo?.type}
          />
        </Elements>
      )}

      <div
        className={classcat([
          'pb-10 md:pb-36',
          'grid gap-10 md:gap-0',
          'md:space-i-10 lg:space-i-16 md:flex md:items-start',
        ])}
      >
        <div className="grid grow gap-6 md:gap-10">
          <div className="grid gap-2 md:gap-4">
            <h4 className="text-24 text-blu-400">Shipping to</h4>
            <div className="flex flex-col space-y-4">
              {renderData(orderInfo, getDialCodeFromId(countryOptions, orderInfo?.countryId)).map(
                (item, index) => {
                  const Icon = item.icon
                  return (
                    <Show key={index} when={item.label || Icon !== NoteIcon}>
                      <div className="space-i-2 flex items-center">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-12lig text-blu-400 md:text-14lig">{item.label}</span>
                      </div>
                    </Show>
                  )
                },
              )}
            </div>
          </div>
          <Show when={orderInfo?.deliveryType === DeliveryType.PRE_ORDER}>
            <div className="grid gap-2">
              <h4 className="text-24 text-blu-400">Delivery date & time</h4>
              <span className="text-14lig text-blu-400">
                {orderInfo?.date && orderInfo.time
                  ? dayjs(`${orderInfo?.date} ${orderInfo?.time}`).format('Do MMM YYYY, [at] HH:mm')
                  : ''}
              </span>
            </div>
          </Show>
          <div className="grid gap-4 md:gap-6">
            <h4 className="text-24 text-blu-400">Item list</h4>
            <Switch.Root>
              <Switch.Case when={isMealPlan}>
                <MealPlanInfo />
              </Switch.Case>
              <Switch.Case when={true}>
                <div className="grid gap-4 md:gap-6">
                  {dishes?.map((item, index) => {
                    return (
                      <DishCartCard.Default
                        key={index}
                        dish={item}
                        error={checkDishIsError(item, errors)}
                      />
                    )
                  })}
                </div>
              </Switch.Case>
            </Switch.Root>
          </div>
        </div>
        <BillSumary
          isLoading={
            isCreatingGuestOrder ||
            isCreatingUserOrder ||
            isCreatingUserMealPlan ||
            isCreatingGuestMealPlan
          }
          className="w-full md:max-w-[theme(space.80)] lg:max-w-[theme(space.100)]"
          data={isMealPlan ? billSummaryMealPlan : billSummary}
          paymentMethod={orderInfo?.paymentMethod}
          handlePlace={isMealPlan ? handlePlaceMealPlan : handlePlaceOrder}
        />
      </div>
      <Portal
        container={typeof window !== 'undefined' ? document.getElementById('main') : null}
        asChild
      >
        <div className="sticky bottom-0 grid gap-2.5 bg-yel-25 px-[--max-padding] pb-8 pt-4 full-fledge md:hidden">
          <Button
            isLoading={
              isCreatingGuestOrder ||
              isCreatingUserOrder ||
              isCreatingUserMealPlan ||
              isCreatingGuestMealPlan
            }
            className={classcat(['btn-big text-14'])}
            onClick={isMealPlan ? handlePlaceMealPlan : handlePlaceOrder}
            color="navy"
            disabled={errors.length > 0}
          >
            PLACE ORDER
          </Button>

          <div className="space-i-3 flex justify-center">
            <span className="text-14lig text-blu-500">Pay with</span>
            <Switch.Root>
              <Switch.Case when={orderInfo?.paymentMethod === PaymentMethod.CARD}>
                <div className="space-i-1 flex items-center">
                  <CardIcon className={classcat(['h-6 w-6'])} />
                  <p className="text-16 text-blu-500">Card</p>
                </div>
              </Switch.Case>
              <Switch.Case when={orderInfo?.paymentMethod === PaymentMethod.COD}>
                <div className="space-i-1 flex items-center">
                  <CashIcon className="h-6 w-6" />
                  <p className="text-16 text-blu-500">Cash</p>
                </div>
              </Switch.Case>
            </Switch.Root>
          </div>
        </div>
      </Portal>
      <TroublePayingModal onConfirm={backToInformation}>
        <button ref={triggerRef} className="hidden">
          Trigger
        </button>
      </TroublePayingModal>
    </>
  )
}

const getBaseOrderPayload = (
  orderInfo: OrderInfo,
  billSummary: BillSumaryType,
  userId?: string,
) => {
  return {
    shippingCost: billSummary.shippingCost,
    tax: billSummary.tax,
    subtotal: billSummary.subTotal,
    total: billSummary.total,
    orderCondition: {
      preOrderDate:
        orderInfo.date && orderInfo.time
          ? dayjs(`${orderInfo.date} ${orderInfo.time}`).toISOString()
          : undefined,
      deliveryType: orderInfo.deliveryType,
      paymentMethod: orderInfo.paymentMethod,
    },
    address: {
      name: orderInfo.name,
      address: orderInfo.address,
      customerName: orderInfo.customerName,
      email: orderInfo.email,
      note: orderInfo.note,
      phoneNumber: orderInfo.phoneNumber ? orderInfo.phoneNumber.split(' ').join('') : '',
      countryId: orderInfo.countryId,
      userId: userId,
    },
  }
}

const getOrderCartPayload = (dishes: DishesInContext) => {
  return {
    dishesInCart: dishes.map((dish) => ({
      dishId: Number(dish.originDishId),
      price: calcTotalPriceOfDish(dish),
      name: dish.name,
      calories: dish.calories,
      spicyLevel: dish.spicyLevel,
      type: dish.type,
      size: {
        price: dish.size?.price ?? 0,
        name: dish.size?.name ?? '',
        sizeId: dish.size?.originSizeId ?? '',
        calories: dish.size?.calories || 0,
      },
      addons: dish.addons.map((addon) => ({
        name: addon.name,
        addOnId: addon.originAddonId,
        options: addon.options.map((option) => ({
          price: option.price ?? 0,
          name: option.name,
          optionId: option.originAddonOptionId,
          calories: option.calories || 0,
        })),
      })),
      amount: dish.amount,
      note: dish.note || undefined,
    })),
  }
}

const checkDishIsError = (
  dish: DishesInContext[number],
  errors: Array<string | number>,
): boolean => {
  return !!errors.find((id) => id === dish.originDishId)
}

const flatDataMealPlan = (data: CustomizePlanSchema) => {
  const flattenedData: CalculateMealPlanSubTotalInput['dishesInMealPlanOrder'] = []

  data.weeks?.forEach((week) => {
    const weekNumber = week.value + 1

    week.days.forEach((day) => {
      const dayOfWeek = day.value

      day.meals.forEach((meal) => {
        const mealType = meal.value
        const dishId = meal.dish

        flattenedData.push({
          mealType,
          dayOfWeek,
          week: weekNumber,
          dishId,
        })
      })
    })
  })

  return flattenedData
}

const getMealPlanPayload = (
  config: TConfig,
  plan: CustomizePlanSchema,
  orderInfo: OrderInfo,
  userId?: string,
): CreateMealPlanOrderInput => {
  return {
    paymentMethod: orderInfo.paymentMethod,
    mealSelected: config.meals,
    deliveryOn: config.days,
    deliverySlot: orderInfo.mealPlanDeliverySlot || DeliverySlot.Morning,
    mealPlanCategory: config.category,
    duration: config.repeat,
    startDate: orderInfo.mealPlanDeliveryDate
      ? new Date(orderInfo.mealPlanDeliveryDate)
      : new Date(),
    address: {
      name: orderInfo.name,
      address: orderInfo.address,
      customerName: orderInfo.customerName,
      email: orderInfo.email,
      note: orderInfo.note,
      phoneNumber: orderInfo.phoneNumber ? orderInfo.phoneNumber.split(' ').join('') : '',
      countryId: orderInfo.countryId,
      userId: userId,
    },
    dishesInMealPlanOrder: flatDataMealPlan(plan),
    mealPlanId: config.categoryValue?.id || 0,
  }
}
