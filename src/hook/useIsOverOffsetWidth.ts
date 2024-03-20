//THIRD PARTY MODULES
import { useLayoutEffect, useState } from 'react';

export default function useIsOverOffsetWidth(ref: React.RefObject<HTMLDivElement>, id: number) {
  const [isOver, setIsOver] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleResize = () => {
      setIsOver(el.clientWidth < el.scrollWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref, id]);

  return isOver;
}
