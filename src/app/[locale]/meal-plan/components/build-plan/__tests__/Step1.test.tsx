//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
import * as BuildPlanContext from '_@landing/app/[locale]/meal-plan/context/BuildPlanContext'
//LAYOUT, COMPONENTS
import Step1 from '_@landing/app/[locale]/meal-plan/components/build-plan/Step1'
//RELATIVE MODULES
import { mockData } from '../__mocks__/mock-data'

describe('Step1', () => {
  beforeAll(() => {
    jest.spyOn(BuildPlanContext, 'useBuildPlanContext').mockReturnValue(mockData)
  })

  const renderComponent = () => {
    return render(<Step1 />)
  }

  test('should render successfully', () => {
    renderComponent()
    const step1 = screen.queryByText('Choose a plan which works best for you')
    expect(step1).toBeInTheDocument()
  })

  test('should call setStep, setDate when Next button is clicked', async () => {
    const user = userEvent.setup()
    renderComponent()
    const nextButton = screen.getByRole('button', { name: 'Next' })
    await user.click(nextButton)
    expect(mockData.setData).toHaveBeenCalled()
    expect(mockData.setStep).toHaveBeenCalled()
  })
})
