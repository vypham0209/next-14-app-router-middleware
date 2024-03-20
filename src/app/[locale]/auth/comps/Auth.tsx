'use client'

//THIRD PARTY MODULES
import Image from 'next/image'
import classcat from 'classcat'
import Link from 'next-intl/link'
import 'slick-carousel/slick/slick.css'
import { useRouter } from 'next-intl/client'
import 'slick-carousel/slick/slick-theme.css'
import { default as Slick } from 'react-slick'
import { useSearchParams } from 'next/navigation'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { PageContent } from '_@landing/app/[locale]/auth/page'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import Switch from '_@shared/components/conditions/Switch'
import BaseFormItem from '_@shared/components/BaseFormItem'
import FormInput from '_@shared/components/input/FormInput'
import InlineNotification from '_@shared/components/InlineNotification'
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '_@landing/components/client'
//SHARED
import { api } from '_@shared/utils/api'
import LoadingIcon from '_@shared/icons/LoadingIcon'
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon'
import cookieHandler from '_@shared/utils/cookieHandler'
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon'
import { emailOnly, type EmailOnly } from '_@shared/schemas/user'

export type ClerkError = {
  code: string
  message: string
  longMessage: string
  meta: Meta
}

export type Meta = {
  paramName: string
}

const REDIRECT_URL = (process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:2010') as string

const CountDown = memo(
  ({ time: _time, onCountdownComplete }: { time: number; onCountdownComplete?: () => void }) => {
    const [time, setTime] = useState(_time)

    useEffect(() => {
      let timer: NodeJS.Timeout
      if (time > 0) {
        timer = setTimeout(() => {
          setTime(time - 1)
        }, 1000)
      } else if (time === 0) {
        onCountdownComplete?.()
      }
      return () => {
        clearTimeout(timer)
      }
    }, [onCountdownComplete, time])

    return (
      <div className="flex items-center gap-x-1 text-12lig text-blu-400 lg:text-14lig">
        The user can click resend again after
        <span className="font-medium text-yel-500"> {time}s</span>
      </div>
    )
  },
)

type Props = {
  pageContent: PageContent
}

export default function Auth({ pageContent }: Props) {
  const router = useRouter()
  const { signUp, setActive: setSessionForSignUp } = useSignUp()
  const { signIn, setActive: setSessionForSignIn } = useSignIn()
  const magicLinkFlowForSignUp = signUp?.createMagicLinkFlow()
  const magicLinkFlowForSinIn = signIn?.createMagicLinkFlow()
  const refSlider = useRef<Slick>(null)
  const [selected, setSelected] = useState<PageContent['data'][number]>(pageContent.data[0])

  const actionStateRef = useRef<'signUp' | 'signIn'>('signIn')
  const [verified, setVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResendLoading, setIsResendLoading] = useState(false)
  const [submittedError, setSubmittedError] = useState<string>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDeactivated, setIsDeactivated] = useState(false)
  const [isResend, setIsResend] = useState(false)
  const formMethods = useForm<EmailOnly>({ resolver: zodResolver(emailOnly) })

  const {
    handleSubmit,
    getValues,
    formState: { isValid },
  } = formMethods
  const params = useSearchParams()
  const redirectUrlParam = params.get('redirect')

  const actions = useMemo(() => {
    if (!signUp || !signIn || !magicLinkFlowForSignUp || !magicLinkFlowForSinIn) return
    type SignUpResource = ReturnType<typeof magicLinkFlowForSignUp.startMagicLinkFlow>
    type SignInResource = ReturnType<typeof magicLinkFlowForSinIn.startMagicLinkFlow>

    const actions = {
      signUp: {
        cancel: magicLinkFlowForSignUp.cancelMagicLinkFlow,
        setSession: setSessionForSignUp,
        magicLinkFlow: magicLinkFlowForSignUp,
        getVerification: (res: Awaited<SignUpResource>) => {
          return res.verifications.emailAddress
        },
      },
      signIn: {
        cancel: magicLinkFlowForSinIn.cancelMagicLinkFlow,
        setSession: setSessionForSignIn,
        magicLinkFlow: magicLinkFlowForSinIn,
        getVerification: (res: Awaited<SignInResource>) => {
          return res.firstFactorVerification
        },
      },
    } as unknown as Record<
      'signUp' | 'signIn',
      {
        cancel: () => void
        setSession: typeof setSessionForSignUp
        magicLinkFlow: {
          startMagicLinkFlow: (props: {
            redirectUrl: string
            emailAddressId?: string
          }) => SignInResource | SignUpResource
        }
        getVerification: (
          res: Awaited<SignInResource | SignUpResource>,
        ) =>
          | Awaited<SignInResource>['firstFactorVerification']
          | Awaited<SignUpResource>['verifications']['emailAddress']
      }
    >

    return actions
  }, [
    magicLinkFlowForSignUp,
    magicLinkFlowForSinIn,
    setSessionForSignIn,
    setSessionForSignUp,
    signIn,
    signUp,
  ])

  const onSubmit = async (data: EmailOnly) => {
    setSubmittedError(undefined)
    try {
      setIsLoading(true)
      if (!actions || !signIn) return
      const email = data.email

      const user = await api.users.getUserByEmail.query(email)

      setIsDeactivated(user ? user.deactivated : false)
      if (user && user.deactivated) return

      const res = await signIn
        .create({ identifier: email })

        .catch((err: { clerkError: true; errors: ClerkError[] }) => ({
          clerkError: true,
          error: err.errors.pop(),
        }))

      setVerified(false)
      setIsSubmitted(true)

      const setSession = (session: string | null) => {
        setTimeout(
          () =>
            actions[actionStateRef.current].setSession({
              session,
              beforeEmit: () => {
                window.open(redirectUrlParam || REDIRECT_URL, '_self')
              },
            }),
          2000,
        )
      }

      let emailAddressId = ''
      if (!('clerkError' in res)) {
        const firstFactor = res.supportedFirstFactors.find(
          (ff) => ff.strategy === 'email_link' && ff.safeIdentifier === email,
        )
        if (firstFactor && 'strategy' in firstFactor && firstFactor.strategy === 'email_link') {
          emailAddressId = firstFactor.emailAddressId
        }
      }

      if ('clerkError' in res && res?.error?.code === 'form_identifier_not_found') {
        actionStateRef.current = 'signUp'
        await signUp?.create({ emailAddress: email })
      }
      cookieHandler.remove('__session')

      setIsResend(true)
      console.log('---- TRY1 ---')
      magicLinkFlowForSinIn?.cancelMagicLinkFlow()
      magicLinkFlowForSignUp?.cancelMagicLinkFlow()
      runFinally()
      const authRes = await actions[actionStateRef.current].magicLinkFlow.startMagicLinkFlow({
        redirectUrl:
          window.location.origin +
          `/verify-email${redirectUrlParam ? `?redirect=${redirectUrlParam}` : ''}`,
        emailAddressId: actionStateRef.current === 'signUp' ? undefined : emailAddressId,
      })
      console.log('---- TRY2 ---', authRes)
      const verification = actions[actionStateRef.current].getVerification(authRes)
      console.log({ verification })
      if (verification.verifiedFromTheSameClient()) {
        setVerified(true)
      } else if (verification.status === 'expired') {
        router.push('/link-expired')
      }
      console.log('---- TRY3 ---')
      if (authRes.status === 'complete') {
        setSession(authRes.createdSessionId)
      }
      console.log('---- TRY4 ---')
      setIsSubmitted(true)
    } catch (err: any) {
      console.log('---- catch ---', err)
      setSubmittedError(
        err?.errors?.[0]?.longMessage || // ex: "hieu.nguyen+5@sens-vn.co is not allowed to access this application."
          err?.errors?.[0]?.message || // ex: "Access not allowed."
          'Something went wrong. Please try again later.',
      )
    } finally {
      actionStateRef.current = 'signIn'
      runFinally()
    }
  }

  const runFinally = () => {
    console.log('RUN FINALLY')
    setIsLoading(false)
    setIsResendLoading(false)
  }

  const onResend = async () => {
    if (!actions) return
    await actions[actionStateRef.current].cancel()
    setIsResendLoading(true)
    const email = getValues('email')
    if (!email) return
    onSubmit({ email })
  }

  const settings: React.ComponentProps<typeof Slick> = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    beforeChange: (_, next) => setSelected(pageContent.data[next]),
  }

  const goTo = (index: number) => {
    refSlider.current?.slickGoTo(index)
  }

  const next = () => {
    if (!refSlider.current) return
    refSlider.current.slickNext()
  }

  const previous = () => {
    if (!refSlider.current) return
    refSlider.current.slickPrev()
  }

  return (
    <main className={classcat(['relative p-0 full-fledge', 'lg:min-h-[theme(spacing.199)]'])}>
      <div className="absolute inset-0 hidden h-full lg:block">
        <Slick
          {...settings}
          className={classcat([
            'h-full [&_.slick-list]:h-full [&_.slick-track]:h-full',
            '[&_.slick-slide>div]:h-full [&_.slick-slide]:h-full',
          ])}
          ref={refSlider}
        >
          {pageContent.data.map((item) => {
            const mediaUrl = item.mediaUrl || ''
            return (
              <Image
                key={item.mediaUrl}
                className="h-full w-full object-cover"
                src={
                  pageContent.isError ? mediaUrl : `${process.env.NEXT_PUBLIC_CDN_HOST}${mediaUrl}`
                }
                alt=""
                width={1440}
                height={796}
                sizes="(max-width: 1024px) 768px"
              />
            )
          })}
        </Slick>
      </div>
      <div
        className={classcat([
          'absolute bottom-0 h-[calc(524/816*100%)] w-full',
          'hidden lg:block',
          'bg-overlay-gradient-auth',
        ])}
      ></div>

      <div
        className={classcat([
          'isolate h-full w-full items-end gap-20',
          'lg:grid lg:grid-cols-[1fr_400px] lg:justify-items-center lg:py-20',
          'lg:max-content',
        ])}
      >
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classcat([
              'align-center',
              'flex h-full flex-col bg-yel-25',
              'pb-20 pt-6 pi-[--site-pad] sm:py-14 xl:mi-20',
            ])}
          >
            <div className="space-y-10">
              <div className="space-y-4 text-blu-400">
                <h5 className="text-28 lg:text-36 ">Glad you’re here 🤟</h5>
                <p className="text-14lig lg:text-16lig">
                  We have made the sign up / login process as simple as possible. No more lengthy,
                  hard-to-remember passwords, you just need to open your email, click on the link we
                  sent you and voilà, you’re in!
                </p>
              </div>
              <div className="flex flex-1 flex-col space-y-6 lg:min-h-[200px]">
                <BaseFormItem
                  labelProps={{ className: 'text-14' }}
                  label="What’s your email?"
                  name="email"
                >
                  <FormInput name="email" className="input-large" placeholder="Type here" />
                </BaseFormItem>

                <Switch.Root>
                  <Switch.Case when={isDeactivated}>
                    <div className="space-y-4">
                      <InlineNotification
                        color="error"
                        description="We regret to inform you that your account has been suspended. For more information and assistance, please reach out to our support team."
                      />
                    </div>
                  </Switch.Case>
                  <Switch.Case when={submittedError}>
                    <div className="space-y-4">
                      <InlineNotification color="error" description={submittedError || ''} />
                    </div>
                  </Switch.Case>
                  <Switch.Case when={isSubmitted}>
                    <div className="space-y-4">
                      <InlineNotification
                        color="success"
                        description=" Whoosh! Our email has landed in your inbox. Now click that link and you’re done!"
                      />
                      {isResend ? (
                        <CountDown
                          time={30}
                          onCountdownComplete={() => {
                            setIsResend(false)
                          }}
                        />
                      ) : (
                        <Switch.Root>
                          <Switch.Case when={isResendLoading}>
                            <p className="flex items-center gap-x-1 text-12lig text-blu-400 lg:text-14lig">
                              Please wait for awhile before requesting new link
                              <LoadingIcon className="h-[calc(15rem/16) w-[calc(15rem/16)]" />
                            </p>
                          </Switch.Case>
                          <Switch.Case when={true}>
                            <p className="text-12lig text-blu-400 lg:text-14lig">
                              Didn’t received any? Check your Spam/Junk folder or{' '}
                              <a
                                onClick={onResend}
                                className="cursor-pointer font-medium text-yel-500"
                              >
                                Click here to resend
                              </a>
                            </p>
                          </Switch.Case>
                        </Switch.Root>
                      )}
                    </div>
                  </Switch.Case>
                </Switch.Root>
                <Show when={verified}>
                  <p>Our email has landed in your inbox</p>
                </Show>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Show when={!isSubmitted}>
                  <Button
                    disabled={!isValid}
                    type="submit"
                    color="navy"
                    className="btn-very-big w-full"
                    isLoading={isLoading}
                  >
                    Continue
                  </Button>
                </Show>
              </div>
            </div>

            <p className="mt-6 text-12 font-light text-blu-300 lg:mt-10">
              By registering, you agree to our{' '}
              <Link href="/privacy-policy" className="font-medium text-yel-500">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/terms-of-service" className="font-medium text-yel-500">
                Terms of Service
              </Link>
            </p>
          </form>
        </FormProvider>

        <div className="hidden h-full w-full flex-col justify-end space-y-10 bg-transparent lg:flex">
          <div className="relative grow">
            {pageContent.data.map((item) => {
              return (
                <div
                  key={item.mediaUrl}
                  className={classcat([
                    'absolute inset-0',
                    selected?.mediaUrl === item.mediaUrl
                      ? 'opacity-100'
                      : 'pointer-events-none opacity-0',
                  ])}
                >
                  <ScrollAreaRoot className=" h-full overflow-hidden">
                    <ScrollAreaViewport className="grid h-full items-end">
                      <p className={classcat(['block text-18 text-white'])}>{item.description}</p>
                    </ScrollAreaViewport>
                    <ScrollAreaScrollbar
                      orientation="vertical"
                      className="touch-none select-none rounded-[0.0625rem] bg-yel-200 data-[orientation=vertical]:w-1.5"
                    >
                      <ScrollAreaThumb className="rounded-[0.0625rem] bg-yel-400" />
                    </ScrollAreaScrollbar>
                  </ScrollAreaRoot>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <div
              className={classcat([
                'relative flex items-center gap-4',
                selected?.mediaUrl === pageContent.data[0]?.mediaUrl ? 'pl-2' : '',
              ])}
            >
              {pageContent.data.map((item, index) => (
                <div
                  key={item.mediaUrl}
                  className={classcat([
                    selected?.mediaUrl === pageContent.data[index].mediaUrl
                      ? 'h-2 w-6 rounded-full bg-white'
                      : 'h-2 w-2 cursor-pointer rounded-full bg-yel-500',
                  ])}
                  onClick={() => goTo(index)}
                ></div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                shape="pill"
                variant="outlined"
                color="secondary"
                className="ow:h-9 ow:w-9 ow:p-0 ow:[&>svg]:h-5 ow:[&>svg]:w-5"
                onClick={previous}
                leadingIcon={<ArrowLeftIcon className="text-current" />}
              />

              <Button
                shape="pill"
                variant="outlined"
                color="secondary"
                className="ow:h-9 ow:w-9 ow:p-0 ow:[&>svg]:h-5 ow:[&>svg]:w-5"
                onClick={next}
                leadingIcon={<ArrowRightIcon className="text-current" />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
