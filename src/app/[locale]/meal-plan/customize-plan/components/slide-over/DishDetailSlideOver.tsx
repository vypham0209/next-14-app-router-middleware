//THIRD PARTY MODULES
import classcat from 'classcat'
import { useCallback, useEffect, useState } from 'react'
//LAYOUT, COMPONENTS
import Portal from '_@shared/components/Portal'
import Show from '_@shared/components/conditions/Show'
import Slider from '_@landing/components/Slider/Slider'
import ScrollArea from '_@landing/components/ScrollArea'
//SHARED
import { nextApi } from '_@shared/utils/api'
import CloseIcon from '_@shared/icons/CloseIcon'
//RELATIVE MODULES
import ContentTabs from './ContentTabs'
import { useCustomizePlanContext } from '../../../context/CustomizePlanContext'

function DishDetailSlideOver() {
  const [tab, setTab] = useState<string>('info')
  const { openDetail, detailId, closeViewDetail } = useCustomizePlanContext()
  const { data } = nextApi.dishes.getDishById.useQuery(detailId)

  const _resetTab = useCallback(() => {
    if (openDetail) setTab('info')
  }, [openDetail])

  useEffect(() => {
    _resetTab()
  }, [_resetTab])

  useEffect(() => {
    const main = document.querySelector('#main') as HTMLElement
    if (!main) return
    if (openDetail) {
      const scrollWidth = window.innerWidth - main.clientWidth
      main.style.overflow = 'hidden'
      main.style.paddingInlineEnd = `${scrollWidth}px`
    }
    return () => {
      main.style.overflow = 'auto'
      main.style.paddingInlineEnd = `${0}px`
    }
  }, [openDetail])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeViewDetail()
      }
    }
    if (openDetail) window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeViewDetail, openDetail])

  return (
    <Portal asChild>
      <div
        className={classcat([
          'fixed inset-0 z-overlay flex items-end sm:top-[calc(var(--h-header)_-_2px)]',
          openDetail
            ? 'pointer-events-auto bg-blu-600/30 transition-[background] duration-300'
            : 'pointer-events-none bottom-full',
        ])}
        onClick={closeViewDetail}
      >
        <div
          className={classcat([
            'absolute z-overlay grid gap-4 bg-yel-25',
            'h-[calc(597rem/16)] w-full',
            'max-h-[calc(100%-3.5rem)]',
            'md:h-full md:max-h-full md:max-w-[calc(603rem/16)]',
            'transition-[bottom_right] duration-300 md:bottom-0',
            openDetail ? 'bottom-0 md:right-0' : '-bottom-full md:-right-full',
          ])}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeViewDetail}
            className="absolute bottom-full right-0 grid h-12 w-12 place-items-center bg-yel-25 md:right-full md:top-0"
          >
            <CloseIcon className="h-5 w-5 text-blu-500" />
          </button>
          <ScrollArea
            owStyle={{
              viewPortClasses: 'ow:pe-0',
              scrollbarHorizontalClasses: 'ow:h-1.5',
              scrollbarVerticalClasses: 'ow:w-1.5',
            }}
          >
            <div className="grid gap-6">
              <div className="w-[calc(100vw-theme(spacing[6]))] md:max-w-[calc(603rem/16)]">
                <Show when={data?.images.length}>
                  <Slider
                    slickList={
                      data?.images?.map((src) => `${process.env.NEXT_PUBLIC_CDN_HOST}${src}`) || []
                    }
                    shouldHideArrowButtonWhenOnlyOne
                    arrowClassName={classcat([
                      'top-1/2 -translate-y-1/2 ow:bg-white ',
                      'ow:hover:border-yel-50 ow:hover:bg-yel-50 ow:hover:text-yel-500 ow:hover:shadow-btn-secondary-filled-hover',
                    ])}
                    arrowLeftClassName={classcat(['ow:xs:start-2 ow:xl:start-2'])}
                    arrowRightClassName={classcat(['ow:xs:end-3.5 ow:xl:end-3.5'])}
                  />
                </Show>
              </div>
              <p className={classcat(['px-6 text-18 text-blu-400 md:px-10', 'md:text-24'])}>
                {data?.name}
              </p>
              <ContentTabs dish={data} value={tab} onValueChange={setTab} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </Portal>
  )
}

export default DishDetailSlideOver
