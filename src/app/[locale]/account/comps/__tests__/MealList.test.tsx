//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import MealList from '../MealList'
import { mockDataDetail } from '../__mocks__/mock-data'

jest.mock('next/image')
jest.mock('../MealCard')

describe('MealList', () => {
  test('should render successfully', () => {
    render(<MealList data={mockDataDetail.dishInMealPlanOrder.week1.Mon} />)

    const dinner = screen.getByText('Dinner')
    expect(dinner).toBeInTheDocument()
  })

  test('should render exactly number of card', () => {
    render(<MealList data={mockDataDetail.dishInMealPlanOrder.week1.Mon} />)
    const cards = screen.getAllByTestId('MealCard')
    expect(cards.length).toEqual(mockDataDetail.dishInMealPlanOrder.week1.Mon.length)
  })

  test('should render card with correct index', () => {
    render(<MealList data={mockDataDetail.dishInMealPlanOrder.week1.Mon} />)

    const cards = screen.getAllByTestId('MealCard')
    const title = cards[0].querySelector('p')
    expect(title).toHaveTextContent('Dinner')
  })
})
