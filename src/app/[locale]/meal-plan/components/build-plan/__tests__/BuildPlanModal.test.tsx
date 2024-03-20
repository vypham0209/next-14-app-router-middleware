//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
//LAYOUT, COMPONENTS
import BuildPlanModal from '_@landing/app/[locale]/meal-plan/components/build-plan/BuildPlanModal'

describe('BuildPlanModal', () => {
  test('should render successfully', () => {
    render(
      <BuildPlanModal>
        <div data-testid="children">Children</div>
      </BuildPlanModal>,
    )

    const children = screen.getByTestId('children')
    expect(children).toBeInTheDocument()
  })

  test('should use default button when no children provided', () => {
    render(<BuildPlanModal />)
    const children = screen.getByRole('button', { name: 'Build Your Plan Now' })
    expect(children).toBeInTheDocument()
  })

  test('should open and close the modal', async () => {
    const user = userEvent.setup()

    render(<BuildPlanModal />)
    const button = screen.getByRole('button', { name: 'Build Your Plan Now' })
    await user.click(button)
    const modal = screen.queryByText('Build my plan')
    expect(modal).toBeInTheDocument()

    const closeButton = screen.getByRole('dialog').querySelector('button')
    expect(closeButton).toBeInTheDocument()
    if (!closeButton) return
    await user.click(closeButton)
    expect(modal).not.toBeInTheDocument()
  })
})
