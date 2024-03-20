//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { act, fireEvent, render, screen } from '_@landing/test/utils'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import * as CustomizePlanContext from '_@landing/app/[locale]/meal-plan/context/CustomizePlanContext'
//RELATIVE MODULES
import Weeks from '../Weeks'
import { mockDataForm } from '../__mocks__/form-data'
import { mockDataContext } from '../__mocks__/context-data'
import { mockDataMachine } from '../__mocks__/machine-data'
import { CustomizePlanSchema } from '../../../schema/customize-plan-schema'

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
      <Weeks />
    </FormProvider>
  )
}

describe('Week', () => {
  beforeAll(() => {
    jest.spyOn(CustomizePlanContext, 'useCustomizePlanContext').mockReturnValue(mockDataContext)
  })

  test('should render successfully', () => {
    render(<Component />)
    const button = screen.getByRole('button', { name: 'Week 1' })
    expect(button).toBeInTheDocument()
  })

  test('should render correct number of weeks', () => {
    render(<Component />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toEqual(mockDataMachine.context.config.repeat)
  })

  test('should show check icon when form is valid', () => {
    formMethods.clearErrors()
    render(<Component />)
    const buttonsWithSvg = screen
      .getAllByRole('button')
      .filter((button) => button.querySelector('svg'))
    expect(buttonsWithSvg.length).toEqual(mockDataMachine.context.config.repeat)
  })

  test('should call setCurrentDay and setCurrentWeek when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Component />)

    const button = screen.getByRole('button', { name: 'Week 1' })
    await user.click(button)

    expect(mockDataContext.setCurrentDay).toHaveBeenCalled()
    expect(mockDataContext.setCurrentWeek).toHaveBeenCalled()
  })

  it('handles scrolling left and right when overflown', () => {
    const { container } = render(<Component />)
    const scrollableContainer = container.querySelector('div[ref]')
    const scrollRightButton = screen
      .getAllByRole('button')
      .find((item) => item.className.includes('right-0'))
    const scrollLeftButton = screen
      .getAllByRole('button')
      .find((item) => item.className.includes('left-0'))

    if (!scrollRightButton || !scrollLeftButton) return

    expect(scrollableContainer?.scrollLeft).toBe(0)

    act(() => {
      fireEvent.mouseDown(scrollRightButton)
      fireEvent.mouseUp(scrollRightButton)
    })

    expect(scrollableContainer?.scrollLeft).toBeGreaterThan(0)

    act(() => {
      fireEvent.mouseDown(scrollLeftButton)
      fireEvent.mouseUp(scrollLeftButton)
    })

    expect(scrollableContainer?.scrollLeft).toBe(0)
  })
})
