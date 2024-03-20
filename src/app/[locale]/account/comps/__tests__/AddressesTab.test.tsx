//THIRD PARTY MODULES
import { render, screen } from '_@landing/test/utils'
//SHARED
import { nextApi } from '_@shared/utils/api'
//RELATIVE MODULES
import AddressesTab from '../AddressesTab'
import { mockAddress } from '../__mocks__/mock-data'

jest.mock('../Addresses')

jest.mock('_@shared/utils/api', () => {
  return {
    nextApi: {
      address: {
        getMyAddresses: {
          useQuery: jest.fn(),
        },
      },
    },
  }
})

jest.mock('_@landing/app/[locale]/global/GlobalProvider', () => {
  return {
    useGlobalContext: jest.fn(() => ({
      user: null,
    })),
  }
})

describe('AddressesTab', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should not render Addresses component if user is not logged in', () => {
    ;(nextApi.address.getMyAddresses.useQuery as any).mockReturnValue({
      data: mockAddress,
      isLoading: false,
    })

    render(<AddressesTab />)

    expect(screen.queryByText('Addresses')).not.toBeInTheDocument()
  })
})
