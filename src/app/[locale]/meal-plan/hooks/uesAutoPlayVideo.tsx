//THIRD PARTY MODULES
import { MutableRefObject, useEffect } from 'react';

export default function useAutoPlayVideo(ref: MutableRefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            ref.current?.play();
          } else {
            ref.current?.pause();
          }
        });
      },
      {
        threshold: [0.5],
      },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);
}
