'use client'

//THIRD PARTY MODULES
import { PropsWithChildren, useEffect } from 'react'
//LAYOUT, COMPONENTS
import ConfirmModal from '_@shared/components/dialog/ConfirmModal'
//SHARED
import { nextApi } from '_@shared/utils/api'
//HOOK, SERVER
import usePreventScrolling from '_@landing/hook/usePreventScrolling'

if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
  // @ts-ignore
  window.ResizeObserver = function () {
    return {
      observe() {},
      unobserve() {},
      disconnect() {},
    }
  }
}

const Provider = nextApi.withTRPC(({ children }: PropsWithChildren) => {
  usePreventScrolling()

  return (
    <ConfirmModal.Root>
      <ConfirmModal.LandingContent />
      {children}
    </ConfirmModal.Root>
  )
})

// Create this Wrapper because of TS error
export default function ClientProvider({ children }: PropsWithChildren) {
  // Cookiebot delete cookies and localstorage on click
  // This lead to clerk-db-jwt in localstorage is deleted, and user cant signin/signup
  useEffect(() => {
    let count = 0

    // Cookie Panel is loaded async, so we need to polling to check if it is loaded
    const t = setInterval(() => {
      count++
      const item = document.getElementById('CybotCookiebotDialogBodyButtonsWrapper')
      if (item) {
        clearInterval(t)
        item.onclick = () => window.location.reload()
      }
      // If it is not loaded after 5s, stop polling
      if (count > 10) {
        clearInterval(t)
      }
    }, 500)
  }, [])

  // @ts-ignore
  return <Provider>{children}</Provider>
}
