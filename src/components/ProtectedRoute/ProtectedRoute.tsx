import { ReactNode, useEffect, useLayoutEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store'

interface Props {
  children: ReactNode
  roles?: ('admin' | 'user')[]
}

export default function ProtectedRoute({ roles = ['admin'], children }: Props) {
  const user = useAppSelector(state => state.user.user)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!user || !roles.includes(user.role)) {
      const isAuthorized = user && !roles.includes(user.role)

      toast.error(
        isAuthorized
          ? "You don't have permission to access this resource."
          : 'Not authorized'
      )

      navigate(isAuthorized ? '/' : '/auth/login')
    }
  }, [user, roles, navigate])

  return <>{children}</>
}
