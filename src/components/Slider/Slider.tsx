'use client';

//THIRD PARTY MODULES
import classcat from 'classcat';
import Slider from 'react-slick';
import React, { useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//SHARED
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';
//RELATIVE MODULES
import './slider.css';

type MainContentStyleProps = React.CSSProperties & {
  '--image-url': string;
};
const SlickSlide = ({ content }: { content: string }) => {
  return (
    <div
      style={
        {
          '--image-url': `url('${content}')`,
        } as MainContentStyleProps
      }
      className={classcat([
        'relative flex flex-col gap-8 pb-6 pt-8 text-center',
        'xs:pb-10 xs:pt-20',
        'xl:pb-10 xl:pt-24',
        'bg-cover bg-center bg-no-repeat',
        'bg-[image:var(--image-url)]',
      ])}
    />
  );
};

type SliderProps = {
  slickList: string[];
  slickProps?: Omit<React.ComponentProps<typeof Slider>, 'customPaging'>;
  setSlideIndex?: (currentSlide: number) => void;
  MoreButton?: JSX.Element;
  shouldHideArrowButtonWhenOnlyOne?: boolean;
  arrowClassName?: string;
  arrowRightClassName?: string;
  arrowLeftClassName?: string;
};
const SliderComponent = ({
  slickList,
  slickProps,
  setSlideIndex,
  MoreButton,
  shouldHideArrowButtonWhenOnlyOne = false,
  arrowClassName,
  arrowRightClassName,
  arrowLeftClassName,
}: SliderProps) => {
  const ref = useRef<Slider>(null);
  const currentIndex = useRef(0);

  const settings: React.ComponentProps<typeof Slider> = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    afterChange(currentSlide) {
      currentIndex.current = currentSlide;
      if (setSlideIndex) setSlideIndex(currentSlide);
    },
    customPaging: () => (
      <div className={classcat(['block h-1.5 w-1.5 rounded-full bg-blu-100', 'md:hidden'])} />
    ),
    ...slickProps,
  };

  const handleSlickPrev = () => ref.current?.slickPrev();
  const handleSlickNext = () => ref.current?.slickNext();

  return (
    <div className="mx-[calc(var(--site-pad)_*_-1)] lg:mx-[unset]">
      <div className="relative aspect-[375/312] w-full md:h-full md:w-full">
        <Slider ref={ref} {...settings} className="slider-custom-style">
          {slickList?.map((content, index) => {
            return <SlickSlide key={index} content={content} />;
          })}
        </Slider>
        {MoreButton}
        <Show when={shouldHideArrowButtonWhenOnlyOne ? slickList.length > 1 : true}>
          <button
            onClick={handleSlickPrev}
            className={classcat([
              'arrow-slide absolute start-2 hidden cursor-pointer select-none rounded-full border p-1.25',
              'xs:start-6 md:block xl:start-20',
              arrowClassName,
              arrowLeftClassName,
            ])}
          >
            <ArrowLeftIcon className="text-current" />
          </button>
          <button
            onClick={handleSlickNext}
            className={classcat([
              'arrow-slide absolute end-2 hidden cursor-pointer select-none rounded-full border p-1.25',
              'xs:end-6 md:block xl:end-20',
              arrowClassName,
              arrowRightClassName,
            ])}
          >
            <ArrowRightIcon className="text-current" />
          </button>
        </Show>
      </div>
    </div>
  );
};

export default SliderComponent;
