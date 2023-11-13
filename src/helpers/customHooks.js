'use client'

import { useEffect } from 'react'

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (
        event.target.classList.contains('filter-item') ||
        event.target.classList.contains('selectNation') ||
        event.target.classList.contains('MuiBackdrop-root') ||
        event.target.classList.contains('MuiPickersPopper-root') ||
        event.target.classList.contains('MuiPickersMonth-root') ||
        !ref.current ||
        ref.current.contains(event.target)
      ) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}
