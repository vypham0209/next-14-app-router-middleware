'use client'
//THIRD PARTY MODULES
import classcat from 'classcat'
import { MouseEventHandler, useRef } from 'react'
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs'

const tabButtonClasses = [
  'snap-center pb-1',
  'text-blu-400 text-18 lg:text-24 data-[state="active"]:text-yel-500',
  'data-[state="active"]:border-b-2 data-[state="active"]:border-yel-500',
  'focus-visible:outline-none',
]

const tabContentClasses = ['max-content pt-6 lg:pt-10 lg:px-0']

export type TabList = {
  value: string
  label: string
  content?: React.ReactNode
}

type Props = {
  defaultValue?: string
  ariaLabel: string
  tabList: TabList[]
  onChange?: (value: string) => void
}

export default function Tabs({ defaultValue, ariaLabel, tabList, onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)

  const scrollIntoView = (target: HTMLButtonElement) => {
    target.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
    })
  }

  const handleScrollTabButtonWhenClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const target = e.target as HTMLButtonElement
    scrollIntoView(target)
  }

  const handleScrollTabButtonWhenUseArrowKey = () => {
    if (!rootRef.current) return
    const target = rootRef.current.querySelector(
      '[role="tablist"] > [tabindex="0"]',
    ) as HTMLButtonElement
    scrollIntoView(target)
  }

  const onValueChange = (value: string) => {
    handleScrollTabButtonWhenUseArrowKey()
    if (onChange) onChange(value)
  }

  return (
    <Root
      ref={rootRef}
      className="mt-6 lg:max-content lg:mt-10"
      defaultValue={defaultValue || tabList[0]?.value || ''}
      onValueChange={onValueChange}
    >
      <div
        className={classcat([
          'max-content lg:px-0',
          'shadow-[inset_0_-1px] shadow-blu-100',
          'snap-x snap-mandatory overflow-auto scrollbar-hide',
        ])}
      >
        <List
          aria-label={ariaLabel}
          className="grid w-fit auto-cols-max grid-flow-col grid-cols-3 gap-x-6 sm:grid-cols-none lg:gap-x-10"
        >
          {tabList.map((tab) => (
            <Trigger
              key={tab.value}
              value={tab.value}
              onClick={handleScrollTabButtonWhenClick}
              className={classcat([tabButtonClasses])}
            >
              {tab.label}
            </Trigger>
          ))}
        </List>
      </div>

      {tabList.map((tab) => (
        <Content key={tab.value} value={tab.value} className={classcat([tabContentClasses])}>
          {tab.content}
        </Content>
      ))}
    </Root>
  )
}
