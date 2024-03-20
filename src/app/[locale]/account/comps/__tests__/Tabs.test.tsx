//THIRD PARTY MODULES
import { ComponentPropsWithoutRef } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '_@landing/test/utils'
//RELATIVE MODULES
import Tabs from '../Tabs'
import { TAB_LIST } from '../__mocks__/mock-data'

describe('Tabs', () => {
  const renderComponent = (props?: Partial<ComponentPropsWithoutRef<typeof Tabs>>) => {
    return render(
      <Tabs
        defaultValue={TAB_LIST[1].value}
        tabList={TAB_LIST}
        ariaLabel="Mock aria label"
        {...props}
      />,
    )
  }
  test('should render successfully', () => {
    renderComponent()
    const list = screen.getByRole('tablist')
    expect(list).toBeInTheDocument()
  })

  test('should render exactly number of tabs', () => {
    renderComponent()

    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).toEqual(TAB_LIST.length)

    TAB_LIST.forEach((tab) => {
      const button = screen.getByRole('tab', { name: tab.label })
      expect(button).toBeInTheDocument()
    })
  })

  test('should render without defaultValue props', () => {
    renderComponent({
      defaultValue: undefined,
    })

    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
  })

  test('should render with empty tabList', () => {
    renderComponent({
      tabList: [],
    })
    const tabs = screen.queryByRole('tab')
    expect(tabs).not.toBeInTheDocument()
  })

  test('should render exactly active tab content', () => {
    renderComponent()
    const tabs = screen.getAllByRole('tab')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')

    const content = screen.getByText('Orders Content')
    expect(content).toBeInTheDocument()
  })

  test('should call onChange when tab button is clicked', async () => {
    const mockOnChange = jest.fn()
    const user = userEvent.setup()
    renderComponent({
      onChange: mockOnChange,
    })
    const tabs = screen.getAllByRole('tab')

    await user.click(tabs[2])

    expect(mockOnChange).toHaveBeenCalled()
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
  })
})
