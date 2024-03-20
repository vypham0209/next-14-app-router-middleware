//SHARED
import { ExtractPropertyValues } from '_@shared/utils/type'
import { Gender, WeightUnit, HeightUnit } from '_@shared/schemas/calories-calculator'

interface CalculateCaloriesProps {
  gender: ExtractPropertyValues<typeof Gender>
  weight: {
    value: number
    unit: ExtractPropertyValues<typeof WeightUnit>
  }
  height: {
    value: number
    unit: ExtractPropertyValues<typeof HeightUnit>
  }
  age: number
  activity: number
}
export const calculateCalories = ({
  gender,
  weight,
  height,
  age,
  activity,
}: CalculateCaloriesProps) => {
  const heightValue = height.unit === HeightUnit.Centimeter ? height.value : height.value * 2.54
  const weightValue = weight.unit === WeightUnit.Kilogram ? weight.value : (weight.value * 5) / 11
  if (gender === Gender.PreferNotToSay) {
    const BMR = 10 * weightValue + 6.25 * heightValue - 5 * age - 78
    return BMR * activity
  }
  if (gender === Gender.Male) {
    const BMR = 10 * weightValue + 6.25 * heightValue - 5 * age + 5
    return BMR * activity
  }
  const BMR = 10 * weightValue + 6.25 * heightValue - 5 * age - 161
  return BMR * activity
}

export const calculateLoseWeight = (calories: number) => {
  return [calories * 0.7, calories * 0.8]
}

export const calculateGainWeight = (calories: number) => {
  return [calories * 1.2, calories * 1.3]
}
