'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
import Link from 'next-intl/link'
import { usePathname } from 'next-intl/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useCartActor } from '_@landing/machine/cart'
import { useLocale, useTranslations } from 'next-intl'
//LAYOUT, COMPONENTS
import Portal from '_@shared/components/Portal'
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import BrowserOnly from '_@shared/components/BrowserOnly'
import MenuMobile from '_@landing/layout/header/MenuMobile'
// import Button from '_@shared/components/button/Button'
import MenuDesktop from '_@landing/layout/header/MenuDesktop'
// import { languages } from '_@landing/layout/header/constants'
// import BaseSelect from '_@shared/components/select/BaseSelect'
import useStickyHeader from '_@landing/layout/header/useStickyHeader'
//SHARED
import WebIcon from '_@shared/icons/WebIcon'
import CartIcon from '_@shared/icons/CartIcon'
import LogoIcon from '_@shared/icons/LogoIcon'
// import { nextApi } from '_@shared/utils/api'
// import { api, nextApi } from '_@shared/utils/api'
import HamburgerIcon from '_@shared/icons/HamburgerIcon'
//HOOK, SERVER
// import useSetLocale from '_@landing/hook/setLocale'
import useWindowSize from '_@landing/hook/useWindowSize'
//HOOK
import useClickOutside from '_@landing/hook/useClickOutside'
//TYPES MODULES
import type { Languages } from '_@landing/layout/header/constants'

type Locales = Languages[number]['value']
const Header = () => {
  const t = useTranslations()
  const pathname = usePathname()
  // const setLocale = useSetLocale()
  const searchParams = useSearchParams().toString()
  const isHeaderSticky = useStickyHeader()
  const [{ context }] = useCartActor()
  const { dishes } = context
  const { width } = useWindowSize()
  const [openSidebar, setOpenSidebar] = useState(false)
  const locale = useLocale() as Locales
  const [lng, setLng] = useState<Locales>(locale)
  const ref = useRef(null)
  const isDesktop = width >= 1024

  useClickOutside({ ref, id: ['header-hamburger'] }, () => setOpenSidebar(false))

  useEffect(() => {
    document.body.style.overflow = openSidebar ? 'hidden' : 'auto'
  }, [openSidebar])

  useEffect(() => {
    setOpenSidebar(false)
  }, [pathname, searchParams, width])

  const isHomePage = pathname === '/' || pathname === ''
  const isColorful = (openSidebar && isDesktop) || isHeaderSticky || !isHomePage
  const isSticky = (openSidebar && isDesktop) || isHeaderSticky

  return (
    <header
      id="header"
      data-colorful={isColorful}
      className={classcat([
        'group/header w-full full-fledge',
        'sticky z-sticky transition-[top] duration-300',
        isSticky ? 'top-0 bg-yel-25' : '-top-30 bg-transparent md:hover/header:bg-yel-25',
      ])}
    >
      <div
        className={classcat(['flex h-18 items-center justify-between pe-3 ps-4 md:h-20 md:px-20'])}
      >
        {/* <Button.Outlined.Navy>pro</Button.Outlined.Navy> */}
        <div>
          <Link href="/">
            <LogoIcon
              className={classcat([
                'h-4.5 w-auto md:h-8',
                'text-white',
                'group-data-[colorful=true]/header:text-blu-500',
                'md:group-hover/header:text-blu-500',
              ])}
            />
          </Link>
        </div>
        <div className="flex items-center md:gap-6">
          <Button className="md:btn-medium" as="link" href="/exploring-food">
            {t('explore-food')}
          </Button>

          <BrowserOnly>
            {context.dishes.length > 0 ? (
              <div className="p-2.5 md:py-3">
                <Button
                  variant="ghost"
                  color="secondary"
                  leadingIcon={<CartIcon />}
                  className={classcat([
                    'group-data-[colorful=true]/header:text-blu-500 md:group-hover/header:text-blu-500 ',
                    '[&>*]:hover:text-yel-500 [&>span]:text-16 [&>span]:tracking-[0.02em] [&>span]:text-yel-500',
                    '[&>svg]:h-5 [&>svg]:w-5 md:[&>svg]:h-6 md:[&>svg]:w-6',
                  ])}
                  as="link"
                  href="/my-cart"
                >
                  ({dishes?.reduce((acc, item) => acc + item?.amount, 0) || 0})
                </Button>
              </div>
            ) : null}
          </BrowserOnly>

          <div
            className={classcat(['relative hidden shrink-0 items-center', 'md:flex md:space-x-1'])}
          >
            {/* <BaseSelect
              options={languages}
              value={lng}
              defaultValue="en"
              leadingIcon={<WebIcon className={classcat(['h-5 w-5'])} />}
              onValueChange={setLocale}
              contentProps={{
                className: 'min-w-[140px] z-dropdown',
              }}
              owStyles={{
                triggerClasses: [
                  '[&>*]:hover:text-yel-500',
                  'group-data-[colorful=true]/header:data-[state="closed"]:text-blu-500 group-hover/header:text-blu-500 ow:py-1',
                ],
              }}
            /> */}

            <WebIcon
              className={classcat([
                'h-5 w-5 shrink-0 text-white group-hover/header:text-blu-500 group-data-[colorful=true]/header:text-blu-500',
              ])}
            />
            <span className="text-14lig text-white group-hover/header:text-blu-500 group-data-[colorful=true]/header:text-blu-500">
              English
            </span>
          </div>

          <HamburgerButton onClick={() => setOpenSidebar((prev) => !prev)} className="shrink-0" />
        </div>
      </div>
      <Show when={isDesktop}>
        <MenuDesktop
          ref={ref}
          data-open={openSidebar}
          toggleOpen={() => setOpenSidebar((prev) => !prev)}
        />
      </Show>
      <Show when={!isDesktop}>
        <Portal asChild>
          <MenuMobile
            handleOpenSidebar={() => setOpenSidebar((prev) => !prev)}
            openSidebar={openSidebar}
            lng={lng}
            setLng={setLng}
          />
        </Portal>
      </Show>
    </header>
  )
}

export default Header

const HamburgerButton = ({ onClick, className }: { onClick: () => void; className: string }) => (
  <button
    id="header-hamburger"
    onClick={onClick}
    className={classcat(['py-2.5  pi-2.5', className])}
  >
    <HamburgerIcon
      className={classcat([
        'pointer-events-none cursor-pointer text-white',
        'group-data-[colorful=true]/header:text-blu-500',
        'md:group-hover/header:text-blu-500',
      ])}
    />
  </button>
)
