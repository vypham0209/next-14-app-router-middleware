//THIRD PARTY MODULES
import { ComponentPropsWithoutRef } from 'react'
import { render, screen } from '_@landing/test/utils'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import * as CustomizePlanContext from '_@landing/app/[locale]/meal-plan/context/CustomizePlanContext'
//RELATIVE MODULES
import Meal from '../Meal'
import { mockDataForm } from '../__mocks__/form-data'
import { mockDataContext } from '../__mocks__/context-data'
import { CustomizePlanSchema } from '../../../schema/customize-plan-schema'
import { TOTAL_ITEM_SHOW_DESKTOP } from '../../../constants/customize-plan'

jest.mock('../DishCard')

let formMethods: UseFormReturn<CustomizePlanSchema, any, undefined>

const Component = (props: ComponentPropsWithoutRef<typeof Meal>) => {
  formMethods = useForm<CustomizePlanSchema>({
    defaultValues: mockDataForm,
  })

  return (
    <FormProvider {...formMethods}>
      <Meal {...props} />
    </FormProvider>
  )
}

describe('Meal', () => {
  beforeAll(() => {
    jest.spyOn(CustomizePlanContext, 'useCustomizePlanContext').mockReturnValue(mockDataContext)
  })

  test('should render successfully', () => {
    render(
      <Component
        index={0}
        totalShow={TOTAL_ITEM_SHOW_DESKTOP}
        data={{
          value: 'Breakfasts',
          dishes: mockDataContext.dishes.Breakfasts,
        }}
      />,
    )

    const title = screen.getByText('Breakfasts')

    expect(title).toBeInTheDocument()
  })
})
