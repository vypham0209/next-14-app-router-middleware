//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import JustAMomentModal, { TJustAMomentModalProps } from '../JustAMomentModal'

describe('JustAMomentModal', () => {
  const renderComponent = (props: TJustAMomentModalProps) => {
    return render(<JustAMomentModal {...props} />)
  }

  test('should render successfully', () => {
    const mockSetOpen = jest.fn()
    const mockOnContinue = jest.fn()

    renderComponent({
      open: true,
      setOpen: mockSetOpen,
      onContinue: mockOnContinue,
    })

    const title = screen.getByText('Just a moment!')
    expect(title).toBeInTheDocument()
  })

  test('should call setOpen', async () => {
    const user = userEvent.setup()
    const mockSetOpen = jest.fn()
    const mockOnContinue = jest.fn()

    renderComponent({
      open: true,
      setOpen: mockSetOpen,
      onContinue: mockOnContinue,
    })

    const closeButton = screen.getByRole('dialog').querySelector('div')?.querySelector('button')
    if (!closeButton) return
    await user.click(closeButton)

    expect(mockSetOpen).toHaveBeenCalled()
  })

  test('should call onContinue when Continue button is clicked', async () => {
    const user = userEvent.setup()
    const mockSetOpen = jest.fn()
    const mockOnContinue = jest.fn()

    renderComponent({
      open: true,
      setOpen: mockSetOpen,
      onContinue: mockOnContinue,
    })
    const anchorElement = screen.getByText('Continue as a guest')
    if (!anchorElement) return
    await user.click(anchorElement)

    expect(mockOnContinue).toHaveBeenCalled()
  })

  test('should call onContinue when Sign in button is clicked', async () => {
    const user = userEvent.setup()
    const mockSetOpen = jest.fn()
    const mockOnContinue = jest.fn()

    renderComponent({
      open: true,
      setOpen: mockSetOpen,
      onContinue: mockOnContinue,
    })
    const anchorElement = screen.getByText('Sign me up!')
    if (!anchorElement) return
    await user.click(anchorElement)

    expect(mockOnContinue).toHaveBeenCalled()
  })
})
