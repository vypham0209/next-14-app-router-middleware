//THIRD PARTY MODULES
import { MutableRefObject, useEffect } from 'react'

export default function useHighlightSection(
  ref: MutableRefObject<HTMLDivElement | null>,
  startWatch: boolean,
  callback: (sectionIdx: number) => void,
) {
  useEffect(() => {
    if (!ref.current || !startWatch) return

    const rootEntries: IntersectionObserverEntry[] = []

    const observerCb = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0

      entries.forEach((entry) => {
        const index = rootEntries.findIndex(
          (rootEntry) =>
            rootEntry.target.getAttribute('data-index') === entry.target.getAttribute('data-index'),
        )
        if (index >= 0) rootEntries[index] = entry
        else rootEntries.push(entry)
      })

      rootEntries.forEach((entry) => {
        if (entry.intersectionRatio >= maxRatio) {
          maxRatio = entry.intersectionRatio
        }
      })

      const highlightedEntry = rootEntries
        .sort((a, b) => b.time - a.time)
        .find((entry) => entry.intersectionRatio === maxRatio)

      callback(+(highlightedEntry?.target.getAttribute('data-index') || 0))
    }

    // Track all sections that have an `id` applied
    const observer = new IntersectionObserver(observerCb, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    })
    ref.current.querySelectorAll('.section-content').forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [callback, ref, startWatch])
}
