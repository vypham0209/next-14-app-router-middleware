//SHARED
import { TrackingType } from '_@shared/schemas/tracking';

export const trackingTypeOptions = [
  {
    value: TrackingType.order,
    label: 'Track Single order',
  },
  {
    value: TrackingType['meal-plan'],
    label: 'Track Meal plan',
  },
];

export const noOrderDescription = 'Sorry, we can’t find any orders with this ID.';
export const noMealPlanDescription = 'Sorry, we can’t find any Meal plan order with this ID.';
