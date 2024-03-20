//THIRD PARTY MODULES
import { ComponentPropsWithoutRef } from 'react'
import { MealPlanCategory } from '@prisma/client'
import { act, render, screen } from '_@landing/test/utils'
import { categoryOptions } from '_@landing/constants/meal-plan'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import { BuildPlanStep1Schema } from '_@landing/app/[locale]/meal-plan/schema/build-plan-schema'
//LAYOUT, COMPONENTS
import CategorySelect from '_@landing/app/[locale]/meal-plan/components/build-plan/CategorySelect'

let formMethods: UseFormReturn<BuildPlanStep1Schema, any, undefined>

const Component = (props: ComponentPropsWithoutRef<typeof CategorySelect>) => {
  formMethods = useForm<BuildPlanStep1Schema>({
    defaultValues: {
      category: MealPlanCategory.Ordinary,
    },
  })
  return (
    <FormProvider {...formMethods}>
      <CategorySelect {...props} />
    </FormProvider>
  )
}

describe('CategorySelect', () => {
  test('should render successfully', () => {
    render(<Component name="category" />)
    const container = screen.queryAllByRole('button')[0].closest('div')
    expect(container).toBeInTheDocument()
  })

  test('should not render when name is not provided', () => {
    render(<Component />)
    const container = screen.queryByRole('button')
    expect(container).not.toBeInTheDocument()
  })

  test('should change style when active', () => {
    render(<Component name="category" />)
    const button = screen.getAllByRole('button')[0]
    expect(button).toHaveClass(
      'border border-solid border-yel-500 bg-yel-200 shadow-input hover-hover:bg-yel-300',
    )
  })

  test('should handle props change', () => {
    const { rerender } = render(<Component name="category" />)
    rerender(<Component name="updateCategory" />)
    const container = screen.queryAllByRole('button')[0].closest('div')
    expect(container).toHaveAttribute('name', 'updateCategory')
  })

  test('should change value in form when button is clicked', () => {
    render(<Component name="category" />)
    const button = screen.getAllByRole('button')[1]
    act(() => {
      button.click()
    })
    expect(formMethods.getValues('category')).toBe(categoryOptions[1].value)
  })
})
