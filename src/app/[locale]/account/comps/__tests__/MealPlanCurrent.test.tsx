//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//SHARED
import { nextApi } from '_@shared/utils/api'
//RELATIVE MODULES
import MealPlanCurrent from '../MealPlanCurrent'
import { mockDataMealCurrent } from '../__mocks__/mock-data'

jest.mock('next/image')
jest.mock('../Loading')
jest.mock('../MealPlanModal')

jest.mock('_@shared/utils/api', () => {
  return {
    nextApi: {
      mealPlan: {
        getActiveMealPlanOrderByUserId: {
          useQuery: jest.fn(),
        },
      },
    },
  }
})

describe('MealPlanCurrent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render Loading when data is loading', () => {
    ;(nextApi.mealPlan.getActiveMealPlanOrderByUserId.useQuery as any).mockReturnValue({
      isLoading: true,
    })

    render(<MealPlanCurrent />)

    const loading = screen.getByText('Loading')

    expect(loading).toBeInTheDocument()
  })

  test('should render NoMealPlan when data is empty', () => {
    ;(nextApi.mealPlan.getActiveMealPlanOrderByUserId.useQuery as any).mockReturnValue({
      isLoading: false,
      data: [],
    })

    render(<MealPlanCurrent />)

    const noMealPlan = screen.getByText('You are currently not subscribed to any Meal Plan.')

    expect(noMealPlan).toBeInTheDocument()
  })

  test('should render successfully when data is not empty', () => {
    ;(nextApi.mealPlan.getActiveMealPlanOrderByUserId.useQuery as any).mockReturnValue({
      isLoading: false,
      data: mockDataMealCurrent,
    })

    render(<MealPlanCurrent />)

    const cards = screen.getAllByRole('button', {
      name: 'Menu',
    })

    expect(cards.length).toEqual(mockDataMealCurrent.length)
  })
})
