'use client'

//THIRD PARTY MODULES
import classcat from 'classcat'
import { useRef, useState } from 'react'
import { SiteContentComponent } from '@prisma/client'
import resolveConfig from 'tailwindcss/resolveConfig'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
//SHARED
import { nextApi } from '_@shared/utils/api'
import MuteIcon from '_@shared/icons/MuteIcon'
import UnmuteIcon from '_@shared/icons/UnmuteIcon'
import getCookies from '_@shared/utils/parseCookieToObject'
//HOOK, SERVER
import useAutoPlayVideo from '../hooks/uesAutoPlayVideo'
import useHighlightSection from '../hooks/useHighlightSection'
//CONFIG
import tailwindConfig from '../../../../../tailwind.config'

const WhyMealPlan = () => {
  const { data } = nextApi.siteContent.getSiteContentByComponent.useQuery({
    components: [
      SiteContentComponent.WHY_OUR_MEAL_PLAN,
      SiteContentComponent.WHY_OUR_MEAL_PLAN_BENEFIT,
      SiteContentComponent.MEAL_PLAN_VIDEO,
    ],
    language: (
      getCookies()['NEXT_LOCALE'] || 'EN'
    ).toUpperCase() as GetSiteContentByComponentInput['language'],
  })

  const [muteVideo, setMuteVideo] = useState(true)
  const [activeSectionIdx, setActiveSectionIdx] = useState(0)

  const ref = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const components = data?.status === true ? data.data : []
  const mainComponent = components.find(
    (item) => item.component === SiteContentComponent.WHY_OUR_MEAL_PLAN,
  )
  const benefitComponents = components.filter(
    (item) => item.component === SiteContentComponent.WHY_OUR_MEAL_PLAN_BENEFIT,
  )
  const videoComponent = components.find(
    (item) => item.component === SiteContentComponent.MEAL_PLAN_VIDEO,
  )

  const _toggleMuteVideo = () => {
    setMuteVideo((state) => !state)

    if (!videoRef.current) return

    if (muteVideo) {
      videoRef.current.muted = false
    } else {
      videoRef.current.muted = true
    }
  }

  const _scrollToSection = (index: number) => {
    if (!ref.current) return

    const config = resolveConfig(tailwindConfig) as {
      theme: { screens: { [key: string]: string } }
    }

    const section = ref.current.querySelector(`.section-content[data-index="${index}"]`) as {
      offsetTop: number
      offsetLeft: number
    } | null

    if (!section || !config.theme?.screens) return

    const breakpoint = +config.theme.screens['md'].slice(0, -2)

    if (ref.current.offsetWidth > breakpoint) {
      ref.current.scrollTo({ top: section.offsetTop - 144, behavior: 'smooth' })
    } else {
      const container = ref.current.querySelector('#benefit-container-section')
      container?.scrollTo({ left: section.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  useHighlightSection(ref, benefitComponents.length > 0, setActiveSectionIdx)

  useAutoPlayVideo(videoRef)

  return (
    <div className="flex flex-col bg-yel-1000">
      <div
        className={classcat([
          'flex flex-col scrollbar-hide',
          'md:relative md:flex-row md:[&>*]:w-1/2',
          'md:overflow-y-auto',
        ])}
        ref={ref}
      >
        <div className="w-full md:sticky md:top-0">
          <div className={classcat(['relative w-full pb-[136%]', 'md:pb-[100%]'])}>
            <img
              src={`${process.env.NEXT_PUBLIC_CDN_HOST}${mainComponent?.mediaUrl}`}
              alt="food"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />

            <h2
              className={classcat([
                'hidden bg-yel-1000 px-10 py-6 text-24 font-medium text-white md:block lg:text-48',
                'absolute right-[-1px] top-36 w-[calc(100%_-_80px)]',
              ])}
            >
              {mainComponent?.title || ''}
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
            {mainComponent?.title || ''}
          </h2>

          <div
            className={classcat([
              'mt-10 flex flex-col gap-y-10',
              'md:mt-0 md:flex-row-reverse md:items-start md:gap-x-14',
            ])}
          >
            <div
              className={classcat([
                'flex gap-x-10 overflow-x-auto scrollbar-hide',
                'md:shrink-0 md:flex-col md:gap-y-10 md:overflow-x-auto',
                'md:sticky md:top-36',
              ])}
            >
              {benefitComponents.map((_, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={classcat([
                    'appearance-none block cursor-pointer px-1 pb-2 font-georgia italic text-white transition',
                    'border-b-[2px] border-solid',
                    'border-transparent md:border-b-0 md:border-r md:pb-0 md:pr-2',
                    'section-index',
                    activeSectionIdx === index ? 'border-yel-500' : '',
                  ])}
                  onClick={() => _scrollToSection(index)}
                >{`0${index + 1}`}</div>
              ))}
            </div>

            <div
              className={classcat([
                'flex gap-x-10 overflow-x-auto scrollbar-hide',
                'md:flex-1 md:flex-col md:gap-y-31.5 md:pb-10',
              ])}
              id="benefit-container-section"
            >
              {benefitComponents.map((item, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={classcat([
                    'flex max-w-[260px] shrink-0 flex-col gap-y-2',
                    'md:max-w-none md:gap-y-6',
                    'section-content',
                    activeSectionIdx !== index ? 'opacity-50' : '',
                  ])}
                >
                  <h3 className={classcat(['text-18 font-medium text-white', 'md:text-36'])}>
                    {item.title}
                  </h3>

                  <p className={classcat(['text-14 font-light text-blu-50', 'md:text-16'])}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={classcat(['relative w-full pb-[56%]'])}>
        <video
          className="absolute left-0 top-0 h-full w-full"
          muted={muteVideo}
          loop
          ref={videoRef}
          playsInline
        >
          <Show when={videoComponent?.mediaUrl}>
            <source
              src={`${process.env.NEXT_PUBLIC_CDN_HOST}${videoComponent?.mediaUrl}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </Show>
        </video>

        <div className="absolute right-6 top-1/2 -translate-y-1/2" onClick={_toggleMuteVideo}>
          {muteVideo ? <MuteIcon /> : <UnmuteIcon />}
        </div>
      </div>
    </div>
  )
}

export default WhyMealPlan
