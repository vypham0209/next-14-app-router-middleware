//THIRD PARTY MODULES
import dayjs from 'dayjs'
import Image from 'next/image'
import classcat from 'classcat'
import { useMemo } from 'react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine'
import { FULL_WEEK_WIDTH, deliverySlotOptionsObject } from '_@landing/constants/meal-plan'
import { categoryOptionsObject, mealPlanOptionsObject } from '_@landing/constants/meal-plan'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
import DescriptionCard from '_@landing/components/DescriptionCard'
//RELATIVE MODULES
import { useOrderContext } from '../../../context/OrderContext'

function MealPlanInfo() {
  const [{ context }] = useMealPlanActor()
  const { config } = context
  const { orderInfo } = useOrderContext()

  const descriptions = useMemo(
    () => [
      {
        title: 'MEALS SELECTED',
        value: config.meals?.map((item) => mealPlanOptionsObject?.[item]?.label)?.join(', '),
      },
      {
        title: 'Delivery on',
        value: config.days?.length === FULL_WEEK_WIDTH ? 'Full week' : config.days?.join(', '),
      },
      {
        title: 'Preferred delivery slot',
        value: orderInfo?.mealPlanDeliverySlot
          ? deliverySlotOptionsObject[orderInfo?.mealPlanDeliverySlot]?.label
          : '',
      },
      {
        title: 'Duration',
        value: `${config.repeat} week${config.repeat > 1 ? 's' : ''}`,
      },
      {
        title: 'Start delivering on',
        value: orderInfo?.mealPlanDeliveryDate
          ? dayjs(orderInfo?.mealPlanDeliveryDate).format('DD/MM/YYYY')
          : '',
      },
    ],
    [
      orderInfo?.mealPlanDeliveryDate,
      orderInfo?.mealPlanDeliverySlot,
      config.days,
      config.meals,
      config.repeat,
    ],
  )

  return (
    <Show when={config.meals}>
      <div className={classcat(['grid justify-start gap-4', 'md:gap-6'])}>
        <div
          className={classcat([
            'grid grid-flow-col grid-cols-[theme(spacing[16])_1fr] items-center  justify-start gap-4',
          ])}
        >
          <div className="w-[spacing[16])] relative">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={process.env.NEXT_PUBLIC_CDN_HOST + (config.categoryValue?.image || '')}
                className="h-full w-full object-cover"
                alt={config.category}
                fill
                sizes="8rem, (max-width: 768px) 8rem"
                quality={100}
              />
            </AspectRatio>
          </div>
          <p className={classcat(['text-14 text-blu-400', 'md:text-18'])}>
            {categoryOptionsObject[config.category]?.label} meal plan
          </p>
        </div>
        <DescriptionCard items={descriptions} />
      </div>
    </Show>
  )
}

export default MealPlanInfo
