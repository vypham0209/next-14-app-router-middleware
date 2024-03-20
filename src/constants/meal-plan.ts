//THIRD PARTY MODULES
import { SVGProps } from 'react'
import { DayOfWeek, DeliverySlot, MealPlanCategory, MealType } from '@prisma/client'
//SHARED
import MealVeganIcon from '_@shared/icons/MealVeganIcon'
import MealHeathyIcon from '_@shared/icons/MealHeathyIcon'
import MealAthletesIcon from '_@shared/icons/MealAthletesIcon'
import MealOrdinaryIcon from '_@shared/icons/MealOrdinaryIcon'
import MealVegetarianIcon from '_@shared/icons/MealVegetarianIcon'
import MealWeightLostIcon from '_@shared/icons/MealWeightLostIcon'
//RELATIVE MODULES

export const mealOptions = [
  {
    value: MealType.Breakfasts,
    label: 'Breakfasts',
  },
  {
    value: MealType.Lunch,
    label: 'Lunch',
  },
  {
    value: MealType.Dinner,
    label: 'Dinner',
  },
  {
    value: MealType.MorningSnack,
    label: 'Morning Snack',
  },
  {
    value: MealType.AfternoonSnack,
    label: 'Afternoon Snack',
  },
  {
    value: MealType.Drink,
    label: 'Drink',
  },
]

export const mealPlanOptionsObject = mealOptions.reduce(
  (prev, cur, index) => ({ ...prev, [cur.value]: { ...cur, index } }),
  {},
) as Record<MealType, (typeof mealOptions)[number] & { index: number }>

type TDayOption = {
  value: string
  label: string
  fullLabel: string
}

export const dayOptions: TDayOption[] = [
  {
    value: DayOfWeek.Mon,
    label: 'Mon',
    fullLabel: 'Monday',
  },
  {
    value: DayOfWeek.Tue,
    label: 'Tue',
    fullLabel: 'Tuesday',
  },
  {
    value: DayOfWeek.Wed,
    label: 'Wed',
    fullLabel: 'Wednesday',
  },
  {
    value: DayOfWeek.Thu,
    label: 'Thu',
    fullLabel: 'Thursday',
  },
  {
    value: DayOfWeek.Fri,
    label: 'Fri',
    fullLabel: 'Friday',
  },
  {
    value: DayOfWeek.Sat,
    label: 'Sat',
    fullLabel: 'Saturday',
  },
  {
    value: DayOfWeek.Sun,
    label: 'Sun',
    fullLabel: 'Sunday',
  },
]

export const dayOptionsObject = dayOptions.reduce(
  (prev, cur, index) => ({ ...prev, [cur.value]: { ...cur, index } }),
  {},
) as Record<DayOfWeek, TDayOption & { index: number }>

export const repeatOptions = [
  {
    value: 1,
    label: '1 week',
  },
  {
    value: 2,
    label: '2 weeks',
  },
  {
    value: 3,
    label: '3 weeks',
  },
  {
    value: 4,
    label: '4 weeks',
  },
]

export const otherRepeatOptions = [
  {
    value: 5,
    label: '5 weeks',
  },
  {
    value: 6,
    label: '6 weeks',
  },
  {
    value: 7,
    label: '7 weeks',
  },
  {
    value: 8,
    label: '8 weeks',
  },
  {
    value: 9,
    label: '9 weeks',
  },
  {
    value: 10,
    label: '10 weeks',
  },
  {
    value: 11,
    label: '11 weeks',
  },
  {
    value: 12,
    label: '12 weeks',
  },
]

type TCategoryOption = {
  value: MealPlanCategory
  label: string
  icon: (props: Omit<SVGProps<SVGSVGElement>, 'ref'>) => React.JSX.Element
}

export const categoryOptions: TCategoryOption[] = [
  {
    value: MealPlanCategory.Ordinary,
    label: 'Ordinary',
    icon: MealOrdinaryIcon,
  },
  {
    value: MealPlanCategory.Healthy,
    label: 'Heathy',
    icon: MealHeathyIcon,
  },
  {
    value: MealPlanCategory.Vegetarian,
    label: 'Vegetarian',
    icon: MealVegetarianIcon,
  },
  {
    value: MealPlanCategory.Vegan,
    label: 'Vegan',
    icon: MealVeganIcon,
  },
  {
    value: MealPlanCategory.WeightLost,
    label: 'Weight Loss',
    icon: MealWeightLostIcon,
  },
  {
    value: MealPlanCategory.Athletes,
    label: 'Athletes',
    icon: MealAthletesIcon,
  },
]

export const categoryOptionsObject = categoryOptions.reduce(
  (prev, cur) => ({ ...prev, [cur.value]: cur }),
  {},
) as Record<MealPlanCategory, TCategoryOption>

export const deliverySlotOptions = [
  {
    value: DeliverySlot.Morning,
    label: 'Morning - 3:30 to 7:30',
    shortLabel: '3:30 to 7:30',
  },
  {
    value: DeliverySlot.LateMorning,
    label: 'Late Morning - 9:00 to 13:00',
    shortLabel: '9:00 to 13:00',
  },
  {
    value: DeliverySlot.Afternoon,
    label: 'Afternoon - 14:00 to 18:00',
    shortLabel: '14:00 to 18:00',
  },
  {
    value: DeliverySlot.Evening,
    label: 'Evening - 18:00 to 22:00',
    shortLabel: '18:00 to 22:00',
  },
]

export const deliverySlotOptionsObject = deliverySlotOptions.reduce(
  (prev, cur) => ({ ...prev, [cur.value]: cur }),
  {},
) as Record<DeliverySlot, (typeof deliverySlotOptions)[number]>

export const FULL_WEEK_WIDTH = 7
