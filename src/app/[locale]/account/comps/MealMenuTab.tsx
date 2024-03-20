//THIRD PARTY MODULES
import { useState } from 'react';
import { DayOfWeek } from '@prisma/client';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { dayOptionsObject } from '_@landing/constants/meal-plan';
//LAYOUT, COMPONENTS
import TwoDirectionTab from '_@landing/components/tab/TwoDirectionTab';
//SHARED
import { RouterOutputs } from '_@shared/utils/api';
//RELATIVE MODULES
import MealList from './MealList';

type TMealMenuTabProps = {
  data: RouterOutputs['mealPlan']['getMealPlanOrderDetail']['data'];
};

function MealMenuTab({ data }: TMealMenuTabProps) {
  const [week, setWeek] = useState<string>('1');
  const [day, setDay] = useState<DayOfWeek>(data.deliveryOn?.[0]);
  const weeks = Array(data.duration || 0).fill(1);
  return (
    <TwoDirectionTab
      horizontalProps={{
        wrapperClasses: 'ow:w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2))]',
        value: week,
        ariaLabel: 'Choose a week',
        onChange: (value) => setWeek(value),
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
          content: (
            <ScrollArea.Root type="auto" className="-me-2 pt-4 md:pt-0">
              <ScrollArea.Viewport className="h-[calc(100vh-theme(spacing[78.5]))] overflow-auto pe-2">
                <MealList data={data.dishInMealPlanOrder?.[`week${week}`]?.[item]} />
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar className="w-1.5 bg-yel-100" orientation="vertical">
                <ScrollArea.Thumb className="w-1.5 bg-yel-200" />
              </ScrollArea.Scrollbar>
              <ScrollArea.Corner className="bg-red-400" />
            </ScrollArea.Root>
          ),
        })),
        listProps: {
          className: 'ow:w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2))]',
        },
      }}
    />
  );
}

export default MealMenuTab;
