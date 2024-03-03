import React from 'react'

const useOutClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
) => {
  React.useEffect(() => {
    const handleOutClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleOutClick)

    return () => {
      document.removeEventListener('mousedown', handleOutClick)
    }
  }, [ref, callback])
}

export default useOutClick