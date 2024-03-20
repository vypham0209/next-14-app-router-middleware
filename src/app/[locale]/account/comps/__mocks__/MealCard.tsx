//THIRD PARTY MODULES
import { ReactElement } from 'react'
import { DayOfWeek } from '@prisma/client'
import { mealPlanOptionsObject } from '_@landing/constants/meal-plan'
//SHARED
import { RouterOutputs } from '_@shared/utils/api'

type TMealCardProps = {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data']['dishInMealPlanOrder'][string][DayOfWeek][number]
}
const MealCard = ({ data }: TMealCardProps): ReactElement => {
  return (
    <div data-testid="MealCard">
      <p>{mealPlanOptionsObject?.[data.mealType]?.label}</p>
    </div>
  )
}

export default MealCard
