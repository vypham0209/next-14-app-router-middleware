//THIRD PARTY MODULES
import { render } from '_@landing/test/utils'
//LAYOUT, COMPONENTS
import StepWrapper from '_@landing/app/[locale]/meal-plan/components/build-plan/StepWrapper'

describe('StepWrapper', () => {
  it('renders children successfully', () => {
    const children = <div data-testid="child-element">Child Content</div>

    const { getByTestId } = render(<StepWrapper>{children}</StepWrapper>)
    const childElement = getByTestId('child-element')

    expect(childElement).toBeInTheDocument()
  })
})
