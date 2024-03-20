'use client';
//THIRD PARTY MODULES
import { usePathname } from 'next-intl/client';
import { useEffect, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
//CONFIG
import { Locales } from '_@landing/config/locale';

export default function useSetLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (!isLoading) return;
    router.refresh();
  }, [isLoading, router]);

  return (locale: Locales) => {
    const queryString = searchParams.toString();
    let url = `/${locale}${pathname}`;
    if (queryString) {
      url += `?${queryString}`;
    }
    startTransition(() => router.replace(url));
  };
}
