//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import MealCard from '../MealCard'
import { mockDataDetail } from '../__mocks__/mock-data'

const mockData = mockDataDetail.dishInMealPlanOrder.week1.Mon[0]
jest.mock('next/image')
describe('MealCard', () => {
  test('should render successfully', () => {
    render(<MealCard data={mockData} />)
    expect(screen.getByText(mockData.name)).toBeInTheDocument()
    expect(screen.getByText(`${mockData.price.toFixed(2)} AED`)).toBeInTheDocument()
  })
})
