//THIRD PARTY MODULES
import { MealPlanCategory } from '@prisma/client';

export const CATEGORY_MAPPING: Record<MealPlanCategory, string> = {
  [MealPlanCategory.Ordinary]: 'Ordinary',
  [MealPlanCategory.Healthy]: 'Healthy',
  [MealPlanCategory.Vegetarian]: 'Vegetarian',
  [MealPlanCategory.Vegan]: 'Vegan',
  [MealPlanCategory.WeightLost]: 'Weight Loss',
  [MealPlanCategory.Athletes]: 'Athletes',
};
