//THIRD PARTY MODULES
import { dayOptionsObject } from '_@landing/constants/meal-plan'
//RELATIVE MODULES
import { mockDataMachine } from './machine-data'

export const mockDataForm = {
  weeks: Array(mockDataMachine.context.config.repeat)
    .fill(1)
    .map((_, index) => ({
      value: index,
      days: mockDataMachine.context.config.days
        .sort((a, b) => dayOptionsObject[a].index - dayOptionsObject[b].index)
        ?.map((day) => ({
          value: day,
          meals: mockDataMachine.context.config.meals.map((meal) => ({
            value: meal,
            dishes: [],
          })),
        })),
    })),
}
