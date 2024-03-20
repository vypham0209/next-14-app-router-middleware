'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { getDialCodeFromId, phoneFormat } from '_@landing/utils/phoneFormat'
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Switch from '_@shared/components/conditions/Switch'
import BaseFormItem from '_@shared/components/BaseFormItem'
import FormInput from '_@shared/components/input/FormInput'
import FormTagSelect from '_@shared/components/tag-select/FormTagSelect'
import DropdownInput from '_@landing/components/input/dropdown-input/DropdownInput'
//SHARED
import { nextApi, RouterOutputs } from '_@shared/utils/api'
import { trackingSchema, TrackingType, type TrackingSchema } from '_@shared/schemas/tracking'
//HOOK, SERVER
import useQueryParams from '_@landing/hook/useQueryParams'
//RELATIVE MODULES
import NoOrder from './comps/NoOrder'
import MealPlan from './comps/MealPlan'
import OrderDetail from './comps/OrderDetail'
import { noMealPlanDescription, noOrderDescription, trackingTypeOptions } from './constants'

type QueryParams = {
  type: string
}

const TrackingOrder = () => {
  const { queryParams } = useQueryParams<QueryParams>()
  const { type } = queryParams

  const [order, setOrder] = useState<RouterOutputs['order']['trackingOrder'] | undefined>(undefined)
  const [mealPlan, setMealPlan] = useState<
    RouterOutputs['mealPlan']['trackingMealPlan'] | undefined
  >(undefined)

  const [notFoundOrder, setNotFoundOrder] = useState<boolean>(false)
  const [notFoundMealPlan, setNotFoundMealPlan] = useState<boolean>(false)

  const global = useGlobalContext()
  const countryOptions = global?.countryOptions || []

  const formMethods = useForm<TrackingSchema>({
    defaultValues: {
      countryId: 237,
      trackingType: type === TrackingType['meal-plan'] ? type : TrackingType.order,
    },
    resolver: zodResolver(trackingSchema),
  })

  const { handleSubmit, setValue, watch } = formMethods

  const watchTrackingType = watch('trackingType')

  const { mutate: trackingOrder, isLoading: isTrackingOrder } =
    nextApi.order.trackingOrder.useMutation({
      onSuccess: (data) => {
        setOrder(data)
        setNotFoundOrder(!data)
        setMealPlan(undefined)
      },
      onError: () => {
        setOrder(undefined)
        setNotFoundOrder(true)
      },
    })

  const { mutate: trackingMealPlan, isLoading: isTrackingMealPlan } =
    nextApi.mealPlan.trackingMealPlan.useMutation({
      onSuccess: (data) => {
        setMealPlan(data)
        setNotFoundMealPlan(!data)
        setOrder(undefined)
      },
      onError: () => {
        setMealPlan(undefined)
        setNotFoundMealPlan(true)
      },
    })

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericInput = value.replace(/\D/g, '')

    setValue('phoneNumber', phoneFormat(numericInput))
  }

  const onSubmit = handleSubmit((values) => {
    if (values.trackingType === TrackingType['meal-plan']) {
      trackingMealPlan({
        orderId: values.orderId,
        phone: {
          phoneNumber: values.phoneNumber.split(' ').join(''),
          countryId: values.countryId,
        },
      })
      return
    }
    trackingOrder({
      orderId: values.orderId,
      phone: {
        phoneNumber: values.phoneNumber.split(' ').join(''),
        countryId: values.countryId,
      },
    })
  })

  return (
    <div className={classcat(['mb-20 mt-6', 'md:mb-36 md:mt-20'])}>
      <div>
        <h1 className="mb-10 text-36 text-blu-400 md:text-48">Track my order or meal plan</h1>
        <FormProvider {...formMethods}>
          <form
            className={classcat(['flex flex-col space-y-10', 'md:max-w-[theme(spacing.210)]'])}
            onSubmit={onSubmit}
          >
            <FormTagSelect
              name="trackingType"
              options={trackingTypeOptions}
              styles={{
                containerClassName:
                  'ow:[&>*]:mr-4 ow:[&>*]:flex-1 [&>*:last-child]:mr-0 ow:sm:[&>*]:flex-initial',
                tagClassName: 'ow:py-2 ow:px-4 ow:sm:px-6 ow:sm:py-3 ow:text-blu-400',
              }}
            />
            <BaseFormItem labelClassName="text-14" name="orderId" label="Please enter order ID">
              <FormInput
                placeholder="Type here"
                className="py-3.75 pi-3 placeholder:text-blu-200"
              />
            </BaseFormItem>
            <BaseFormItem
              labelClassName="text-14"
              name="phoneNumber"
              label="Please enter phone number"
            >
              <DropdownInput
                dropdownProps={{
                  name: 'countryId',
                  options: countryOptions,
                  renderValue: (value) => {
                    return typeof value === 'number'
                      ? `+${getDialCodeFromId(countryOptions, value)}`
                      : ''
                  },
                  owStyles: {
                    triggerClasses:
                      'ow:justify-end [&>span]:text-14lig [&>span]:leading-[theme(spacing[4.5])] pe-2',
                    contentClasses: 'ow:h-84',
                  },
                  placeholder: 'Type here',
                }}
                placeholder="Type here"
                className={classcat([
                  ' border-none py-3.75 ps-0 pi-3 placeholder:text-blu-200',
                  'hocus:shadow-none',
                ])}
                wrapperClassName={classcat([
                  'relative',
                  'before:absolute before:left-15.5 before:top-1/2 before:h-4.5 before:w-0.25 before:-translate-y-1/2 before:bg-blu-100 before:content-[""]',
                ])}
                onChange={onChangePhoneNumber}
              />
            </BaseFormItem>
            <Button
              type="submit"
              className={classcat([
                'py-3.25',
                '[&>span]:text-14 [&>span]:md:text-16 [&>svg]:h-5.75',
                'md:max-w-[theme(spacing.69)] md:py-4',
              ])}
              variant="filled"
              color="navy"
              isLoading={isTrackingOrder || isTrackingMealPlan}
            >
              View
            </Button>
          </form>
        </FormProvider>
      </div>
      <Switch.Root>
        <Switch.Case when={watchTrackingType === TrackingType.order && !!order}>
          <OrderDetail data={order} />
        </Switch.Case>
        <Switch.Case when={watchTrackingType === TrackingType['meal-plan'] && !!mealPlan}>
          {mealPlan && <MealPlan data={mealPlan} />}
        </Switch.Case>
        <Switch.Case when={watchTrackingType === TrackingType.order && notFoundOrder}>
          <NoOrder description={noOrderDescription} />
        </Switch.Case>
        <Switch.Case when={watchTrackingType === TrackingType['meal-plan'] && notFoundMealPlan}>
          <NoOrder description={noMealPlanDescription} />
        </Switch.Case>
        <Switch.Case when={true}>{null}</Switch.Case>
      </Switch.Root>
    </div>
  )
}

export default TrackingOrder
