'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import 'slick-carousel/slick/slick.css';
import { useRef, useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
//LAYOUT, COMPONENTS
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Slider,
} from '_@landing/components/client';
//RELATIVE MODULES
import { Arrow, ButtonList, Dot, SLIDE_LIST, sliderClasses } from './slide-section-common';

const SlideComponentFallback = () => {
  const ref = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <Slider
        ref={ref}
        arrows={false}
        initialSlide={currentSlide}
        afterChange={setCurrentSlide}
        className={classcat(sliderClasses)}
      >
        {SLIDE_LIST.map(({ title, subtitle }) => (
          <div
            key={title}
            className={classcat([
              'relative',
              'h-full px-16 pb-69 pt-20 s-992:pb-34.25 s-992:pt-24',
            ])}
          >
            <div
              className={classcat([
                'absolute inset-0',
                'bg-background-slide-section-mobile bg-cover bg-center s-992:bg-background-slide-section-desktop',
              ])}
            />
            <div className={classcat(['absolute inset-0 bg-slide-overlay'])} />
            <div className="relative z-10 mx-auto grid h-full max-w-[theme(spacing.210)] grid-rows-[auto_1fr] gap-8">
              <h2 className="line-clamp-2 text-center text-36 text-white s-992:line-clamp-1 s-992:text-64">
                {title}
              </h2>
              <ScrollAreaRoot className="overflow-hidden">
                <ScrollAreaViewport className="h-full">
                  <p className="text-center text-14 text-blu-50 s-992:text-20">{subtitle}</p>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar
                  orientation="vertical"
                  className="touch-none select-none rounded-[0.0625rem] bg-yel-200 data-[orientation=vertical]:w-1.5"
                >
                  <ScrollAreaThumb className="rounded-[0.0625rem] bg-yel-400" />
                </ScrollAreaScrollbar>
              </ScrollAreaRoot>
            </div>
          </div>
        ))}
      </Slider>
      <Arrow type="prev" onClick={() => ref.current?.slickPrev()} />
      <Arrow type="next" onClick={() => ref.current?.slickNext()} />
      <div
        className={classcat([
          'hidden s-992:grid',
          'auto-cols-max grid-flow-col justify-center gap-4',
          'absolute bottom-25 right-1/2 w-210 translate-x-1/2',
        ])}
      >
        {SLIDE_LIST.map((_, index) => (
          <Dot
            key={index}
            data-active={currentSlide === index}
            onClick={() => ref.current?.slickGoTo(index)}
          />
        ))}
      </div>
      <ButtonList />
    </>
  );
};

export default SlideComponentFallback;
