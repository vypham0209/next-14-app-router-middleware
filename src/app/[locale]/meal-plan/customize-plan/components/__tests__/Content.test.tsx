//THIRD PARTY MODULES
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import Content from '../Content'
import { mockDataMachine } from '../__mocks__/machine-data'

jest.mock('../Weeks')
jest.mock('../Days')
jest.mock('../MealList')
jest.mock('../slide-over/DishDetailSlideOver')

const mockPush = jest.fn()
jest.mock('next-intl/client', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}))

jest.mock('_@shared/hooks/useProfile', () => jest.fn(() => [{ id: '123' }]))

const mockSend = jest.fn()
jest.mock('_@landing/machine/meal-plan.machine', () => ({
  useMealPlanActor: jest.fn(() => {
    return [mockDataMachine, mockSend]
  }),
}))

describe('Content', () => {
  test('should render successfully', async () => {
    render(<Content />)
    const button = await screen.findByRole('button', { name: 'Previous' })
    expect(button).toBeInTheDocument()
  })

  test('should disable Next button when form is invalid', async () => {
    jest.spyOn(require('react-hook-form'), 'useForm').mockImplementation(() => ({
      formState: { isValid: false },
      reset: jest.fn(),
      trigger: jest.fn(),
      handleSubmit: jest.fn((fn) => fn),
    }))
    render(<Content />)
    const button = await screen.findByRole('button', { name: 'Next' })
    expect(button).toBeDisabled()
  })

  test('should enable Next button when form is valid', async () => {
    jest.spyOn(require('react-hook-form'), 'useForm').mockImplementation(() => ({
      formState: { isValid: true },
      reset: jest.fn(),
      trigger: jest.fn(),
      handleSubmit: jest.fn((fn) => fn),
    }))

    render(<Content />)
    const button = await screen.findByRole('button', { name: 'Next' })
    expect(button).not.toBeDisabled()
  })

  test('should call push when Previous button is clicked', async () => {
    const user = userEvent.setup()
    render(<Content />)
    const button = await screen.findByRole('button', { name: 'Previous' })
    await user.click(button)
    expect(mockPush).toBeCalled()
  })

  test('should call push, set when Next button is clicked', async () => {
    const user = userEvent.setup()

    jest.spyOn(require('react-hook-form'), 'useForm').mockImplementation(() => ({
      formState: { isValid: true },
      reset: jest.fn(),
      trigger: jest.fn(),
      handleSubmit: jest.fn((fn) => fn),
    }))

    render(<Content />)
    const button = await screen.findByRole('button', { name: 'Next' })
    await user.click(button)
    expect(mockPush).toBeCalled()
    expect(mockSend).toBeCalled()
  })
})
