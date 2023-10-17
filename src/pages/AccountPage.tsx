import { Navigate } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import { userApi } from '../store/user/api'

interface Props {
  className?: string
}

export default function AccountPage({ className }: Props) {
  const { data, isLoading, isError, error } = userApi.useShowMeQuery('')

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <main className={className}>
      <div className="max-w-7xl mx-auto px-clamp">
        {isError ? (
          <h1 className="text-5xl font-bold"> {error.data.msg} ⛔</h1>
        ) : (
          <h1 className="text-5xl font-bold"> Hello {data?.user.name}</h1>
        )}
      </div>
    </main>
  )
}
