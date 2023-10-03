import { Navigate } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import { userApi } from '../store/user/api'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface Props {
  className?: string
}

export default function AccountPage({ className }: Props) {
  const { data, isLoading, isError, error } = userApi.useShowMeQuery('')

  useEffect(() => {
    if (error) {
      toast.error(error.data.msg, { duration: 6000 })
    }
  }, [error, data])

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Navigate to="/auth/login" replace={true} />
  }

  return (
    <main className={className}>
      <div className="max-w-7xl mx-auto px-clamp">
        <h1 className="text-5xl font-bold"> Hello{data?.user.name}</h1>
      </div>
    </main>
  )
}
