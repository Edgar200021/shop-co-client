import { ReactNode, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import PageLoader from '../ui/PageLoader/PageLoader'

interface Props {
  children: ReactNode
  roles?: ('admin' | 'user')[]
}

export default function ProtectedRoute({ roles = ['admin'], children }: Props) {
  return <>{children}</>
}
