//THIRD PARTY MODULES
import dayjs from 'dayjs'
import classcat from 'classcat'
import { useRouter } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { DELAY_RESEND } from '_@landing/constants/verity-phone'
import { deliverySlotOptions } from '_@landing/constants/meal-plan'
import { Address, DeliveryType, PaymentMethod } from '@prisma/client'
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine'
import { getDialCodeFromId, phoneFormat } from '_@landing/utils/phoneFormat'
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider'
import { CheckOutType } from '_@landing/app/[locale]/checkout/types/checkout-type'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import Switch from '_@shared/components/conditions/Switch'
import BaseFormItem from '_@shared/components/BaseFormItem'
import FormInput from '_@shared/components/input/FormInput'
import InlineNotification from '_@shared/components/InlineNotification'
import FormDatePicker from '_@shared/components/date-picker/FormDatePicker'
import FormTimePicker from '_@shared/components/time-picker/FormTimePicker'
import FormRadioCustomGroup from '_@shared/components/radio/FormRadioCustomGroup'
import DropdownInput from '_@landing/components/input/dropdown-input/DropdownInput'
//SHARED
import { nextApi } from '_@shared/utils/api'
import { useToastStore } from '_@shared/stores/toast/useToastStore'
//RELATIVE MODULES
import GuestVerifyModal from './VerifyModal'
import AddressSwitcher from './AddressSwitcher'
import CreateAddressForm from './CreateAddressForm'
import DeliverySlotSelect from './DeliverySlotSelect'
import { useOrderContext } from '../../../context/OrderContext'
import { OrderInformationValues, orderInformationSchema } from '../interface'
import {
  MAX_TIMES_FAILED_PAYMENTS,
  MEAL_PLAN_MIN_WEEK_PAYMENT,
  MEAL_PLAN_PRE_ORDER_DATE_OFFSET,
  PRE_ORDER_DATE_OFFSET_MILLISECOND,
} from '../../constant'

type OrderInformationProps = {
  addresses: Address[] | undefined
  isVerifyPhone: boolean
  setVerifyPhone: (isVerify: boolean) => void
}

const OrderInformationForm = ({
  addresses,
  isVerifyPhone,
  setVerifyPhone,
}: OrderInformationProps) => {
  const paymentMethodRef = useRef<HTMLDivElement>(null)
  const [enabledResend, setEnabledResend] = useState(true)
  const [verifyModalOpen, setPhoneVerifyModalOpen] = useState(false)
  const params = useSearchParams()
  const scroll = params.get('scroll')
  const global = useGlobalContext()
  const user = global.user
  const countryOptions = global?.countryOptions || []
  const hasAddress = addresses && addresses.length > 0
  const {
    orderInfo,
    type,
    phoneData,
    showAddressFormType,
    currentAddressId,
    guestVerifiedPhones,
    timesOfFailedPayments,
    setPhoneData,
    setCurrentAddressId,
    setOrderInfo,
  } = useOrderContext()
  const isMealPlan = type === CheckOutType.MealPlan
  const [
    {
      context: { config },
    },
  ] = useMealPlanActor()

  const { push } = useRouter()
  const showToast = useToastStore((state) => state.showToast)

  const methods = useForm<OrderInformationValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(orderInformationSchema),
  })

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = methods

  const deliveryType = watch('deliveryType')
  const date = watch('date')

  const disablePassTime = useMemo(() => {
    return date ? dayjs(date).isBefore(dayjs()) : false
  }, [date])

  const { mutate: sendVerifyPhone } = nextApi.order.sendVerifyPhone.useMutation({
    onSuccess: () => {
      setPhoneVerifyModalOpen(true)
      setEnabledResend(false)
    },
    onError: (error) => {
      if (error.data?.code === 'TOO_MANY_REQUESTS') {
        setPhoneVerifyModalOpen(true)
        return
      }
      showToast({ type: 'error', description: error.message ?? 'Resend OTP failed!' })
    },
  })

  const onUseDefaultMail = () => {
    setValue('email', user?.email ?? '', {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const setAddressValue = (address: Address) => {
    setValue('name', address.name || undefined)
    setValue('address', address.address)
    setValue('phoneNumber', address.phoneNumber)
    setValue('countryId', address.countryId || 237)
    setValue('customerName', address.customerName)
    setValue('email', address.email || '')
    setValue('note', address.note || '')
  }

  const onSubmit = async (values: OrderInformationValues) => {
    const { countryId, phoneNumber } = values
    const phoneNumberFormat = phoneNumber.split(' ').join('')

    if (!isVerifyPhone) {
      setPhoneData({
        countryId,
        phone: phoneNumberFormat,
      })

      sendVerifyPhone({
        phoneNumber: phoneNumberFormat,
        countryId: countryId,
      })

      return
    }

    setOrderInfo({ ...values, id: currentAddressId })

    push('/checkout/complete-order')
  }

  const checkVerifyPhone = (phoneNumber: string, country: number) => {
    if (!hasAddress) {
      const phone = guestVerifiedPhones.find(
        (item) => item.phone === phoneNumber && item.countryId === country,
      )
      setVerifyPhone(!!phone)
      return
    }
    setVerifyPhone(
      !!addresses.find((item) => item.phoneNumber === phoneNumber && item.countryId === country),
    )
  }

  const onCountryChange = (value: {}[]) => {
    setPhoneData({ ...phoneData, countryId: value as unknown as number })
    checkVerifyPhone(phoneData.phone, value as unknown as number)
  }

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string
    const numericInput = value.replace(/\D/g, '')
    setValue('phoneNumber', phoneFormat(numericInput), { shouldDirty: true })
    setPhoneData({ ...phoneData, phone: numericInput })
    checkVerifyPhone(numericInput, phoneData.countryId)
  }

  const defaultValuesOrder = useMemo(() => {
    return {
      deliveryType: orderInfo?.deliveryType || getValues('deliveryType') || DeliveryType.RIGHT_AWAY,
      paymentMethod: orderInfo?.paymentMethod || getValues('paymentMethod') || PaymentMethod.COD,
      ...((orderInfo?.deliveryType || getValues('deliveryType') || DeliveryType.RIGHT_AWAY) ===
      DeliveryType.PRE_ORDER
        ? {
            time: orderInfo?.time || getValues('time') || undefined,
            date: orderInfo?.date || getValues('date') || undefined,
          }
        : {}),
    }
  }, [
    getValues,
    orderInfo?.date,
    orderInfo?.deliveryType,
    orderInfo?.paymentMethod,
    orderInfo?.time,
  ])

  const defaultValuesMealPlan = useMemo(() => {
    return {
      mealPlanDeliveryDate: orderInfo?.mealPlanDeliveryDate || undefined,
      mealPlanDeliverySlot: orderInfo?.mealPlanDeliverySlot || undefined,
      paymentMethod:
        orderInfo?.paymentMethod ||
        (config.repeat > MEAL_PLAN_MIN_WEEK_PAYMENT
          ? PaymentMethod.CARD
          : getValues('paymentMethod') || PaymentMethod.COD),
    }
  }, [
    getValues,
    config.repeat,
    orderInfo?.mealPlanDeliveryDate,
    orderInfo?.mealPlanDeliverySlot,
    orderInfo?.paymentMethod,
  ])

  const _setDefaultFormValues = useCallback(() => {
    let defaultAddress = undefined
    if (!hasAddress) {
      defaultAddress = orderInfo || {
        countryId: 237,
        paymentMethod:
          isMealPlan && config.repeat > MEAL_PLAN_MIN_WEEK_PAYMENT
            ? PaymentMethod.CARD
            : PaymentMethod.COD,
      }
    } else {
      const address = addresses.find((address) => address.id === currentAddressId)
      const addressData = orderInfo?.id === address?.id ? orderInfo : address
      defaultAddress = {
        address: addressData?.address,
        phoneNumber: addressData?.phoneNumber ? phoneFormat(addressData?.phoneNumber) : '',
        countryId: addressData?.countryId || 237,
        customerName: addressData?.customerName,
        email: addressData?.email || '',
        name: addressData?.name || undefined,
        note: addressData?.note || undefined,
        ...(isMealPlan ? defaultValuesMealPlan : defaultValuesOrder),
      }
    }
    reset({ ...defaultAddress, type })
    setPhoneData({
      countryId: defaultAddress?.countryId || 237,
      phone: defaultAddress?.phoneNumber || '',
    })
  }, [
    addresses,
    config.repeat,
    currentAddressId,
    defaultValuesMealPlan,
    defaultValuesOrder,
    hasAddress,
    isMealPlan,
    orderInfo,
    reset,
    setPhoneData,
    type,
  ])

  const _setVerifyPhone = useCallback(() => {
    if (!hasAddress) {
      setVerifyPhone(
        !!guestVerifiedPhones.find(
          (item) =>
            item.phone === getValues('phoneNumber').split(' ').join('') &&
            item.countryId === getValues('countryId'),
        ),
      )
    } else {
      setVerifyPhone(!!currentAddressId)
    }
  }, [currentAddressId, getValues, guestVerifiedPhones, hasAddress, setVerifyPhone])

  const _setDefaultCurrentAddressId = useCallback(() => {
    if (hasAddress && !currentAddressId) {
      const defaultAddress = addresses.find((address) => address.default) || addresses[0]
      setCurrentAddressId(defaultAddress?.id)
    }
  }, [addresses, currentAddressId, hasAddress, setCurrentAddressId])

  const _scrollToPaymentMethod = useCallback(() => {
    if (
      timesOfFailedPayments < MAX_TIMES_FAILED_PAYMENTS ||
      scroll !== 'payment-method' ||
      !paymentMethodRef.current
    )
      return
    setTimeout(() => {
      paymentMethodRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [scroll, timesOfFailedPayments])

  useEffect(() => {
    _setDefaultCurrentAddressId()
  }, [_setDefaultCurrentAddressId])

  useEffect(() => {
    _setDefaultFormValues()
  }, [_setDefaultFormValues])

  useEffect(() => {
    _setVerifyPhone()
  }, [_setVerifyPhone])

  useLayoutEffect(() => {
    _scrollToPaymentMethod()
  }, [_scrollToPaymentMethod])

  useEffect(() => {
    let timeOut: any
    if (!enabledResend) {
      timeOut = setTimeout(() => {
        setEnabledResend(true)
      }, DELAY_RESEND)
    }
    return () => {
      clearTimeout(timeOut)
    }
  }, [enabledResend])

  const showAddressSwitcher = () => {
    if (!user || !user.addresses || !(user.addresses.length > 0)) return null
    return <AddressSwitcher setAddressValue={setAddressValue} addresses={user.addresses} />
  }

  return (
    <>
      {showAddressSwitcher()}
      <FormProvider {...methods}>
        <form className="grid gap-10 md:gap-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid max-w-[calc(896rem/16)] gap-10 md:gap-16">
            <Switch.Root>
              <Switch.Case when={showAddressFormType === 'DEFAULT'}>
                <div className="grid gap-6 md:gap-10">
                  <BaseFormItem
                    label="Address"
                    name="address"
                    description={
                      <span className="text-12lig text-blu-200">
                        We only operate and deliver to Dubai address.
                      </span>
                    }
                  >
                    <FormInput className="input-large" placeholder="Type here" />
                  </BaseFormItem>
                  <BaseFormItem
                    labelClassName="text-14"
                    name="phoneNumber"
                    label="Phone"
                    description={
                      <Switch.Root>
                        <Switch.Case when={!errors['phoneNumber'] && isVerifyPhone}>
                          <p className="text-12lig text-gre-300">Verified!</p>
                        </Switch.Case>
                        <Switch.Case when={!errors['phoneNumber'] && !isVerifyPhone}>
                          <p className="text-12lig text-blu-200">Will need to be verified!</p>
                        </Switch.Case>
                        <Switch.Case when={errors['phoneNumber']}>{null}</Switch.Case>
                      </Switch.Root>
                    }
                  >
                    <DropdownInput
                      dropdownProps={{
                        name: 'countryId',
                        options: countryOptions,
                        onChange: onCountryChange,
                        renderValue: (value) => {
                          return typeof value === 'number'
                            ? `+${getDialCodeFromId(countryOptions, value) ?? ''}`
                            : ''
                        },
                        owStyles: {
                          triggerClasses:
                            'ow:justify-end [&>span]:text-14lig [&>span]:leading-[theme(spacing[4.5])] pe-2',
                          contentClasses: 'ow:h-84',
                        },
                        placeholder: 'Type here',
                      }}
                      onChange={onPhoneNumberChange}
                      placeholder="Type here"
                      className={classcat([' border-none py-3.75 ps-0 pi-3', 'hocus:shadow-none'])}
                      inputMode="numeric"
                    />
                  </BaseFormItem>
                  <BaseFormItem label="Name" name="customerName">
                    <FormInput className="input-large" placeholder="Type here" />
                  </BaseFormItem>
                  <BaseFormItem
                    label="Email"
                    name="email"
                    description={
                      <Show when={!errors['email']}>
                        <span className="text-12lig text-blu-200">
                          Please provide correct and working email address, we will send you an
                          electronic invoice via this email.
                        </span>
                      </Show>
                    }
                    renderLabel={({ label }) => (
                      <div className="flex justify-between">
                        <label htmlFor={label}>{label}</label>
                        <Show when={user?.id}>
                          <Button
                            onClick={onUseDefaultMail}
                            variant="ghost"
                            className="btn-medium text-yel-500"
                          >
                            Use my account's email
                          </Button>
                        </Show>
                      </div>
                    )}
                  >
                    <FormInput className="input-large" placeholder="Type here" />
                  </BaseFormItem>

                  <BaseFormItem optional label="Any note for us?" name="note">
                    <FormInput
                      as="textarea"
                      className="input-large h-30 "
                      placeholder="Type here"
                    />
                  </BaseFormItem>
                </div>
              </Switch.Case>
              <Switch.Case when={showAddressFormType === 'NEW'}>
                <CreateAddressForm />
              </Switch.Case>
            </Switch.Root>

            <Switch.Root>
              <Switch.Case when={isMealPlan}>
                <div className="grid gap-6 md:gap-10">
                  <p className={classcat(['text-blu-400', 'md:text-24'])}>
                    When should we deliver your meal?
                  </p>

                  <BaseFormItem
                    label="When should we start delivering"
                    name="mealPlanDeliveryDate"
                    className="[&>div]:gap-4"
                    description={
                      <InlineNotification
                        color="warning"
                        description="48-hour pre-order required."
                      />
                    }
                  >
                    <FormDatePicker
                      triggerClasses="input-large"
                      contentClasses="ow:bg-yel-50"
                      disablePastDateOffset={MEAL_PLAN_PRE_ORDER_DATE_OFFSET}
                    />
                  </BaseFormItem>

                  <BaseFormItem
                    label="Preferred delivery slot"
                    name="mealPlanDeliverySlot"
                    className="relative"
                  >
                    <DeliverySlotSelect options={deliverySlotOptions} />
                  </BaseFormItem>
                </div>
              </Switch.Case>
              <Switch.Case when={true}>
                <div className="grid gap-6 md:gap-10">
                  <BaseFormItem
                    className="space-y-6 md:space-y-10"
                    labelClassName="text-18 md:text-24"
                    label="When should we deliver your meal?"
                    name="deliveryType"
                  >
                    <FormRadioCustomGroup
                      name="deliveryType"
                      defaultValue={DeliveryType.RIGHT_AWAY}
                      options={[
                        {
                          label: 'Right-away',
                          value: DeliveryType.RIGHT_AWAY,
                          id: DeliveryType.RIGHT_AWAY,
                          defaultChecked: true,
                        },
                        {
                          label: 'Pre-order',
                          value: DeliveryType.PRE_ORDER,
                          id: DeliveryType.PRE_ORDER,
                        },
                      ]}
                      className="space-i-4 flex"
                      renderLabel={(option) =>
                        ({ checked }) => {
                          return (
                            <span
                              className={classcat([
                                'inline-block rounded-full border border-blu-100 px-6 py-3 text-14ita',
                                checked
                                  ? 'border-yel-500 bg-yel-200 text-blu-500 hover:bg-yel-400'
                                  : 'text-blu-400 hover:bg-yel-50',
                              ])}
                            >
                              {option.label}
                            </span>
                          )
                        }}
                    />
                  </BaseFormItem>

                  <Show when={deliveryType === DeliveryType.PRE_ORDER}>
                    <>
                      <BaseFormItem label="Date" name="date">
                        <FormDatePicker
                          triggerClasses="input-large"
                          contentClasses="ow:bg-yel-50"
                        />
                      </BaseFormItem>
                      <BaseFormItem label="Time" name="time">
                        <FormTimePicker
                          disablePastTime={disablePassTime}
                          disableOffset={PRE_ORDER_DATE_OFFSET_MILLISECOND}
                          triggerClasses="input-large"
                        />
                      </BaseFormItem>
                    </>
                  </Show>
                </div>
              </Switch.Case>
            </Switch.Root>
            <div ref={paymentMethodRef} className="grid gap-6 md:gap-10">
              <BaseFormItem
                className="space-y-6 md:space-y-10 [&>div]:md:gap-4"
                labelClassName="text-18 md:text-24"
                label="Please choose a payment method"
                name="paymentMethod"
                description={
                  isMealPlan && config.repeat > MEAL_PLAN_MIN_WEEK_PAYMENT ? (
                    <span className="text-14lig text-org-600">
                      Currently, our payment options are limited to Card payments for Meal Plans
                      that have a duration of 2 weeks or longer.
                    </span>
                  ) : (
                    <span className="text-12lig text-blu-200">
                      *Woobleu.com uses the Stripe payment gateway for very secure, smooth, and fast
                      transactions.
                    </span>
                  )
                }
              >
                <FormRadioCustomGroup
                  name="paymentMethod"
                  defaultValue={PaymentMethod.COD}
                  options={
                    //if duration of meal plan is greater than 1 week, so it should pay by card
                    isMealPlan && config.repeat > MEAL_PLAN_MIN_WEEK_PAYMENT
                      ? [
                          {
                            label: 'Pay by Card',
                            value: PaymentMethod.CARD,
                            id: PaymentMethod.CARD,
                          },
                        ]
                      : [
                          {
                            label: 'Cash on delivery',
                            value: PaymentMethod.COD,
                            id: PaymentMethod.COD,
                          },
                          {
                            label: 'Pay by Card',
                            value: PaymentMethod.CARD,
                            id: PaymentMethod.CARD,
                          },
                        ]
                  }
                  className="space-i-4 flex"
                  renderLabel={(option) =>
                    ({ checked }) => {
                      return (
                        <span
                          className={classcat([
                            'inline-block rounded-full border border-blu-100 px-6 py-3 text-14ita',
                            checked
                              ? 'border-yel-500 bg-yel-200 text-blu-500 hover:bg-yel-400'
                              : 'text-blu-400 hover:bg-yel-50',
                          ])}
                        >
                          {option.label}
                        </span>
                      )
                    }}
                />
              </BaseFormItem>
            </div>
          </div>

          <Button
            disabled={showAddressFormType === 'NEW'}
            type="submit"
            color="navy"
            className="btn-medium w-full py-3.25 uppercase md:w-78"
          >
            Next step
          </Button>
        </form>
      </FormProvider>
      <Show when={verifyModalOpen}>
        <GuestVerifyModal
          addressId=""
          phoneNumber={phoneData.phone}
          countryId={phoneData.countryId}
          isModalOpen={verifyModalOpen}
          setIsModalOpen={setPhoneVerifyModalOpen}
          enabledResend={enabledResend}
          setEnabledResend={setEnabledResend}
        />
      </Show>
    </>
  )
}

export default OrderInformationForm
