import { useEffect, useRef } from 'react'

export function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const elementRef = useRef<T>(null)
  const callbackRef = useRef(onOutside)

  useEffect(() => {
    callbackRef.current = onOutside
  }, [onOutside])

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (elementRef.current && event.target instanceof Node && !elementRef.current.contains(event.target)) {
        callbackRef.current()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') callbackRef.current()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return elementRef
}
