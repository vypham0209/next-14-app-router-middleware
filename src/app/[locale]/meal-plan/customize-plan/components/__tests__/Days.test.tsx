//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
import ClientProvider from '_@landing/app/[locale]/ClientProvider'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import { CustomizePlanSchema } from '_@landing/app/[locale]/meal-plan/schema/customize-plan-schema'
import * as CustomizePlanContext from '_@landing/app/[locale]/meal-plan/context/CustomizePlanContext'
//RELATIVE MODULES
import Days from '../Days'
import { mockDataForm } from '../__mocks__/form-data'
import { mockDataMachine } from '../__mocks__/machine-data'
import { mockDataContext } from '../__mocks__/context-data'

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
    <ClientProvider>
      <FormProvider {...formMethods}>
        <Days />
      </FormProvider>
    </ClientProvider>
  )
}

describe('Days', () => {
  beforeAll(() => {
    jest.spyOn(CustomizePlanContext, 'useCustomizePlanContext').mockReturnValue(mockDataContext)
  })

  const renderComponent = () => {
    return render(<Component />)
  }

  test('should render successfully', () => {
    renderComponent()
    const button = screen.getByRole('button', { name: 'Monday' })
    expect(button).toBeInTheDocument()
  })

  test('should render correct number of days', () => {
    renderComponent()
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toEqual(mockDataMachine.context.config.days.length)
  })

  test('should call setCurrentDay when button is clicked', async () => {
    const user = userEvent.setup()
    renderComponent()
    const button = screen.getAllByRole('button')[1]
    await user.click(button)
    expect(mockDataContext.setCurrentDay).toHaveBeenCalled()
  })

  test('should show check icon when form is valid', () => {
    formMethods.clearErrors()
    renderComponent()
    const buttonsWithSvg = screen
      .getAllByRole('button')
      .filter((button) => button.querySelector('svg'))
    expect(buttonsWithSvg.length).toEqual(mockDataMachine.context.config.days.length)
  })
})
