//THIRD PARTY MODULES
import dayjs from 'dayjs'
import { useMemo } from 'react'
import {
  FULL_WEEK_WIDTH,
  deliverySlotOptionsObject,
  mealPlanOptionsObject,
} from '_@landing/constants/meal-plan'
//LAYOUT, COMPONENTS
import BrowserOnly from '_@shared/components/BrowserOnly'
import DescriptionCard from '_@landing/components/DescriptionCard'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'

type TDescriptionProps = {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data']
}

function Description({ data }: TDescriptionProps) {
  const descriptions = useMemo(
    () => [
      {
        title: 'MEALS SELECTED',
        value: data.mealSelected?.map((item) => mealPlanOptionsObject?.[item]?.label)?.join(', '),
      },
      {
        title: 'Delivery on',
        value:
          data.deliveryOn.length === FULL_WEEK_WIDTH ? 'Full week' : data.deliveryOn.join(', '),
      },
      {
        title: 'Preferred delivery slot',
        value: deliverySlotOptionsObject?.[data.deliverySlot]?.label,
      },
      {
        title: 'Duration',
        value: `${data.duration} week${data.duration > 1 ? 's' : ''}`,
      },
      {
        title: 'Start delivering on',
        value: (
          <BrowserOnly>
            {data.startDate ? dayjs(data.startDate).format('DD/MM/YYYY') : ''}
          </BrowserOnly>
        ),
      },
    ],
    [data.deliveryOn, data.deliverySlot, data.duration, data.mealSelected, data.startDate],
  )
  return (
    <div className="grid gap-4">
      <h3 className="text-18 text-blu-400 md:text-24">Info</h3>
      <DescriptionCard items={descriptions} />
    </div>
  )
}

export default Description
