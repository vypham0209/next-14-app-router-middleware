//LAYOUT, COMPONENTS
import Switch from '_@shared/components/conditions/Switch';
import VerticalTab from '_@landing/components/tab/VerticalTab';
//SHARED
import { nextApi } from '_@shared/utils/api';
//RELATIVE MODULES
import Loading from './Loading';
import NoMealPlan from './NoMealPlan';
import MealPlanCurrent from './MealPlanCurrent';
import MealPlanPurchaseHistory from './MealPlanPurchaseHistory';

export default function MealPlanTab() {
  const { data, isLoading } = nextApi.mealPlan.checkHadMealPlanOrders.useQuery();
  return (
    <Switch.Root>
      <Switch.Case when={isLoading}>
        <Loading />
      </Switch.Case>
      <Switch.Case when={data && (data.currentMealPlan || data.hadOrder)}>
        <VerticalTab
          className="ow:md:space-i-14"
          ariaLabel="Choose your meal plan"
          listProps={{
            className: 'ow:md:w-50 ow:md:space-y-4 [&>button]:flex-1 md:[&>button]:flex-initial',
          }}
          tabList={[
            {
              value: 'current',
              label: 'Current Meal Plan',
              content: <MealPlanCurrent />,
            },
            {
              value: 'purchase-history',
              label: 'Purchase History',
              content: <MealPlanPurchaseHistory />,
            },
          ]}
        />
      </Switch.Case>
      <Switch.Case when={true}>
        <NoMealPlan description="You haven’t bought any Meal Plan" />
      </Switch.Case>
    </Switch.Root>
  );
}
