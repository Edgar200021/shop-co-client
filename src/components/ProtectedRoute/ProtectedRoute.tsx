import { ReactNode, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../store/store'

interface Props {
  children: ReactNode
  roles?: ('admin' | 'user')[]
}

export default function ProtectedRoute({ roles = ['admin'], children }: Props) {
  const user = useAppSelector(state => state.user.user)

  if (!user || !roles.includes(user.role)) {
    const isAuthorized = user && !roles.includes(user.role)

    toast.error(isAuthorized ? 'No access to the route' : 'Not authorized')

    console.log(user)

    return <Navigate to={isAuthorized ? '/' : '/auth/login'} />
  }

  return <>{children}</>
}
