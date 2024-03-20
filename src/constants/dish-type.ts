//THIRD PARTY MODULES
import { DishesType } from '@prisma/client';

export const dishTypeLabel = {
  [DishesType.FOOD]: 'Portion',
  [DishesType.DRINKS]: 'Volume',
};
