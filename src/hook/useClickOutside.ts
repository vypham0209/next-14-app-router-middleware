//THIRD PARTY MODULES
import { useEffect } from 'react'

const useClickOutside = (
  ref:
    | React.RefObject<HTMLElement>
    | {
        ref: React.RefObject<HTMLElement>
        id?: string[]
      },
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ('ref' in ref) {
        if (
          ref.ref.current &&
          !ref.ref.current.contains(event.target as Node) &&
          !ref.id?.includes((event.target as HTMLElement).id)
        ) {
          callback()
        }
      } else {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback()
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [ref, callback])
}

export default useClickOutside
