//THIRD PARTY MODULES
import createMiddleware from 'next-intl/middleware';
import { constants, verifyToken } from '@clerk/backend';
//HOOK, SERVER
import { NextRequest, NextResponse } from 'next/server';
//CONFIG
import { locales } from '_@landing/config/locale';

const authUrls = ['/auth'];

const protectedUrls = ['/account', '/account/order-detail'];

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { headers, cookies } = request;
  const defaultLocale = headers.get('x-default-locale') || 'en';
  headers.set('x-url', request.url);
  const session = cookies.get(constants.Cookies.Session)?.value;
  const clientUat = cookies.get(constants.Cookies.ClientUat)?.value;

  //handle auth routing
  let isUser = false;
  if (clientUat !== '0' && session) {
    const verify = await verifyToken(session, {
      issuer: null,
      secretKey: process.env.CLERK_SECRET_KEY as string,
    }).catch((e) => {
      console.log("Can't verify token", e.message);
      return false;
    });

    console.log('🚀 ~ file: middleware.ts ~ verify:', JSON.stringify(verify, null, 2));

    const deactivated = (verify as any)?.metadata?.deactivated as boolean;
    const role = (verify as any)?.metadata?.role as string;

    if (deactivated && role !== 'ADMIN') {
      return NextResponse.redirect(`${url.origin}/auth`, {
        headers: {
          'set-cookie': `${constants.Cookies.Session}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`,
        },
      });
    }

    isUser = Boolean(verify);
    headers.set('x-is-auth', isUser ? 'true' : 'false');
  } else {
    console.log("Can't find session");
  }

  if (authUrls.find((value) => url.pathname.includes(value)) && isUser) {
    return NextResponse.redirect(url.origin);
  }

  if (protectedUrls.find((value) => url.pathname.includes(value)) && !isUser) {
    url.search = `?redirect=${url.pathname}`;
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  //handle i18n routing
  const handleI18nRouting = createMiddleware({
    locales: locales as unknown as string[],
    defaultLocale,
  });
  const response = handleI18nRouting(request);
  headers.set('x-default-locale', defaultLocale);
  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
