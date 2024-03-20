'use client';

//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import { useRef, useState } from 'react';
//SHARED
import MuteIcon from '_@shared/icons/MuteIcon';
import UnmuteIcon from '_@shared/icons/UnmuteIcon';
//HOOK, SERVER
import useAutoPlayVideo from '../hooks/uesAutoPlayVideo';
import useHighlightSection from '../hooks/useHighlightSection';
//LAYOUT, COMPONENTS

const WhyMealPlanFallback = () => {
  const [muteVideo, setMuteVideo] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const _toggleMuteVideo = () => {
    setMuteVideo((state) => !state);

    if (!videoRef.current) return;

    if (muteVideo) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
  };

  useHighlightSection(ref);

  useAutoPlayVideo(videoRef);

  return (
    <div className="flex flex-col bg-yel-1000" ref={ref}>
      <div
        className={classcat([
          'flex flex-col',
          'md:relative md:flex-row md:[&>*]:w-1/2',
          'md:overflow-y-auto',
        ])}
      >
        <div className="w-full md:sticky md:top-0">
          <div className={classcat(['relative w-full pb-[136%]', 'md:pb-[100%]'])}>
            <Image
              src="/img/meal-plan/why-meal-plan-mobile.png"
              alt="food"
              layout="fill"
              objectFit="cover"
              className="block md:hidden"
            />
            <Image
              src="/img/meal-plan/why-meal-plan-desktop.png"
              alt="food"
              layout="fill"
              objectFit="cover"
              className="hidden md:block"
            />

            <h2
              className={classcat([
                'hidden bg-yel-1000 px-10 py-6 text-24 font-medium text-white md:block lg:text-48',
                'absolute right-0 top-36 w-[calc(100%_-_80px)]',
              ])}
            >
              Why our meal plans?
            </h2>
          </div>
        </div>

        <div
          className={classcat([
            'px-6 py-20',
            'md:pb-10 md:pl-20 md:pr-14 md:pt-36',
            'md:h-0 md:min-h-[100%]',
          ])}
        >
          <h2 className={classcat(['text-28 font-medium text-white md:hidden'])}>
            Why our meal plans?
          </h2>

          <div
            className={classcat([
              'mt-10 flex flex-col gap-y-10',
              'md:mt-0 md:flex-row-reverse md:items-start md:gap-x-14',
            ])}
          >
            <div
              className={classcat([
                'flex gap-x-10 overflow-x-auto',
                'md:shrink-0 md:flex-col md:gap-y-10 md:overflow-x-auto',
                'md:sticky md:top-36',
              ])}
            >
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <div
                    key={index}
                    data-index={index}
                    className={classcat([
                      'px-1 pb-2 font-georgia italic text-white transition',
                      'border-b-[2px] border-solid',
                      'border-transparent md:border-b-0 md:border-r md:pb-0 md:pr-2',
                      'section-index',
                    ])}
                  >{`0${index + 1}`}</div>
                ))}
            </div>

            <div
              className={classcat([
                'flex gap-x-10 overflow-x-auto',
                'md:flex-1 md:flex-col md:gap-y-31.5 md:pb-10',
              ])}
            >
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <div
                    key={index}
                    data-index={index}
                    className={classcat([
                      'flex max-w-[260px] shrink-0 flex-col gap-y-2',
                      'md:max-w-none md:gap-y-6',
                      'section-content',
                    ])}
                  >
                    <h3 className={classcat(['text-18 font-medium text-white', 'md:text-36'])}>
                      Ready-to-eat meals
                    </h3>

                    <p className={classcat(['text-14 font-light text-blu-50', 'md:text-16'])}>
                      Viverra in molestie tincidunt enim feugiat nec posuere. Integer odio tincidunt
                      arcu in sit mauris amet orci. Fermentum morbi id urna faucibus fringilla
                      platea risus non. Libero pretium velit gravida auctor. Gravida in egestas
                      fringilla fringilla eu aliquet commodo. Curabitur neque justo at a et amet
                      nibh tincidunt odio. Risus et ullamcorper aliquam duis fames. Pellentesque nec
                      amet imperdiet maecenas. Volutpat purus pulvinar consectetur donec justo leo.
                      Semper aliquet suspendisse lacus rutrum libero ut nullam diam dolor. Curabitur
                      lorem malesuada dolor pretium tempus maecenas eu.
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full pb-[56%]">
        <video className="absolute left-0 top-0 h-full w-full" muted loop ref={videoRef}>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute right-6 top-1/2 -translate-y-1/2" onClick={_toggleMuteVideo}>
          {muteVideo ? <MuteIcon /> : <UnmuteIcon />}
        </div>
      </div>
    </div>
  );
};

export default WhyMealPlanFallback;
