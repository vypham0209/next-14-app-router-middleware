//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
import * as CustomizePlanContext from '_@landing/app/[locale]/meal-plan/context/CustomizePlanContext'
//RELATIVE MODULES
import DishCard from '../DishCard'
import { mockDataContext } from '../__mocks__/context-data'

jest.mock('next/image')

describe('DishCard', () => {
  beforeAll(() => {
    jest.spyOn(CustomizePlanContext, 'useCustomizePlanContext').mockReturnValue(mockDataContext)
  })

  test('should render successfully', () => {
    render(
      <DishCard
        data={mockDataContext.dishes.Breakfasts[0]}
        value={1}
        onChange={jest.fn((_value) => {})}
      />,
    )
    const name = screen.getByText('Roasted Green Beans with Buttermilk Dressing')
    expect(name).toBeInTheDocument()
  })

  test('should change style when value equal id', () => {
    render(
      <DishCard
        data={mockDataContext.dishes.Breakfasts[0]}
        value={mockDataContext.dishes.Breakfasts[0].id}
        onChange={jest.fn((_value) => {})}
      />,
    )
    const container = screen
      .getByRole('button', {
        name: 'VIEW DETAILS',
      })
      .closest('div')?.parentElement

    if (!container) return

    expect(container).toHaveClass('border-yel-500 bg-yel-200 shadow-input')
  })

  test('should call onChange when Dish card is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn((_value) => {})
    render(
      <DishCard data={mockDataContext.dishes.Breakfasts[0]} value={1} onChange={mockOnChange} />,
    )

    const container = screen
      .getByRole('button', {
        name: 'VIEW DETAILS',
      })
      .closest('div')?.parentElement

    if (!container) return
    await user.click(container)

    expect(mockOnChange).toHaveBeenCalled()
  })

  test('should call viewDetail when view detail button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn((_value) => {})
    render(
      <DishCard data={mockDataContext.dishes.Breakfasts[0]} value={1} onChange={mockOnChange} />,
    )
    const button = screen.getByRole('button', {
      name: 'VIEW DETAILS',
    })

    await user.click(button)
    expect(mockDataContext.viewDetail).toHaveBeenCalled()
  })

  test('should call viewDetail, not call onChange when view detail button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnChange = jest.fn((_value) => {})
    render(
      <DishCard data={mockDataContext.dishes.Breakfasts[0]} value={1} onChange={mockOnChange} />,
    )
    const button = screen.getByRole('button', {
      name: 'VIEW DETAILS',
    })

    await user.click(button)
    expect(mockDataContext.viewDetail).toHaveBeenCalled()
    expect(mockOnChange).not.toHaveBeenCalled()
  })
})
