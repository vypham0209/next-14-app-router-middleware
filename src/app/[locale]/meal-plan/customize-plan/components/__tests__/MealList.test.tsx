//THIRD PARTY MODULES
import { fireResizeEvent, render, screen } from '_@landing/test/utils'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import { CustomizePlanSchema } from '_@landing/app/[locale]/meal-plan/schema/customize-plan-schema'
import * as CustomizePlanContext from '_@landing/app/[locale]/meal-plan/context/CustomizePlanContext'
import {
  TOTAL_ITEM_SHOW_DESKTOP,
  TOTAL_ITEM_SHOW_TABLET,
} from '_@landing/app/[locale]/meal-plan/constants/customize-plan'
//RELATIVE MODULES
import MealList from '../MealList'
import { mockDataForm } from '../__mocks__/form-data'
import { mockDataContext } from '../__mocks__/context-data'
import { mockDataMachine } from '../__mocks__/machine-data'

jest.mock('../Meal')

const mockSend = jest.fn()
jest.mock('_@landing/machine/meal-plan.machine', () => ({
  useMealPlanActor: jest.fn(() => {
    return [mockDataMachine, mockSend]
  }),
}))

let formMethods: UseFormReturn<CustomizePlanSchema, any, undefined>

const Component = () => {
  formMethods = useForm<CustomizePlanSchema>({
    defaultValues: mockDataForm,
  })

  return (
    <FormProvider {...formMethods}>
      <MealList />
    </FormProvider>
  )
}

describe('MealList', () => {
  beforeAll(() => {
    jest.spyOn(CustomizePlanContext, 'useCustomizePlanContext').mockReturnValue(mockDataContext)
  })

  test('should render successfully', () => {
    render(<Component />)
    const title = screen.getAllByText('Meal')
    expect(title.length).toEqual(mockDataMachine.context.config.meals.length)
  })

  test('updates when the window width changes', () => {
    const { rerender } = render(<Component />)

    const totalDesk = screen.getByText(TOTAL_ITEM_SHOW_DESKTOP)
    expect(totalDesk).toBeInTheDocument()

    fireResizeEvent(768)

    rerender(<Component />)

    const totalTablet = screen.getByText(TOTAL_ITEM_SHOW_TABLET)
    expect(totalTablet).toBeInTheDocument()
  })
})
