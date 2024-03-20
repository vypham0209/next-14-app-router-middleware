'use client';

//THIRD PARTY MODULES
import { useEffect } from 'react';
import { useRouter } from 'next-intl/client';
import { useSearchParams } from 'next/navigation';
import { MagicLinkErrorCode, useClerk } from '@clerk/nextjs';

export declare class MagicLinkError extends Error {
  code: string;
  constructor(code: string);
}

const REDIRECT_URL = (process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:2010') as string;

export default function AuthVerify() {
  const { handleMagicLinkVerification } = useClerk();
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrlParam = params.get('redirect');

  function verify() {
    handleMagicLinkVerification({
      redirectUrl: redirectUrlParam || REDIRECT_URL,
      redirectUrlComplete: redirectUrlParam || REDIRECT_URL,
    }).catch((error: MagicLinkError) => {
      const err = error as MagicLinkError;

      if (err.code === MagicLinkErrorCode.Expired) {
        router.push('/link-expired');
      }
    });
  }

  useEffect(() => {
    const session = params.get('__clerk_created_session');
    const status = params.get('__clerk_status');

    if (status === 'expired') {
      router.push('/link-expired');
    } else if (session) {
      verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return <h1></h1>;
}
