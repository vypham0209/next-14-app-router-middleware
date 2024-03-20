'use client'

//THIRD PARTY MODULES
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
  calculateCalories,
  calculateGainWeight,
  calculateLoseWeight,
} from '_@landing/utils/calculateCalories'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/DeprecatedButton'
import BaseFormItem from '_@shared/components/BaseFormItem'
import FormInput from '_@shared/components/input/FormInput'
import FormCombobox from '_@shared/components/combobox/FormCombobox'
import FormInputCombobox from '_@shared/components/input-combobox/FormInputCombobox'
//SHARED
import {
  caloriesCalculatorInput,
  CaloriesCalculatorInput,
  Gender,
  HeightUnit,
  WeightUnit,
} from '_@shared/schemas/calories-calculator'

const CaloriesCalculator = () => {
  const [calories, setCalories] = useState<number>(0)
  const [gainWeight, setGainWeight] = useState<number[]>([0, 0])
  const [looseWeight, setLooseWeight] = useState<number[]>([0, 0])

  const formMethods = useForm<CaloriesCalculatorInput>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      gender: '',
      activity: 0,
      height: {
        unit: HeightUnit.Centimeter,
      },
      weight: {
        unit: WeightUnit.Kilogram,
      },
    },
    resolver: zodResolver(caloriesCalculatorInput),
  })
  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((values) => {
    const calories = calculateCalories({ ...values, gender: values.gender as Gender })
    setCalories(calories)
    setGainWeight(calculateGainWeight(calories))
    setLooseWeight(calculateLoseWeight(calories))
  })

  return (
    <div className="mb-20 mt-6 md:mb-36 md:mt-20">
      <h1 className="mb-10 text-36 text-blu-400">Calorie calculator</h1>
      <div className="flex flex-col md:space-i-15 md:flex-row">
        <FormProvider {...formMethods}>
          <form className="mb-10 flex flex-1 flex-col space-y-10 md:mb-0" onSubmit={onSubmit}>
            <BaseFormItem labelClassName="text-14" name="age" label="Age">
              <FormInput
                placeholder="Type here"
                className="input-number appearance-none py-3.75 pi-3 placeholder:text-blu-200"
              />
            </BaseFormItem>
            <BaseFormItem labelClassName="text-14" name="gender" label="Gender">
              <FormCombobox options={genderOptions} placeholder="Choose" />
            </BaseFormItem>
            <FormInputCombobox
              labelClassName="text-14"
              name="height"
              label="Height"
              inputPlaceholder="Type here"
              options={heightOptions}
              comboboxPlaceholder="Choose"
            />
            <FormInputCombobox
              labelClassName="text-14"
              name="weight"
              label="Weight"
              inputPlaceholder="Type here"
              options={weightOptions}
              comboboxPlaceholder="Choose"
            />
            <BaseFormItem labelClassName="text-14" name="activity" label="Activity">
              <FormCombobox options={activityFactorOptions} placeholder="Choose" />
            </BaseFormItem>
            <Button
              size="large"
              color="navy"
              className="py-4 text-14 md:max-w-[theme(spacing.77)] md:text-16"
            >
              Calculate
            </Button>
          </form>
        </FormProvider>
        <div className="flex basis-[380px] flex-col space-y-6 border border-blu-100 p-4 text-blu-400 md:self-start md:p-6">
          <div className="text-center text-16lig">Weight maintenance calories</div>
          <div className="relative text-center text-48">
            {Math.round(calories)}
            <span className="absolute bottom-1.75 ms-1 text-12lig">kcal / day</span>
          </div>
          <div className="flex justify-between text-14">
            <span>Weight loss</span>
            <span className="text-14lig">
              <b className="text-16">{Math.round(looseWeight[0])}</b> to{' '}
              <b className="text-16">{Math.round(looseWeight[1])}</b> kcal / day
            </span>
          </div>
          <div className="flex justify-between text-14">
            <span>Weight gain</span>
            <span className="text-14lig">
              <b className="text-16">{Math.round(gainWeight[0])}</b> to{' '}
              <b className="text-16">{Math.round(gainWeight[1])}</b> kcal / day
            </span>
          </div>
          <div className="h-px bg-blu-100" />
          <div>
            <div className="mb-2 text-14">Tips:</div>
            <div className="flex flex-col space-y-2 text-12 [&>p]:font-light">
              <p>
                If your goal is to lose weight, we recommend consuming about 20% - 30% fewer
                calories than your weight maintenance calories.
              </p>
              <p>
                If your goal is to gain weight, we recommend consuming 20% - 30% more calories than
                your weight maintenance calories
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaloriesCalculator

const genderOptions = [
  {
    value: Gender.Male,
    label: 'Male',
  },
  {
    value: Gender.Female,
    label: 'Female',
  },
  {
    value: Gender.PreferNotToSay,
    label: 'Prefer not to say',
  },
]

const heightOptions = [
  {
    value: HeightUnit.Centimeter,
    label: 'cm',
  },
  {
    value: HeightUnit.Inch,
    label: 'inch',
  },
]

const weightOptions = [
  {
    value: WeightUnit.Kilogram,
    label: 'kg',
  },
  {
    value: WeightUnit.Pound,
    label: 'pound',
  },
]

const activityFactorOptions = [
  {
    value: 1.2,
    label: 'Sedentary: little to no exercise',
  },
  {
    value: 1.375,
    label: 'Light: exercise 30 minutes/ week',
  },
  {
    value: 1.55,
    label: 'Moderate: exercise 1 - 2 times, 30 minutes/ week',
  },
  {
    value: 1.65,
    label: 'Active: daily exercise or intense exercise 3 - 4 times, 30 minutes/ week',
  },
  {
    value: 1.725,
    label: 'Very active: intense exercise 3 - 4 times, 90 minutes/ week',
  },
  {
    value: 1.9,
    label: 'Extra active: 5 times or more 90 minutes/ week',
  },
]
