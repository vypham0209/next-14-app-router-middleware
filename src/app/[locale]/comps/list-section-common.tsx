//THIRD PARTY MODULES
import { useEffect, useState } from 'react'
import { SiteContentComponent } from '@prisma/client'
//SHARED
import { throttle } from '_@shared/utils/func'

export const useActiveIndex = (
  list: { component: SiteContentComponent; componentId: number }[],
) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const scrollElement = document.getElementById('main')
    const trackingList = list
      .slice(1)
      .map(({ component, componentId }) =>
        document.getElementById(`${component.toLowerCase()}_${componentId}`),
      )
      .filter(Boolean)

    const activeIndex = throttle(() => {
      trackingList.forEach((element, index) => {
        const { top } = element.getBoundingClientRect()
        if (top <= 0) setCurrentIndex(index)
      })
    }, 500)

    scrollElement?.addEventListener('scroll', activeIndex)
    return () => scrollElement?.removeEventListener('scroll', activeIndex)
  }, [list])

  return [currentIndex, setCurrentIndex] as const
}
