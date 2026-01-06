import { useEffect, RefObject, useEffectEvent } from 'react'

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
) {
  const onClickOutside = useEffectEvent(handler)

  useEffect(() => {
    if (!enabled) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current
      if (!element || element.contains(event.target as Node)) {
        return
      }

      onClickOutside(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, enabled]) // handler is removed from dependencies
}
