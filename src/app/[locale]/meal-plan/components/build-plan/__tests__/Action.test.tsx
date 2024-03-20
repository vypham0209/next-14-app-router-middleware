//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
import { TStep } from '_@landing/app/[locale]/meal-plan/context/BuildPlanContext'
import * as BuildPlanContext from '_@landing/app/[locale]/meal-plan/context/BuildPlanContext'
//LAYOUT, COMPONENTS
import Action, { TActionProps } from '_@landing/app/[locale]/meal-plan/components/build-plan/Action'
//RELATIVE MODULES
import { mockData } from '../__mocks__/mock-data'

describe('Action', () => {
  beforeAll(() => {
    jest.spyOn(BuildPlanContext, 'useBuildPlanContext').mockReturnValue(mockData)
  })

  const renderComponent = (props: TActionProps = {}) => {
    return render(<Action {...props} />)
  }

  test('should render successfully', () => {
    renderComponent()
    const container = screen.getByRole('button', { name: 'Next' }).closest('div')
    expect(container).toBeInTheDocument()
  })

  test('should render Previous button if onPrev prop is provided', () => {
    const onPrev = jest.fn()
    renderComponent({
      onPrev,
    })
    const button = screen.getByRole('button', { name: 'Previous' })
    expect(button).toBeInTheDocument()
  })

  test('should not render Previous button if onPrev prop is not provided', () => {
    renderComponent()
    const button = screen.queryByText('Previous')
    expect(button).toBeNull()
  })

  test('should disabled Next button if disabledNext prop is provided', () => {
    renderComponent({
      disableNext: true,
    })
    const button = screen.getByRole('button', { name: 'Next' })
    expect(button).toBeDisabled()
  })
  test('should disabled Previous button if disabledPrevious, onPrev prop is provided', () => {
    const onPrev = jest.fn()
    renderComponent({
      disablePrev: true,
      onPrev,
    })
    const button = screen.getByRole('button', { name: 'Previous' })
    expect(button).toBeDisabled()
  })

  test('should disable Previous button if step is START_STEP', () => {
    const onPrev = jest.fn()
    renderComponent({
      onPrev,
    })
    const button = screen.getByRole('button', { name: 'Previous' })
    expect(button).toBeDisabled()
  })

  test('should disable Next button if step is greater than FINISH_STEP', () => {
    jest
      .spyOn(BuildPlanContext, 'useBuildPlanContext')
      .mockReturnValue({ ...mockData, step: 3 as TStep })

    renderComponent()
    const button = screen.getByRole('button', { name: 'Next' })
    expect(button).toBeDisabled()
  })

  test('should trigger onPrev when Previous button is clicked', () => {
    const onPrev = jest.fn()
    renderComponent({
      onPrev,
    })
    const button = screen.getByRole('button', { name: 'Previous' })
    button.click()
    expect(onPrev).toBeCalled()
  })

  test('should trigger onNext when Next button is clicked', () => {
    jest
      .spyOn(BuildPlanContext, 'useBuildPlanContext')
      .mockReturnValue({ ...mockData, step: 1 as TStep })
    const onNext = jest.fn()
    renderComponent({
      onNext,
    })
    const button = screen.getByRole('button', { name: 'Next' })
    button.click()
    expect(onNext).toBeCalled()
  })
})
