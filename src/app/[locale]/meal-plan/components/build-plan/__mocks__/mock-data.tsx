//THIRD PARTY MODULES
import { MealPlanCategory, MealType, DayOfWeek } from '@prisma/client'
import { TStep } from '_@landing/app/[locale]/meal-plan/context/BuildPlanContext'
//RELATIVE MODULES

export const mockData = {
  step: 1 as TStep,
  data: {
    step1: {
      category: MealPlanCategory.Ordinary,
    },
    step2: {
      meals: [MealType.Breakfasts, MealType.Lunch, MealType.Dinner],
      days: [
        DayOfWeek.Mon,
        DayOfWeek.Tue,
        DayOfWeek.Wed,
        DayOfWeek.Thu,
        DayOfWeek.Fri,
        DayOfWeek.Sat,
        DayOfWeek.Sun,
      ],
      repeat: 4,
    },
  },
  setStep: jest.fn((prev) => prev()),
  setData: jest.fn((prev) => prev()),
}
