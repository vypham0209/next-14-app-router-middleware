//THIRD PARTY MODULES
import { z } from 'zod';
import { DayOfWeek, MealType } from '@prisma/client';

export const customizePlanSchema = z.object({
  weeks: z.array(
    z.object({
      value: z.number(),
      days: z.array(
        z.object({
          value: z.nativeEnum(DayOfWeek),
          meals: z.array(
            z.object({
              value: z.nativeEnum(MealType),
              dish: z.number({
                invalid_type_error: 'Please choose at least 1 meal.',
              }),
            }),
          ),
        }),
      ),
    }),
  ),
});

export type CustomizePlanSchema = z.infer<typeof customizePlanSchema>;
