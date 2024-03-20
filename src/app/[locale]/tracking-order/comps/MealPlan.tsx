//THIRD PARTY MODULES
import dayjs from 'dayjs'
import { useMemo } from 'react'
import {
  FULL_WEEK_WIDTH,
  deliverySlotOptionsObject,
  mealPlanOptionsObject,
} from '_@landing/constants/meal-plan'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'
//RELATIVE MODULES
import MenuTab from './meal-plan/MenuTab'
import Description from './meal-plan/Description'
import ShippingInfo from './meal-plan/ShippingInfo'

type TMealPlanProps = {
  data: RouterOutputs['mealPlan']['trackingMealPlan']
}

const MealPlan = ({ data }: TMealPlanProps) => {
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
        value: data.startDate ? dayjs(data.startDate).format('DD/MM/YYYY') : '',
      },
    ],
    [data.deliveryOn, data.deliverySlot, data.duration, data.mealSelected, data.startDate],
  )

  return (
    <div className="mt-10 grid gap-6 border border-blu-100 p-3 md:p-6">
      <h2 className="text-24 text-blu-400 md:text-36">
        Order #{data.id} - {data.mealPlanCategory} Meal Plan
      </h2>
      <Description items={descriptions} />
      <ShippingInfo data={data.address} />
      <MenuTab data={data} />
    </div>
  )
}

export default MealPlan
