//THIRD PARTY MODULES
import { useEffect } from 'react';
import { usePathname } from 'next-intl/client';
import { useSearchParams } from 'next/navigation';

export default function usePreventScrolling() {
  const pathname = usePathname();
  const queryString = new URLSearchParams(useSearchParams()).toString();

  useEffect(() => {
    const scrollElement = document.getElementById('main');
    if (!scrollElement) return;

    scrollElement.scrollTo({ top: scrollElement.scrollTop });
  }, [queryString]);

  useEffect(() => {
    if (pathname === '/') return;

    const scrollElement = document.getElementById('main');
    if (!scrollElement) return;

    scrollElement.style.overflow = 'hidden';
    scrollElement.style.scrollBehavior = 'auto';
    window.requestAnimationFrame(() => scrollElement.scrollTo({ top: 0 }));
    setTimeout(() => {
      scrollElement.style.overflow = 'auto';
      scrollElement.style.scrollBehavior = 'smooth';
    }, 200);
  }, [pathname]);
}
