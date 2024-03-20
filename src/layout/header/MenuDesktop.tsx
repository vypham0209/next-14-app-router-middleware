'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import { useClerk } from '@clerk/nextjs'
import { Category } from '@prisma/client'
import { usePathname, useRouter } from 'next-intl/client'
import { useGlobalContext } from '_@landing/app/[locale]/global/GlobalProvider'
import { ComponentPropsWithoutRef, LegacyRef, forwardRef, useMemo } from 'react'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import UserIcon from '_@shared/icons/UserIcon'
import OrderIcon from '_@shared/icons/OrderIcon'
import LogoutIcon from '_@shared/icons/LogoutIcon'
import cookieHandler from '_@shared/utils/cookieHandler'
//RELATIVE MODULES
import HeaderSearch from './HeaderSearch'
import { headerExploringItem, headerItems } from './constants'
import { getLoginRedirectUrl } from './get-login-redirect-url'

function MenuDesktopWithRef(
  { className, toggleOpen, ...props }: ComponentPropsWithoutRef<'div'> & { toggleOpen: () => void },
  ref: LegacyRef<HTMLDivElement>,
) {
  const { user } = useGlobalContext()
  const isSignedIn = Boolean(user?.id)
  const router = useRouter()
  const { signOut } = useClerk()
  const { categories, setUser } = useGlobalContext()
  const pathname = usePathname()

  const navListColumns = useMemo(() => {
    if (!categories) return []
    return [
      {
        ...headerExploringItem,
        children: [
          ...categories.data.map((category) => ({
            title: category.title,
            link: `/exploring-food/?categoryId=${
              categories.metaCategory.find((meta) => meta.metaCategory === category.title)?.id || ''
            }`,
            children: getColumns(category?.data, 2),
          })),
        ],
      },
      ...headerItems,
    ]
  }, [categories])

  return (
    <div
      ref={ref}
      className={classcat([
        'absolute left-0 z-overlay',
        'w-full space-y-10 backdrop-blur-[5px] transition-[grid-template-rows] duration-200',
        'grid grid-rows-[0fr] overflow-hidden data-[open=true]:grid-rows-[1fr]',
        className,
      ])}
      {...props}
    >
      <div className="max-h-[calc(100vh-var(--h-header))] overflow-auto bg-blu-600/90 scrollbar-hide">
        <div className="flex w-full px-[--max-padding] py-10 md:space-i-10">
          <div className={classcat(['relative grid flex-1 gap-10 overflow-hidden truncate'])}>
            <div className="flex h-108">
              <div id="header_menu" className={classcat(['relative shrink-0 space-y-4'])}>
                {navListColumns.map((nav, ind) => (
                  <div
                    key={ind}
                    className={classcat(['group/menu cursor-default select-none text-white'])}
                  >
                    <Button
                      as="link"
                      href={nav.link}
                      variant="ghost"
                      color="secondary"
                      className={classcat([
                        'ow:[&>span]:text-24 ',
                        'group-hover/menu:text-yel-500 group-hover/menu:shadow-[inset_0_-1px] group-hover/menu:shadow-yel-500',
                      ])}
                      onClick={() => {
                        if (nav.link.includes('#')) toggleOpen()
                      }}
                    >
                      {nav.title}
                    </Button>
                    <div
                      className={classcat([
                        'absolute inset-0 start-[100%] w-fit',
                        'invisible opacity-0 transition-opacity duration-200 ease-in-out',
                        'group-hover/menu:visible group-hover/menu:opacity-100',
                      ])}
                    >
                      <div className={classcat(['relative shrink-0 space-y-4'])}>
                        {nav.children?.map((child, idn) => (
                          <div
                            key={idn}
                            className={classcat([
                              'group/category cursor-default select-none ps-16 text-white',
                            ])}
                          >
                            <Button
                              as="link"
                              href={child.link}
                              variant="ghost"
                              color="secondary"
                              className={classcat([
                                'ow:[&>span]:text-24 ',
                                'group-hover/category:text-yel-500 group-hover/category:shadow-[inset_0_-1px] group-hover/category:shadow-yel-500',
                              ])}
                            >
                              {child.title}
                            </Button>
                            <div
                              className={classcat([
                                'absolute inset-0 start-[100%] w-fit',
                                'invisible opacity-0 transition-opacity duration-200 ease-in-out',
                                'group-hover/category:visible group-hover/category:opacity-100',
                              ])}
                            >
                              <div
                                className={classcat([
                                  'h-108 overflow-auto scrollbar-hide',
                                  'flex flex-col justify-between gap-10 ps-16 xl:flex-row',
                                  'gap-4 xl:gap-10',
                                ])}
                              >
                                {child?.children?.map((item, ind) => (
                                  <div key={ind} className="flex w-fit flex-1 flex-col gap-4">
                                    {item?.map((value) => (
                                      <Button
                                        variant="ghost"
                                        color="secondary"
                                        href={`/exploring-food/?categoryId=${value.id}`}
                                        as="link"
                                        key={value.id}
                                        className="btn-very-big  text-start"
                                      >
                                        {value.name}
                                      </Button>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <HeaderSearch className="max-w-[theme(spacing[162])]" />
          </div>

          <div className="grid w-70 auto-rows-min items-start gap-6 border-l border-blu-400 ps-10">
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

            <Button
              variant="ghost"
              color="secondary"
              className="btn-very-big"
              leadingIcon={<UserIcon className="h-5 w-5" />}
              as="link"
              prefetch={false}
              href={isSignedIn ? '/account' : getLoginRedirectUrl(pathname)}
            >
              {isSignedIn ? 'ACCOUNT' : 'SIGN UP / LOGIN'}
            </Button>
            <Button
              variant="ghost"
              color="secondary"
              className="btn-very-big ow:[&>span]:text-start"
              leadingIcon={
                isSignedIn ? <LogoutIcon className="h-5 w-5" /> : <OrderIcon className="h-5 w-5" />
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
            >
              {isSignedIn ? (
                'LOGOUT'
              ) : (
                <>
                  TRACK ORDER OR
                  <br />
                  MEAL PLAN
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="h-px bg-blu-400" />

        <div className="grid grid-cols-[1fr_theme(spacing.65)] items-center gap-4 px-[--max-padding] py-8">
          <p className="w-full flex-1 text-20 font-light text-white">
            Hassle-free, calorie-strict meals right to your door
          </p>
          <Button as="link" href="/meal-plan" color="secondary" className="btn-big">
            EXPLORE OUR MEAL PLANS
          </Button>
        </div>
      </div>
    </div>
  )
}

const MenuDesktop = forwardRef(MenuDesktopWithRef)
export default MenuDesktop

const getColumns = (arr: any[] | undefined, n: number): Category[][] => {
  if (!arr) return []
  const len = arr.length
  const out = []
  let i = 0
  while (i < len) {
    const size = Math.ceil((len - i) / n--)
    out.push(arr.slice(i, (i += size)))
  }
  return out
}
