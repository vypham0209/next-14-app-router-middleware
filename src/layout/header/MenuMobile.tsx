//THIRD PARTY MODULES
import classcat from 'classcat'
import { useClerk } from '@clerk/nextjs'
import { forwardRef, useEffect, useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { usePathname, useRouter } from 'next-intl/client'
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Switch from '_@shared/components/conditions/Switch'
// import BaseSelect from '_@shared/components/select/BaseSelect'
import {
  headerExploringItem,
  headerItems,
  // languages
} from '_@landing/layout/header/constants'
//SHARED
import WebIcon from '_@shared/icons/WebIcon'
import UserIcon from '_@shared/icons/UserIcon'
import CloseIcon from '_@shared/icons/CloseIcon'
import OrderIcon from '_@shared/icons/OrderIcon'
import LogoutIcon from '_@shared/icons/LogoutIcon'
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon'
import cookieHandler from '_@shared/utils/cookieHandler'
import ChevronRightIcon from '_@shared/icons/ChevronRightIcon'
//RELATIVE MODULES
import HeaderSearch from './HeaderSearch'
import { getLoginRedirectUrl } from './get-login-redirect-url'
//TYPES MODULES
import type { Languages } from '_@landing/layout/header/constants'

type Props = {
  openSidebar: boolean
  handleOpenSidebar: () => void
  lng: Languages[number]['value']
  setLng: (lng: Languages[number]['value']) => void
} & React.ComponentProps<'div'>

const MenuMobile = forwardRef<HTMLDivElement, Props>(function Menu(
  {
    handleOpenSidebar,
    openSidebar,
    // lng,
    // setLng,
    className,
    ...props
  },
  ref,
) {
  const router = useRouter()
  const { categories, setUser } = useGlobalContext()
  const { user } = useGlobalContext()
  const isSignedIn = Boolean(user?.id)
  const { signOut } = useClerk()
  const [selectedMenu, setSelectedMenu] = useState<string>()
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const pathname = usePathname()

  const navListColumns = categories
    ? [
        ...categories.data.map((category) => ({
          ...category,
          link: `/exploring-food/?categoryId=${
            categories.metaCategory.find((meta) => meta.metaCategory === category.title)?.id || ''
          }`,
        })),
      ]
    : []

  const onClose = () => {
    setSelectedMenu(undefined)
    setSelectedCategory(undefined)
    handleOpenSidebar()
  }

  useEffect(() => {
    setSelectedMenu(undefined)
    setSelectedCategory(undefined)
  }, [openSidebar])

  return (
    <div
      className={classcat([
        'fixed start-0 top-0 z-overlay h-screen w-screen overflow-hidden lg:hidden',
        openSidebar
          ? 'flex animate-open-sidebar flex-col bg-blu-600/90 backdrop-blur-[5px]'
          : 'hidden',
        className,
      ])}
      ref={ref}
      {...props}
    >
      <div className="h-full overflow-auto pb-8 scrollbar-hide">
        <div className={classcat(['pt-6  pi-6'])}>
          <Button
            trailingIcon={<CloseIcon className="h-5 w-5" />}
            className="btn-medium ml-auto"
            variant="ghost"
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <div className="grid gap-6 pb-8 pt-6">
          <div className={classcat(['relative grid gap-6 pi-6'])}>
            <div className={classcat(['grid gap-y-2'])}>
              {[headerExploringItem, ...headerItems].map((nav, ind) => {
                const isExpandable = [headerExploringItem.link].includes(nav.link)
                return (
                  <div key={ind} className="grid grid-flow-col justify-between">
                    <Button
                      variant="ghost"
                      color="secondary"
                      className={classcat(['justify-between [&>svg]:h-6 [&>svg]:w-6'])}
                      as="link"
                      href={nav.link}
                      onClick={onClose}
                    >
                      <span className="text-24">{nav.title}</span>
                    </Button>
                    {isExpandable && (
                      <Button
                        variant="ghost"
                        color="secondary"
                        trailingIcon={<ChevronRightIcon />}
                        className={classcat(['[&>svg]:h-6 [&>svg]:w-6'])}
                        onClick={() => setSelectedMenu(nav.title)}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            <HeaderSearch />

            <div className="grid gap-y-1 pb-7">
              <Switch.Root>
                <Switch.Case when={isSignedIn}>
                  <div className="grid gap-1">
                    <p className="text-20 text-yel-500">Welcome back!</p>
                    <p className="text-16lig text-white">{user?.email || ''}</p>
                  </div>
                </Switch.Case>
                <Switch.Case when={true}>
                  <p className="text-20 text-yel-500">Hello, Guest!</p>
                </Switch.Case>
              </Switch.Root>
              <div className="py-1.5">
                <Button
                  leadingIcon={<UserIcon className="h-4 w-4" />}
                  variant="ghost"
                  color="secondary"
                  className="uppercase"
                  as="link"
                  prefetch={false}
                  href={isSignedIn ? '/account' : getLoginRedirectUrl(pathname)}
                >
                  {isSignedIn ? 'ACCOUNT' : 'Sign up / Login'}
                </Button>
              </div>
              <div className="py-1.5">
                <Button
                  leadingIcon={
                    isSignedIn ? (
                      <LogoutIcon className="h-4 w-4" />
                    ) : (
                      <OrderIcon className="h-4 w-4" />
                    )
                  }
                  onClick={async () => {
                    if (isSignedIn) {
                      await signOut()
                      setUser(undefined)
                      cookieHandler.remove('__session')
                      router.replace('/')
                    } else {
                      router.push('/tracking-order')
                    }
                  }}
                  variant="ghost"
                  color="secondary"
                  className="uppercase"
                >
                  {isSignedIn ? 'LOGOUT' : 'TRACK ORDER OR MEAL PLAN'}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-16 text-white ">Site language</div>

              {/* <BaseSelect
                withPortal={false}
                options={languages}
                value={lng}
                onValueChange={(value) => setLng(value)}
                contentProps={{
                  className: 'min-w-[140px]',
                }}
                owStyles={{
                  triggerClasses:
                    'ow:bg-transparent border-none ow:w-fit text-white gap-1 py-0 ow:h-auto',
                }}
              /> */}

              <span className="text-14lig text-white">English</span>
            </div>
          </div>
          <div className="grid gap-4 border-t border-blu-400 py-4 pi-6">
            <p className="text-14 font-light text-white">
              Hassle-free, calorie-strict meals right to your door
            </p>
            <Button href="/meal-plan" as="link" className="btn-medium uppercase" color="secondary">
              Explore our Meal Plans
            </Button>
          </div>
        </div>
      </div>

      <div
        className={classcat([
          'bg-[#133448] backdrop-blur-[5px]',
          'absolute top-0 flex h-screen w-screen flex-col space-y-6 overflow-hidden pb-8 transition-transform duration-200 ease-in-out',
          selectedMenu ? 'translate-x-0' : '-translate-x-full',
        ])}
      >
        <div className={classcat(['pt-6  pi-6'])}>
          <Button
            trailingIcon={<CloseIcon className="h-5 w-5" />}
            className="btn-medium ml-auto"
            variant="ghost"
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <div className="grid h-full content-start gap-6">
          <div className={classcat(['relative grid gap-6 pi-6'])}>
            <div className={classcat(['grid gap-y-2'])}>
              {navListColumns?.map((nav, ind) => (
                <div key={ind} className="grid grid-flow-col justify-between">
                  <Button
                    variant="ghost"
                    color="secondary"
                    className={classcat(['justify-between [&>svg]:h-6 [&>svg]:w-6'])}
                    as="link"
                    href={nav.link}
                    onClick={onClose}
                  >
                    <span className="text-24">{nav.title}</span>
                  </Button>
                  {nav.data && (
                    <Button
                      variant="ghost"
                      color="secondary"
                      trailingIcon={<ChevronRightIcon />}
                      className={classcat(['justify-between [&>svg]:h-6 [&>svg]:w-6'])}
                      onClick={() => {
                        if (nav.data) {
                          setSelectedCategory(nav.title)
                        }
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          color="secondary"
          className="mx-auto ow:w-31.75"
          leadingIcon={<ArrowLeftIcon className="h-4 w-4" />}
          onClick={() => {
            setSelectedMenu(undefined)
          }}
        >
          Back
        </Button>
      </div>

      <div
        className={classcat([
          ' bg-[#133448] backdrop-blur-[5px]',
          'absolute top-0 flex h-screen w-screen flex-col space-y-6 overflow-hidden pb-8 transition-transform duration-200 ease-in-out',
          selectedCategory ? 'translate-x-0' : '-translate-x-full',
        ])}
      >
        <div className={classcat(['pt-6  pi-6'])}>
          <Button
            trailingIcon={<CloseIcon className="h-5 w-5" />}
            className="btn-medium ml-auto"
            variant="ghost"
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
        <ScrollArea.Root type="auto" className={classcat(['h-full overflow-hidden', className])}>
          <ScrollArea.Viewport className={classcat(['mb-4 h-full w-full'])}>
            <div className="flex-1 overflow-scroll scrollbar-hide">
              <div className="grid justify-items-center gap-2 pi-6">
                {selectedCategory &&
                  categories?.data
                    .find((value) => value.title === selectedCategory)
                    ?.data?.map((value) => {
                      return (
                        <Button
                          variant="ghost"
                          color="secondary"
                          className="btn-very-big text-center"
                          key={value.id}
                          href={`/exploring-food/?categoryId=${value.id}`}
                          as="link"
                        >
                          {value.name}
                        </Button>
                      )
                    })}
              </div>
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="me-4 flex w-1.5 touch-none select-none bg-blu-600 transition-colors duration-[160ms] ease-out"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="!w-full rounded-[1px] bg-yel-600" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        <Button
          color="secondary"
          className="mx-auto ow:w-31.75"
          leadingIcon={<ArrowLeftIcon className="h-4 w-4" />}
          onClick={() => {
            setSelectedCategory(undefined)
          }}
        >
          Back
        </Button>
      </div>
    </div>
  )
})

export default MenuMobile
