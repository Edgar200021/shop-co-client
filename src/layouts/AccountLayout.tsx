import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/AccountSidebar/AccountSidebar'
import { cn } from '../utils/cn'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import { userApi } from '../store/user/api'

interface Props {
  className?: string
}

export default function AccountLayout({ className }: Props) {
  const { data, isLoading } = userApi.useShowMeQuery('')

  if (isLoading) {
    return <PageLoader />
  }

  if (!data) {
    return null
  }

  return (
    <div
      className={cn(
        'max-w-7xl mx-auto w-full px-clamp items-start flex gap-20',
        className
      )}
    >
      <AccountSidebar user={data.user} />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  )
}
