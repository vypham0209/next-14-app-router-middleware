'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import { categoryOptionsObject } from '_@landing/constants/meal-plan';
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine';
//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
//RELATIVE MODULES
import FilterMobile from './filter/FilterMobile';
import FilterDesktop from './filter/FilterDesktop';
import TitleSkeleton from './skeleton/TitleSkeleton';

function TitleAndFilter() {
  const [state] = useMealPlanActor();
  const category = state.context.config.category;
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches);
  return (
    <div
      className={classcat([
        'item-start max-content grid grid-flow-row gap-3 pb-6',
        'sm:grid-flow-col sm:items-center sm:justify-between sm:gap-6 sm:px-0 sm:pb-0',
      ])}
    >
      <Switch.Root>
        <Switch.Case when={isSyncing}>
          <TitleSkeleton />
        </Switch.Case>
        <Switch.Case when={true}>
          <p className={classcat(['text-24 leading-9 text-blu-400', 'md:text-28'])}>
            {categoryOptionsObject[category]?.label} meal plan
          </p>
        </Switch.Case>
      </Switch.Root>
      <div
        className={classcat(['grid grid-flow-row items-center gap-3 sm:grid-flow-col sm:gap-6'])}
      >
        <p className={classcat(['text-blu-400', 'text-16lig'])}>Filter out what you can’t eat:</p>
        <FilterDesktop />
        <FilterMobile />
      </div>
    </div>
  );
}

export default TitleAndFilter;
