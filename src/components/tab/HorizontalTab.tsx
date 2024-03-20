'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import {
  Content,
  List,
  Root,
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  Trigger,
} from '@radix-ui/react-tabs'
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show'
import Button from '_@shared/components/button/Button'
//SHARED
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon'
import ChevronRightIcon from '_@shared/icons/ChevronRightIcon'

const tabButtonClasses = [
  'snap-center pb-1 whitespace-nowrap',
  'text-blu-400 text-16 ',
  'data-[state="active"]:border-b data-[state="active"]:border-yel-500 data-[state="active"]:text-yel-500',
  'focus-visible:outline-none',
]

const tabContentClasses = ['pt-6 lg:pt-6']

export type TTabList = {
  value: string
  label: string
  content?: React.ReactNode
}

export type THorizontalTabProps = {
  defaultValue?: string
  ariaLabel: string
  tabList: TTabList[]
  onChange?: (value: string) => void
  listProps?: TabsListProps
  triggerProps?: TabsTriggerProps
  contentProps?: TabsContentProps
  wrapperClasses?: string | string[]
} & Omit<TabsProps, 'onChange'>

type TScroll = 'left' | 'right' | 'none'
const SCROLL_OFFSET = 15

export default function HorizontalTab({
  defaultValue,
  ariaLabel,
  tabList,
  onChange,
  triggerProps,
  listProps,
  contentProps,
  wrapperClasses,
  ...props
}: THorizontalTabProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOver, setIsOver] = useState(false)
  const [scroll, setScroll] = useState<TScroll>('none')

  const scrollIntoView = (target: HTMLButtonElement) => {
    target?.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
    })
  }

  const handleScrollTabButtonWhenClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement
    if (!target) return
    scrollIntoView(target)
  }

  const handleScrollTabButtonWhenUseArrowKey = () => {
    if (!rootRef.current) return
    const target = rootRef.current.querySelector(
      '[role=tablist] > [tabindex="0"]',
    ) as HTMLButtonElement
    scrollIntoView(target)
  }

  const onValueChange = (value: string) => {
    handleScrollTabButtonWhenUseArrowKey()
    if (onChange) onChange(value)
  }

  const onScrollRight = () => {
    if (!containerRef.current) return
    containerRef.current.scrollLeft += SCROLL_OFFSET * 2
  }

  const onScrollLeft = () => {
    if (!containerRef.current) return
    containerRef.current.scrollLeft -= SCROLL_OFFSET * 2
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handleResize = () => {
      setIsOver(el.offsetWidth < el.scrollWidth)
    }
    setTimeout(() => handleResize(), 10)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [containerRef])

  useEffect(() => {
    if (scroll === 'none') return
    const scrollInterval = setInterval(() => {
      if (!containerRef.current) return
      const width = scroll === 'left' ? -SCROLL_OFFSET : SCROLL_OFFSET
      containerRef.current.scrollLeft += width
    }, 50)
    return () => {
      clearInterval(scrollInterval)
    }
  }, [scroll])

  return (
    <Root
      ref={rootRef}
      defaultValue={defaultValue || tabList[0]?.value || ''}
      onValueChange={onValueChange}
      {...props}
    >
      <div
        className={classcat([
          'relative flex items-center justify-start',
          'w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2_+_theme(spacing[6])))] sm:w-[calc(min(100vw,var(--max-bound))_-_(var(--site-pad)*2_+_theme(spacing[12])))]',
          wrapperClasses,
        ])}
      >
        <Show when={isOver}>
          <div className="absolute left-0 top-1/2 hidden h-full -translate-y-1/2 items-center justify-center bg-yel-25 pe-4 sm:flex">
            <Button
              onClick={onScrollLeft}
              onMouseDown={() => setScroll('left')}
              onMouseUp={() => setScroll('none')}
              color="primary"
              variant="ghost"
            >
              <ChevronLeftIcon />
            </Button>
          </div>
        </Show>
        <List
          aria-label={ariaLabel}
          ref={containerRef}
          {...listProps}
          className={classcat([
            'grid grid-flow-col items-center justify-items-center gap-6 overflow-auto scrollbar-hide',
            listProps?.className,
          ])}
        >
          {tabList.map((tab) => (
            <Trigger
              key={tab.value}
              value={tab.value}
              onClick={handleScrollTabButtonWhenClick}
              {...triggerProps}
              className={classcat([tabButtonClasses, triggerProps?.className])}
            >
              {tab.label}
            </Trigger>
          ))}
        </List>
        <Show when={isOver}>
          <div className="absolute right-0 top-1/2 hidden h-full -translate-y-1/2 items-center justify-center bg-yel-25 ps-4 sm:flex">
            <Button
              onClick={onScrollRight}
              onMouseDown={() => setScroll('right')}
              onMouseUp={() => setScroll('none')}
              color="primary"
              variant="ghost"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </Show>
      </div>

      {tabList.map((tab) => (
        <Content
          key={tab.value}
          value={tab.value}
          {...contentProps}
          className={classcat([tabContentClasses, contentProps?.className])}
        >
          {tab.content}
        </Content>
      ))}
    </Root>
  )
}
