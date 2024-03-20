//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
import { dayOptionsObject } from '_@landing/constants/meal-plan'
//RELATIVE MODULES
import MealMenuTab from '../MealMenuTab'
import { mockDataDetail } from '../__mocks__/mock-data'

jest.mock('next/image')

describe('MealMenuTab', () => {
  test('should render successfully', () => {
    render(<MealMenuTab data={mockDataDetail} />)
    const week1Button = screen.getByRole('tab', {
      name: 'Week 1',
    })
    expect(week1Button).toBeInTheDocument()

    const mondayButton = screen.getByRole('tab', {
      name: 'Monday',
    })
    expect(mondayButton).toBeInTheDocument()
  })

  test('should render exactly number of days', () => {
    render(<MealMenuTab data={mockDataDetail} />)

    mockDataDetail.deliveryOn.forEach((day) => {
      const dayButton = screen.getByRole('tab', {
        name: dayOptionsObject?.[day as keyof typeof dayOptionsObject].fullLabel,
      })
      expect(dayButton).toBeInTheDocument()
    })
  })

  test('should render exactly number of week', () => {
    render(<MealMenuTab data={mockDataDetail} />)

    Array(mockDataDetail.duration)
      .fill(1)
      .forEach((_, index) => {
        const weekButton = screen.getByRole('tab', {
          name: `Week ${index + 1}`,
        })
        expect(weekButton).toBeInTheDocument()
      })
  })

  test('should change active week when week button is clicked', async () => {
    const user = userEvent.setup()
    render(<MealMenuTab data={mockDataDetail} />)

    const week2Button = screen.getByRole('tab', {
      name: 'Week 2',
    })
    await user.click(week2Button)
    expect(week2Button).toHaveAttribute('aria-selected', 'true')
  })

  test('should change active day when day button is clicked', async () => {
    const user = userEvent.setup()
    render(<MealMenuTab data={mockDataDetail} />)

    const tuesdayButton = screen.getByRole('tab', {
      name: 'Tuesday',
    })
    await user.click(tuesdayButton)
    expect(tuesdayButton).toHaveAttribute('aria-selected', 'true')
  })
})
