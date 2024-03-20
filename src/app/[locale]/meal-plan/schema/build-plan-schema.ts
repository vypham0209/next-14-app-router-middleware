//THIRD PARTY MODULES
import { z } from 'zod';
import { DayOfWeek, MealPlanCategory, MealType } from '@prisma/client';
//RELATIVE MODULES

export const MIN_DAYS_OF_WEEK = 3;

export const buildPlanStep1Schema = z.object({
  category: z.nativeEnum(MealPlanCategory).default(MealPlanCategory.Healthy),
});

export type BuildPlanStep1Schema = z.infer<typeof buildPlanStep1Schema>;

export const buildPlanStep2Schema = z.object({
  meals: z
    .array(z.nativeEnum(MealType))
    .min(1, { message: 'Please choose at least 1 meal per day.' }),
  days: z.array(z.nativeEnum(DayOfWeek)).min(MIN_DAYS_OF_WEEK, {
    message: `Please choose at least ${MIN_DAYS_OF_WEEK} days of the week.`,
  }),
  repeat: z.number(),
});

export type BuildPlanStep2Schema = z.infer<typeof buildPlanStep2Schema>;
