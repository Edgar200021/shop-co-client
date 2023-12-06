import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/AccountSidebar/AccountSidebar'
import { cn } from '../utils/cn'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import { useAppSelector } from '../store/store'

interface Props {
  className?: string
}

export default function AccountLayout({ className }: Props) {
  const user = useAppSelector(state => state.user.user)

  return (
    <div
      className={cn(
        'max-w-7xl mx-auto w-full px-clamp items-start flex gap-20',
        className
      )}
    >
      <AccountSidebar user={user} />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  )
}
