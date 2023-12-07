import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = useState<T>()

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000)

    return () => clearTimeout(timeOutID)
  }, [value])

  return debouncedValue
}
