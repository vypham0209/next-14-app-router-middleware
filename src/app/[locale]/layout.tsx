//THIRD PARTY MODULES
import classcat from 'classcat'
import Script from 'next/script'
import { Outfit } from 'next/font/google'
import '_@landing/styles/input-number.css'
import { notFound } from 'next/navigation'
import { CartProvider } from '_@landing/machine/cart'
import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { NextIntlClientProvider, useLocale } from 'next-intl'
import { MealPlanProvider } from '_@landing/machine/meal-plan.machine'
import GlobalProviderServer from '_@landing/app/[locale]/global/GlobalProviderServer'
//LAYOUT, COMPONENTS
import Footer from '_@landing/layout/Footer'
import Header from '_@landing/layout/Header'
import Toast from '_@shared/components/Toast'
import AddCartToast from '_@landing/components/AddCartToast'
//RELATIVE MODULES
import './global.css'
import FooterProvider from './FooterProvider'
import ClientProvider from './ClientProvider'

//trigger build
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale()
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <ClerkProvider>
      <html dir="ltr" lang={locale} className={classcat([outfit.variable, 'scroll-smooth'])}>
        <head>
          <title>WOOBLEU</title>
          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta
            name="description"
            content="More than just a restaurant, WOOBLEU Dubai is an upscale, immersive, multi-dimensional experience inspired by the vibrant gastronomic heritage of African cultures. From digital to physical, from the West African region to Dubai, finding common ground in the astonishingly. WOOBLEU effortlessly combines authenticity with innovation to create captivating sensory journeys."
          />
          <meta name="format-detection" content="telephone=no" />
          <link rel="icon" href="/favicon.ico" />
          {process.env.NODE_ENV === 'production' ? (
            <>
              <Script
                id="Cookiebot"
                src="https://consent.cookiebot.com/uc.js"
                data-cbid="88a6fafe-7929-478f-ab19-2cf2742b407e"
                data-blockingmode="auto"
                type="text/javascript"
                defer
              ></Script>
              <Script id="Tawk" type="text/javascript">{`
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/650157e90f2b18434fd8381f/1ha6juq67';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
                window.Tawk_API = window.Tawk_API || {};
                window.Tawk_API.customStyle = { zIndex : 10 };
                })();
              `}</Script>
            </>
          ) : null}
        </head>
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ClientProvider>
              <GlobalProviderServer>
                <CartProvider>
                  <MealPlanProvider>
                    <Toast />
                    <AddCartToast />
                    <FooterProvider>
                      <div
                        id="main"
                        className={classcat([
                          'grid grid-cols-[1fr_calc(min(100vw,_var(--max-bound))_-_(var(--site-pad)*2))_1fr]',
                          '[&>*]:col-span-1 [&>*]:col-start-2',
                          'overflow-auto scroll-smooth bg-yel-25',
                        ])}
                      >
                        <Header />
                        {children}
                        <Footer />
                      </div>
                    </FooterProvider>
                  </MealPlanProvider>
                </CartProvider>
              </GlobalProviderServer>
            </ClientProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
