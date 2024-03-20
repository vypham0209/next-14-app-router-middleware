//THIRD PARTY MODULES
import classcat from 'classcat'
import { useFormContext } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { useMealPlanActor } from '_@landing/machine/meal-plan.machine'
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button'
import Show from '_@shared/components/conditions/Show'
import Switch from '_@shared/components/conditions/Switch'
//SHARED
import CheckIcon from '_@shared/icons/CheckIcon'
import ChevronLeftIcon from '_@shared/icons/ChevronLeftIcon'
import ChevronRightIcon from '_@shared/icons/ChevronRightIcon'
//RELATIVE MODULES
import { CustomizePlanSchema } from '../../schema/customize-plan-schema'
import { useCustomizePlanContext } from '../../context/CustomizePlanContext'

type TScroll = 'left' | 'right' | 'none'
const SCROLL_OFFSET = 15

function Weeks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOver, setIsOver] = useState(false)
  const [scroll, setScroll] = useState<TScroll>('none')
  const { currentWeek, setCurrentWeek, setCurrentDay } = useCustomizePlanContext()
  const [state] = useMealPlanActor()
  const isSyncing = ['fetching-category', 'syncing'].some(state.matches)
  const {
    getValues,
    formState: { errors },
  } = useFormContext<CustomizePlanSchema>()

  const weeks = getValues('weeks')

  const onScrollRight = () => {
    if (!containerRef.current) return
    containerRef.current.scrollLeft += SCROLL_OFFSET * 2
  }

  const onScrollLeft = () => {
    if (!containerRef.current) return
    containerRef.current.scrollLeft -= SCROLL_OFFSET * 2
  }

  const onChangeWeek = (week: number) => {
    setCurrentWeek(week)
    setCurrentDay(0)
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
    <div
      className={classcat([
        'relative flex min-h-[theme(spacing[13.25])] items-center justify-center border-b border-blu-100 bg-yel-25 py-3 ps-6 sm:min-h-[theme(spacing[18.25])] sm:px-7.25 sm:py-4',
      ])}
    >
      <Show when={isOver}>
        <div className="absolute left-0 top-1/2 hidden h-full -translate-y-1/2 items-center justify-center bg-yel-25 p-6 sm:flex">
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
      <div
        ref={containerRef}
        className={classcat([
          'grid grid-flow-col items-center justify-items-center gap-4 overflow-auto pe-6 scrollbar-hide sm:gap-6',
          'sm:px-11',
        ])}
      >
        <Switch.Root>
          <Switch.Case when={isSyncing}>
            {Array(4)
              .fill(1)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-7 w-12.5 animate-pulse bg-skeleton sm:h-10 sm:w-18.5"
                />
              ))}
          </Switch.Case>
          <Switch.Case when={true}>
            {weeks.map((week, index) => {
              const isValid = !errors.weeks?.[index]?.days
              return (
                <Button
                  key={week.value}
                  onClick={() => onChangeWeek(week.value)}
                  className={classcat([
                    'btn-medium',
                    '[&>span]:ow:text-16 sm:[&>span]:ow:text-24',
                    'ow:hover:shadow-[inset_0_-1px] ow:sm:hover:shadow-[inset_0_-2px]',
                    'ow:ow:pb-0',
                    'ow:[&>svg]:h-6 ow:[&>svg]:w-6',
                    currentWeek === week.value
                      ? 'text-yel-500 shadow-[inset_0_-1px] shadow-yel-500 sm:shadow-[inset_0_-2px]'
                      : '',
                  ])}
                  color="navy"
                  variant="ghost"
                  trailingIcon={isValid ? <CheckIcon className="text-gre-300" /> : null}
                >
                  Week {week.value + 1}
                </Button>
              )
            })}
          </Switch.Case>
        </Switch.Root>
      </div>
      <Show when={isOver}>
        <div className="absolute right-0 top-1/2 hidden h-full -translate-y-1/2 items-center justify-center bg-yel-25 p-6 sm:flex">
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
  )
}

export default Weeks
