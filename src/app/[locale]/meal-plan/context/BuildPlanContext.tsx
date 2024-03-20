//THIRD PARTY MODULES
import { DayOfWeek, MealPlanCategory, MealType } from '@prisma/client'
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'
//RELATIVE MODULES
import { BuildPlanStep1Schema, BuildPlanStep2Schema } from '../schema/build-plan-schema'
//RELATIVE MODULES

export type TStep = 1 | 2

export type TData = {
  step1: BuildPlanStep1Schema
  step2: BuildPlanStep2Schema
}

type BuildPlanContextType = {
  step: TStep
  setStep: Dispatch<SetStateAction<TStep>>
  data: TData
  setData: Dispatch<SetStateAction<TData>>
}

const BuildPlanContext = createContext<BuildPlanContextType>({} as any)

export const useBuildPlanContext = () => useContext(BuildPlanContext)

const BuildPlanContextProvider = ({ children }: PropsWithChildren) => {
  const [step, setStep] = useState<TStep>(1)
  const [data, setData] = useState<TData>({
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
  })

  return (
    <BuildPlanContext.Provider
      value={{
        step,
        data,
        setStep,
        setData,
      }}
    >
      {children}
    </BuildPlanContext.Provider>
  )
}

export default BuildPlanContextProvider
