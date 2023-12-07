import { useEffect, useState } from 'react'

export const useDebouncedValue = (value: string | number) => {
  const [debouncedValue, setDebouncedValue] = useState<string | number>()

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000)

    return () => clearTimeout(timeOutID)
  }, [value])

  return debouncedValue
}
