//THIRD PARTY MODULES
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next-intl/client';
//SHARED
import handleFilterQueryString from '_@shared/utils/handleFilterQueryString';

export default function useFilterQueryString() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = useCallback(
    (data: Record<any, any>, _pathname = '', scrollTop = true) => {
      router.push((_pathname || pathname) + '?' + handleFilterQueryString(searchParams, data), {
        scroll: scrollTop,
      });
    },
    [pathname, router, searchParams],
  );

  return filter;
}
