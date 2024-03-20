//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//SHARED
import { nextApi } from '_@shared/utils/api'
//RELATIVE MODULES
import MealPlanTab from '../MealPlanTab'

jest.mock('../Loading')
jest.mock('../MealPlanCurrent')
jest.mock('../MealPlanPurchaseHistory')

jest.mock('_@shared/utils/api', () => {
  return {
    nextApi: {
      mealPlan: {
        checkHadMealPlanOrders: {
          useQuery: jest.fn(),
        },
      },
    },
  }
})

describe('MealPlanTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render Loading when data is loading', () => {
    ;(nextApi.mealPlan.checkHadMealPlanOrders.useQuery as any).mockReturnValue({ isLoading: true })

    render(<MealPlanTab />)

    const loading = screen.getByText('Loading')

    expect(loading).toBeInTheDocument()
  })

  test('should render successfully when data is not empty', () => {
    ;(nextApi.mealPlan.checkHadMealPlanOrders.useQuery as any).mockReturnValue({
      isLoading: false,
      data: {
        currentMealPlan: true,
        hadOrder: true,
      },
    })

    render(<MealPlanTab />)

    const tabList = screen.getByRole('tablist')

    expect(tabList).toBeInTheDocument()
  })

  test('should render NoMealPlan when data is empty', () => {
    ;(nextApi.mealPlan.checkHadMealPlanOrders.useQuery as any).mockReturnValue({
      isLoading: false,
      data: {
        currentMealPlan: false,
        hadOrder: false,
      },
    })

    render(<MealPlanTab />)

    const NoMealPlan = screen.getByText('You haven’t bought any Meal Plan')

    expect(NoMealPlan).toBeInTheDocument()
  })
})
