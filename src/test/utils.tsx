//THIRD PARTY MODULES
import { NextIntlClientProvider } from 'next-intl'
import { fireEvent, render } from '@testing-library/react'
//TYPES MODULES
import type { RenderOptions } from '_@landing/test/utils'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={{}}>
      {children}
    </NextIntlClientProvider>
  )
}

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options })
}

export * from '@testing-library/react'
export { customRender as render }

export const fireResizeEvent = (width: number) => {
  window.innerWidth = width
  fireEvent(window, new Event('resize'))
}
