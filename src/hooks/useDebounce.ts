import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, timerMs: number = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<T>()

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedValue(value)
    }, timerMs)

    return () => clearTimeout(timeOutID)
  }, [value, timerMs])

  return debouncedValue
}
