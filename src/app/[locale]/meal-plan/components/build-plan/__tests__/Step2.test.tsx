//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
import * as BuildPlanContext from '_@landing/app/[locale]/meal-plan/context/BuildPlanContext'
//LAYOUT, COMPONENTS
import Step2 from '_@landing/app/[locale]/meal-plan/components/build-plan/Step2'
//RELATIVE MODULES
import { mockData } from '../__mocks__/mock-data'

const mockPush = jest.fn()
jest.mock('next-intl/client', () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

const mockSend = jest.fn()

jest.mock('_@landing/machine/meal-plan.machine', () => ({
  useMealPlanActor: jest.fn(() => {
    return [{}, mockSend]
  }),
}))

//THIS TEST WILL WARNING BECAUSE OF isValid OF HOOK FORM
describe('Step2', () => {
  beforeEach(() => {
    jest.spyOn(BuildPlanContext, 'useBuildPlanContext').mockReturnValue({ ...mockData, step: 2 })
    jest.spyOn(require('next-intl/client'), 'useRouter').mockImplementation(() => ({
      push: mockPush,
    }))
  })

  test('should render successfully', async () => {
    render(<Step2 />)
    expect(await screen.findByText('How many meals per day?')).toBeInTheDocument()
  })

  test('should call send, push when Next button is clicked', async () => {
    const user = userEvent.setup()
    render(<Step2 />)
    expect(await screen.findByText('How many meals per day?')).toBeInTheDocument()
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await user.click(nextButton)
    expect(mockPush).toHaveBeenCalled()
    expect(mockSend).toHaveBeenCalled()
  })

  test('should call setData, setStep when Previous button is clicked', async () => {
    const user = userEvent.setup()
    render(<Step2 />)
    expect(await screen.findByText('How many meals per day?')).toBeInTheDocument()
    const prevButton = screen.getByRole('button', { name: 'Previous' })
    await user.click(prevButton)
    expect(mockData.setData).toHaveBeenCalled()
    expect(mockData.setStep).toHaveBeenCalled()
  })
})
