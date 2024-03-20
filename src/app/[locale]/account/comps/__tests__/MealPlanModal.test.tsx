//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
//SHARED
import { nextApi } from '_@shared/utils/api'
//RELATIVE MODULES
import MealPlanModal from '../MealPlanModal'
import { mockDataDetail } from '../__mocks__/mock-data'

jest.mock('../MealMenuTab')
jest.mock('_@shared/utils/api', () => {
  return {
    nextApi: {
      mealPlan: {
        getMealPlanOrderDetail: {
          useQuery: jest.fn(),
        },
      },
    },
  }
})

describe('MealPlanModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should render successfully', () => {
    ;(nextApi.mealPlan.getMealPlanOrderDetail.useQuery as any).mockReturnValue({
      data: {
        data: mockDataDetail,
      },
    })

    render(
      <MealPlanModal id={'0038'}>
        <button>Children</button>
      </MealPlanModal>,
    )

    const button = screen.getByRole('button', { name: 'Children' })
    expect(button).toBeInTheDocument()
  })

  test('should open modal when trigger is clicked', async () => {
    const user = userEvent.setup()
    ;(nextApi.mealPlan.getMealPlanOrderDetail.useQuery as any).mockReturnValue({
      data: {
        data: mockDataDetail,
      },
    })

    render(
      <MealPlanModal id={'0038'}>
        <button>Children</button>
      </MealPlanModal>,
    )
    const button = screen.getByRole('button', { name: 'Children' })
    await user.click(button)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
  })

  test('should close modal when close button is clicked', async () => {
    const user = userEvent.setup()
    ;(nextApi.mealPlan.getMealPlanOrderDetail.useQuery as any).mockReturnValue({
      data: {
        data: mockDataDetail,
      },
    })

    render(
      <MealPlanModal id={'0038'}>
        <button>Children</button>
      </MealPlanModal>,
    )
    const button = screen.getByRole('button', { name: 'Children' })
    await user.click(button)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    const closeButton = screen.getByRole('button').querySelector('svg')
    if (!closeButton) return
    await user.click(closeButton)
    expect(dialog).not.toBeInTheDocument()
  })

  test('should not render MealPlanTab when data is empty', async () => {
    const user = userEvent.setup()
    ;(nextApi.mealPlan.getMealPlanOrderDetail.useQuery as any).mockReturnValue({
      data: {
        data: undefined,
      },
    })

    render(
      <MealPlanModal id={'0038'}>
        <button>Children</button>
      </MealPlanModal>,
    )
    const button = screen.getByRole('button', { name: 'Children' })
    await user.click(button)

    const children = screen.queryByText('MealMenuTab')
    expect(children).not.toBeInTheDocument()
  })
  test('should render MealPlanTab when data is not empty', async () => {
    const user = userEvent.setup()
    ;(nextApi.mealPlan.getMealPlanOrderDetail.useQuery as any).mockReturnValue({
      data: {
        data: mockDataDetail,
      },
    })

    render(
      <MealPlanModal id={'0038'}>
        <button>Children</button>
      </MealPlanModal>,
    )
    const button = screen.getByRole('button', { name: 'Children' })
    await user.click(button)

    const children = screen.getByText('MealMenuTab')
    expect(children).toBeInTheDocument()
  })
})
