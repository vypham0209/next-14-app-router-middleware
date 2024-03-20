//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import Action, { TActionProps } from '../Action'
//LAYOUT, COMPONENTS

describe('Action', () => {
  const renderComponent = (props: TActionProps = {}) => {
    return render(<Action {...props} />)
  }

  test('should render successfully', () => {
    renderComponent()
    const container = screen.getByRole('button', { name: 'Next' }).closest('div')
    expect(container).toBeInTheDocument()
  })

  test('should disable Next button if disabledNext prop is provided', () => {
    renderComponent({
      disableNext: true,
    })
    const button = screen.getByRole('button', { name: 'Next' })
    expect(button).toBeDisabled()
  })

  test('should disable Previous button if disabledPrevious prop is provided', () => {
    const onPrev = jest.fn()
    renderComponent({
      disablePrev: true,
      onPrev,
    })
    const button = screen.getByRole('button', { name: 'Previous' })
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
    const onNext = jest.fn()
    renderComponent({
      onNext,
    })
    const button = screen.getByRole('button', { name: 'Next' })
    button.click()
    expect(onNext).toBeCalled()
  })
})
