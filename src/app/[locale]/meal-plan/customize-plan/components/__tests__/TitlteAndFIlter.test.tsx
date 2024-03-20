//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import TitleAndFilter from '../TitleAndFilter'
import { mockDataMachine } from '../__mocks__/machine-data'

const mockSend = jest.fn()
jest.mock('_@landing/machine/meal-plan.machine', () => ({
  useMealPlanActor: jest.fn(() => {
    return [mockDataMachine, mockSend]
  }),
}))

describe('TitleAndFilter Component', () => {
  test('should render correctly when not syncing', () => {
    render(<TitleAndFilter />)
    const filterLabelElement = screen.getByText('Filter out what you can’t eat:')
    expect(filterLabelElement).toBeInTheDocument()
  })
})
