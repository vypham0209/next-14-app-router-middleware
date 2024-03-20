//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
// Import necessary testing functions and modules
import * as BuildPlanContext from '_@landing/app/[locale]/meal-plan/context/BuildPlanContext'
//LAYOUT, COMPONENTS
import Content from '_@landing/app/[locale]/meal-plan/components/build-plan/Content'
//RELATIVE MODULES
import { mockData } from '../__mocks__/mock-data'

jest.mock('../Step1')
jest.mock('../Step2')

describe('Content', () => {
  beforeEach(() => {
    jest.spyOn(BuildPlanContext, 'useBuildPlanContext').mockReturnValue(mockData)
  })

  test('should render Step1 when step is 1', () => {
    render(<Content />)
    const step1 = screen.queryByText('Step1')
    expect(step1).toBeInTheDocument()
  })

  test('should render Step2 when step is 2', () => {
    jest.spyOn(BuildPlanContext, 'useBuildPlanContext').mockReturnValue({ ...mockData, step: 2 })

    render(<Content />)
    const step2 = screen.queryByText('Step2')
    expect(step2).toBeInTheDocument()
  })
})
