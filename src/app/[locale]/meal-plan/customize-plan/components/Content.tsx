'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
import { useRouter } from 'next-intl/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useCallback, useEffect, useRef, useState } from 'react'
import { dayOptionsObject } from '_@landing/constants/meal-plan'
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine'
//SHARED
import useProfile from '_@shared/hooks/useProfile'
//RELATIVE MODULES
import Days from './Days'
import Weeks from './Weeks'
import Action from './Action'
import MealList from './MealList'
import JustAMomentModal from './JustAMomentModal'
import DishDetailSlideOver from './slide-over/DishDetailSlideOver'
import { CustomizePlanSchema, customizePlanSchema } from '../../schema/customize-plan-schema'

export default function Content() {
  const [openGreatOffer, setOpenGreatOffer] = useState(false)
  const formValuesRef = useRef<CustomizePlanSchema>()
  const [state, send] = useMealPlanActor()
  const { repeat, meals, days } = state.context.config
  const { push } = useRouter()
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches)

  const [user] = useProfile()
  const userId = user?.id

  const methods = useForm<CustomizePlanSchema>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(customizePlanSchema),
    defaultValues: {
      weeks: [],
    },
  })

  const {
    formState: { isValid },
    reset,
    trigger,
    handleSubmit,
  } = methods

  const onSubmit = (values: CustomizePlanSchema) => {
    if (!userId) {
      setOpenGreatOffer(true)
      formValuesRef.current = values
      return
    }
    send({ type: 'CHANGE_PLAN', payload: values })
    push('/checkout/information?type=meal-plan')
  }

  const onContinue = () => {
    if (formValuesRef.current) send({ type: 'CHANGE_PLAN', payload: formValuesRef.current })
  }

  const onPrev = () => {
    push('/meal-plan')
  }

  const _resetValues = useCallback(() => {
    if (isSyncing) return
    if (!repeat || !meals.length || !days.length) {
      push('/meal-plan')
      return
    }
    reset({
      weeks: Array(repeat)
        .fill(1)
        .map((_, index) => ({
          value: index,
          days: days
            .sort((a, b) => dayOptionsObject[a].index - dayOptionsObject[b].index)
            ?.map((day) => ({
              value: day,
              meals: meals?.map((meal) => ({
                value: meal,
                dishes: [],
              })),
            })),
        })),
    })
    trigger()
  }, [days, isSyncing, meals, push, repeat, reset, trigger])

  useEffect(() => {
    _resetValues()
  }, [_resetValues])

  return (
    <>
      <FormProvider {...methods}>
        <div
          className={classcat([
            'w-screen',
            'sm:w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2))] sm:border sm:border-solid sm:border-blu-100',
          ])}
        >
          <div className="sticky top-[var(--h-header)] z-[calc(theme(zIndex[sticky])-1)] sm:relative sm:top-0 sm:z-0">
            <Weeks />
            <Days />
          </div>
          <MealList />
        </div>
        <Action disableNext={!isValid} onPrev={onPrev} onNext={handleSubmit(onSubmit)} />
      </FormProvider>
      <JustAMomentModal open={openGreatOffer} setOpen={setOpenGreatOffer} onContinue={onContinue} />
      <DishDetailSlideOver />
    </>
  )
}
