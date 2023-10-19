import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../store/auth/api'
import PageLoader from '../components/ui/PageLoader/PageLoader'

interface Props {
  className?: string
}

export default function VerifyAccount({ className }: Props) {
  const [searchParams] = useSearchParams()
  const [verificateAccount, { data, isLoading, isError, error }] =
    authApi.useAccountVerificationMutation()
  const [timer, setTimer] = useState(3)

  const email = searchParams.get('email'),
    verificationToken = searchParams.get('verificationToken')

  useEffect(() => {
    if (email && verificationToken) {
      /* eslint-disable */
      ;(async () => {
        await verificateAccount({ email, verificationToken })
      })()
    }
  }, [email, verificateAccount, verificationToken])

  useEffect(() => {
    if (!isError) {
      const timerId = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [isError])

  if (isLoading) {
    return <PageLoader />
  }

  if (timer === 0) {
    return <Navigate to="/auth/login" replace={true} />
  }

  return (
    <main className={className}>
      <div className="max-w-7xl mx-auto px-clamp">
        <div className="max-w-[800px] w-full">
          {isError ? (
            <>
              <h1 className="text-5xl font-bold mb-3">There are an error ⛔</h1>
              <span className="text-3xl text-black/60">{error?.data.msg}</span>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold mb-3">{data?.msg} ✅</h1>
              <span className="text-3xl text-black/60">
                Redirect after {timer}s
              </span>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
