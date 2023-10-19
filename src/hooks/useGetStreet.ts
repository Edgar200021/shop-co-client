import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function useGetStreet(position: [number, number]) {
  const [street, setStreet] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    /*eslint-disable*/
    ;(async () => {
      try {
        setIsLoading(true)
        const res = await fetch(
          `https://geocode.xyz/${position[0]},${position[1]}?json=1&auth=636650904152649321897x112952`
        )
        const data = await res.json()
        if (data.country !== 'Armenia') {
          toast.error('Unsupported country. Orders only in Armenia', {
            duration: 3000,
          })
          return
        }
        setStreet(data.staddress)
      } catch (error) {
        if (error instanceof Error) setError(error.message)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [position])

  return { street, isLoading, error }
}
