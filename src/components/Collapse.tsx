//THIRD PARTY MODULES
import classcat from 'classcat'
import { useEffect, useRef } from 'react'
//TYPES MODULES
import type { ComponentProps, PropsWithChildren } from 'react'

export type RootProp = PropsWithChildren &
  ComponentProps<'div'> & {
    onChangeValue?: (value: boolean) => void
  }

const CollapseRoot = ({ children, className, ...props }: RootProp) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleSetOffset = () => {
      const offsetLeft = element.getBoundingClientRect().x
      element.style.setProperty('--collapse-offset-x', `${offsetLeft < 0 ? -offsetLeft : 0}px`)
    }

    handleSetOffset()
    window.addEventListener('resize', handleSetOffset)
    return () => {
      window.removeEventListener('resize', handleSetOffset)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={classcat([
        'z-dropdown h-0 overflow-hidden [--collapse-offset-x:0px]',
        'transition-[height] duration-200 ease-in-out',
        // 'group-data-[state=closed]/collapse:!m-0 group-data-[state=open]/collapse:h-[--collapse-height]',
        // 'peer-data-[state=closed]/collapse:!m-0 peer-data-[state=open]/collapse:h-[--collapse-height]',
        className,
      ])}
      {...props}
    >
      {children}
    </div>
  )
}

export type ItemProp = ComponentProps<'div'>

const CollapseItem = ({ children, ...props }: ItemProp) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleSetHeightForParent = () => {
      const height = element.clientHeight
      element.parentElement?.style.setProperty('--collapse-height', `${height}px`)
    }

    handleSetHeightForParent()
    window.addEventListener('resize', handleSetHeightForParent)
    return () => {
      window.removeEventListener('resize', handleSetHeightForParent)
    }
  }, [])

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}

const Collapse = {
  Root: CollapseRoot,
  Item: CollapseItem,
}

export default Collapse
