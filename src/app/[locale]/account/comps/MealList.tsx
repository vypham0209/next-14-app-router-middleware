//THIRD PARTY MODULES
import classcat from 'classcat';
import { DayOfWeek } from '@prisma/client';
import { mealPlanOptionsObject } from '_@landing/constants/meal-plan';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import MealCard from './MealCard';

type TMealListProps = {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data']['dishInMealPlanOrder'][string][DayOfWeek];
};

function MealList({ data }: TMealListProps) {
  const dataSorted = data?.sort(
    (a, b) => mealPlanOptionsObject[a.mealType].index - mealPlanOptionsObject[b.mealType].index,
  );

  return (
    <div className={classcat(['grid grid-cols-1 gap-6', 'lg:grid-cols-3'])}>
      {dataSorted?.map((item) => (
        <MealCard key={item.id} data={item} />
      ))}
    </div>
  );
}

export default MealList;
