import { useEffect, useRef } from 'react'

// This hook sets the data attributes for the width and height of a given element
// so that they can be accessed by other components
export default function useSetDataSizeElement() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return
      const { width, height } = ref.current.getBoundingClientRect()
      ref.current.style.setProperty('--data-size-element-width', `${width}px`)
      ref.current.style.setProperty('--data-size-element-height', `${height}px`)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return ref
}
