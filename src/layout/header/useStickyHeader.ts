//THIRD PARTY MODULES
import { useEffect, useState } from 'react';

export default function useStickyHeader() {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const element = document.getElementById('main');
    if (!element) return;
    const dispatchStickyHeaderEvent = (isSticky: boolean) => {
      return document.dispatchEvent(
        new CustomEvent<CustomEventMap['sticky-header']>('sticky-header', {
          detail: {
            isSticky,
          },
        }),
      );
    };

    element.onscroll = () => {
      if (element.scrollTop > 150) {
        dispatchStickyHeaderEvent(true);
      }
      if (element.scrollTop <= 1) {
        dispatchStickyHeaderEvent(false);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e: CustomEvent<CustomEventMap['sticky-header']>) => {
      const { isSticky } = e.detail;
      setIsHeaderSticky(isSticky);
    };

    document.addEventListener('sticky-header', handleScroll);
    return () => document.removeEventListener('sticky-header', handleScroll);
  }, []);

  return isHeaderSticky;
}
