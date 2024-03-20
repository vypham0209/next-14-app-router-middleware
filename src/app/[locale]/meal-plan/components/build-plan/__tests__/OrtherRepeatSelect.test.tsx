//THIRD PARTY MODULES
import { ComponentPropsWithoutRef } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
import { otherRepeatOptions } from '_@landing/constants/meal-plan'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import { BuildPlanStep2Schema } from '_@landing/app/[locale]/meal-plan/schema/build-plan-schema'
//LAYOUT, COMPONENTS
import OtherRepeatSelect from '_@landing/app/[locale]/meal-plan/components/build-plan/OtherRepeatSelect'

let formMethods: UseFormReturn<BuildPlanStep2Schema, any, undefined>

const Component = (props: ComponentPropsWithoutRef<typeof OtherRepeatSelect>) => {
  formMethods = useForm<BuildPlanStep2Schema>({
    defaultValues: {
      repeat: 1,
    },
  })
  return (
    <FormProvider {...formMethods}>
      <OtherRepeatSelect {...props} />
    </FormProvider>
  )
}

describe('OtherRepeatSelect', () => {
  test('should render successfully', () => {
    render(<Component name="repeat" options={otherRepeatOptions} />)
    const button = screen.getByRole('combobox')
    expect(button).toBeInTheDocument()
  })

  test('should update value when option is clicked', async () => {
    const user = userEvent.setup()

    render(<Component name="repeat" options={otherRepeatOptions} />)

    const button = screen.getByRole('combobox')

    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    const option = screen.getByRole('option', { name: otherRepeatOptions[2].label })
    if (option) await user.click(option)
    const newOption = screen.queryByText(otherRepeatOptions[2].label)
    expect(newOption).toBeInTheDocument()
    expect(formMethods.getValues('repeat')).toEqual(otherRepeatOptions[2].value)
  })
})
