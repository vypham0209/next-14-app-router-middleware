//THIRD PARTY MODULES
import classcat from 'classcat';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//HOOK, SERVER
import useWindowSize from '_@landing/hook/useWindowSize';
//RELATIVE MODULES
import Meal from './Meal';
import MealSkeleton from './skeleton/MealSkeleton';
import { CustomizePlanSchema } from '../../schema/customize-plan-schema';
import { useCustomizePlanContext } from '../../context/CustomizePlanContext';
import {
  TOTAL_ITEM_SHOW_MOBILE,
  TOTAL_ITEM_SHOW_TABLET,
  TOTAL_ITEM_SHOW_DESKTOP,
} from '../../constants/customize-plan';

function MealList() {
  const { dishes, isLoadingDishes, currentWeek, currentDay } = useCustomizePlanContext();
  const [state] = useMealPlanActor();
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches);
  const { width } = useWindowSize();
  const { watch } = useFormContext<CustomizePlanSchema>();
  const meals = watch(`weeks.${currentWeek}.days.${currentDay}.meals`);

  const totalShow = useMemo(() => {
    if (width >= 1024) return TOTAL_ITEM_SHOW_DESKTOP;
    else if (width >= 768 && width < 1024) return TOTAL_ITEM_SHOW_TABLET;
    return TOTAL_ITEM_SHOW_MOBILE;
  }, [width]);

  return (
    <div
      className={classcat([
        'flex min-h-[theme(spacing[40])] flex-col space-y-6 py-3 ps-6 sm:min-h-[theme(spacing[49.5])] sm:px-6 sm:py-4',
      ])}
    >
      <Switch.Root>
        <Switch.Case when={isSyncing || isLoadingDishes}>
          {Array(6)
            .fill(1)
            ?.map((_, index) => (
              <MealSkeleton key={index} />
            ))}
        </Switch.Case>
        <Switch.Case when={true}>
          {meals?.map((meal, index) => (
            <Meal
              key={`${currentWeek}${currentDay}${meal.value}${index}`}
              index={index}
              data={{
                value: meal.value,
                dishes: dishes[meal.value],
              }}
              totalShow={totalShow}
            />
          ))}
        </Switch.Case>
      </Switch.Root>
    </div>
  );
}

export default MealList;
