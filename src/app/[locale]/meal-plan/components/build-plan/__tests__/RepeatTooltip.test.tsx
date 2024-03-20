//THIRD PARTY MODULES
import { fireEvent, render, screen, waitFor } from '_@landing/test/utils'
//RELATIVE MODULES
import RepeatTooltip from '../RepeatTooltip'
//LAYOUT, COMPONENTS

describe('RepeatTooltip', () => {
  test('should render successfully', () => {
    render(<RepeatTooltip />)
    const icon = screen.getByRole('button')
    expect(icon).toBeInTheDocument()
  })

  test('should show and hide when mouse in and out', async () => {
    render(<RepeatTooltip />)
    const icon = screen.getByRole('button')
    fireEvent.mouseEnter(icon)
    waitFor(() => {
      const tooltip = screen.getByText(
        'The loop is counted from the first date you select. For example, if you choose to receive your meal on Wednesday and Thursday, after you receive your order on these two days, the next delivery will be counted from next week.',
      )
      expect(tooltip).toBeInTheDocument()

      fireEvent.mouseLeave(icon)
      expect(tooltip).not.toBeInTheDocument()
    })
  })

  test('should open on focus and close on blur', () => {
    render(<RepeatTooltip />)
    const icon = screen.getByRole('button')

    fireEvent.focus(icon)
    waitFor(() => {
      const tooltip = screen.getByText(
        'The loop is counted from the first date you select. For example, if you choose to receive your meal on Wednesday and Thursday, after you receive your order on these two days, the next delivery will be counted from next week.',
      )
      expect(tooltip).toBeInTheDocument()

      fireEvent.blur(icon)
      expect(tooltip).not.toBeInTheDocument()
    })
  })
})
