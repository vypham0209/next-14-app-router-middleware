//THIRD PARTY MODULES
import { MealPlanCategory, MealType, DayOfWeek } from '@prisma/client'

export const mockDataMachine = {
  matches: jest.fn().mockReturnValue(false),
  context: {
    config: {
      category: MealPlanCategory.Ordinary,
      meals: [MealType.Breakfasts],
      days: [DayOfWeek.Mon, DayOfWeek.Tue, DayOfWeek.Wed],
      repeat: 1,
      categoryValue: {
        count: [
          {
            type: 'MorningSnack',
            count: 1,
          },
        ],
        name: 'Ordinary',
        image: '',
        category: MealPlanCategory.Ordinary,
        id: 1,
      },
    },
  },
}
