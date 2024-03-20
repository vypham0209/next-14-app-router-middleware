//THIRD PARTY MODULES
import { useState } from 'react'
import { DayOfWeek } from '@prisma/client'
import { dayOptionsObject } from '_@landing/constants/meal-plan'
//LAYOUT, COMPONENTS
import TwoDirectionTab from '_@landing/components/tab/TwoDirectionTab'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'
//RELATIVE MODULES
import MealList from './MealList'

type TMenuTabProps = {
  data: RouterOutputs['mealPlan']['trackingMealPlan']
}

function MenuTab({ data }: TMenuTabProps) {
  const [week, setWeek] = useState<string>('1')
  const [day, setDay] = useState<DayOfWeek>(data.deliveryOn?.[0])
  const weeks = Array(data.duration || 0).fill(1)
  return (
    <div className="grid gap-4">
      <h3 className="text-18 text-blu-400 md:text-24">Menu</h3>
      <TwoDirectionTab
        horizontalProps={{
          value: week,
          ariaLabel: 'Choose a week',
          onChange: (value) => {
            setWeek(value)
            setDay(data.deliveryOn?.[0])
          },
          tabList: weeks.map((_, index) => ({
            value: String(index + 1),
            label: `Week ${index + 1}`,
          })),
        }}
        verticalProps={{
          value: day,
          ariaLabel: 'Choose a day',
          onChange: (value) => setDay(value as DayOfWeek),
          tabList: data.deliveryOn?.map((item) => ({
            value: item,
            label: dayOptionsObject?.[item].fullLabel,
            content: <MealList data={data.dishInMealPlanOrder?.[`week${week}`]?.[item]} />,
          })),
        }}
      />
    </div>
  )
}

export default MenuTab
