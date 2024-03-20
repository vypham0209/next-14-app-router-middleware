//THIRD PARTY MODULES
import type { Prisma } from '@prisma/client';

export type Dishes = Prisma.DishesGetPayload<{
  include: {
    categories: true;
    addons: {
      include: {
        options: true;
      };
    };
    allergens: true;
    intolerances: true;
    sizes: true;
  };
}>;
