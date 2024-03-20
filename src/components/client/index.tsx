'use client';

//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
import { keyframes } from '@emotion/react';
import { Fade, FadeProps, Reveal, RevealProps } from 'react-awesome-reveal';
//HOOK, SERVER
import useWindowSize from '_@landing/hook/useWindowSize';
//THIRD PARTY MODULES

const customRotateAnimation = keyframes`
from {
  opacity: 0;
  transform: rotate(9deg);
}
to {
  opacity: 1;
  transform: rotate(0deg);
}
`;

export const CustomRotate = ({ children, ...props }: PropsWithChildren<RevealProps>) => {
  return (
    <Reveal {...props} keyframes={customRotateAnimation}>
      {children}
    </Reveal>
  );
};

export const CustomFade = ({
  children,
  direction,
  directionMobile,
  ...props
}: PropsWithChildren<FadeProps & { directionMobile?: FadeProps['direction'] }>) => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  return (
    <Fade {...props} direction={isMobile ? directionMobile : direction}>
      {children}
    </Fade>
  );
};

export { Fade } from 'react-awesome-reveal';
//THIRD PARTY MODULES
export {
  Root as ScrollAreaRoot,
  Viewport as ScrollAreaViewport,
  Scrollbar as ScrollAreaScrollbar,
  Thumb as ScrollAreaThumb,
} from '@radix-ui/react-scroll-area';
export { default as Slider } from 'react-slick';
