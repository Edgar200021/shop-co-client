import { ReactNode, useEffect } from 'react'
import toast from 'react-hot-toast'
import { userApi } from '../../store/user/api'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../ui/PageLoader/PageLoader'

interface Props {
  children: ReactNode
  roles?: ('admin' | 'user')[]
}

export default function ProtectedRoute({ roles = ['admin'], children }: Props) {
  const { isLoading, data, isError, error } = userApi.useShowMeQuery('')
  const navigate = useNavigate()

  useEffect(() => {
    if (data && !roles.includes(data.user.role)) {
      toast.error(" You don't have access to this route", { duration: 6000 })
      navigate('/', { replace: true })
      return
    }

    if (isError) {
      toast.error(error.data.msg, { duration: 6000 })
      navigate('/auth/login', { replace: true })
      return
    }
  }, [isError, data, error, navigate, roles])

  if (isLoading) {
    return <PageLoader />
  }

  return <>{children}</>
}
