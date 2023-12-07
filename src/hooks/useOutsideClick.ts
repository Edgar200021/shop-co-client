import { useEffect, useRef } from 'react'

export const useOutsideClick = (
  handler: () => void,
  listenCapturing: boolean
) => {
  const ref = useRef<HTMLDivElement | undefined>()

  useEffect(
    function () {
      function handleClick(e: any) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler()
        }
      }

      document.addEventListener('click', handleClick, listenCapturing)

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing)
    },
    [handler, listenCapturing]
  )

  return ref
}
