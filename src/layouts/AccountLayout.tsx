import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/AccountSidebar/AccountSidebar'
import { cn } from '../utils/cn'
import PageLoader from '../components/ui/PageLoader/PageLoader'

interface Props {
  className?: string
}

export default function AccountLayout({ className }: Props) {
  return (
    <div
      className={cn(
        'max-w-7xl mx-auto w-full px-clamp items-start flex gap-20',
        className
      )}
    >
      <AccountSidebar
        user={{ userId: 23232, role: 'admin', name: 'Edgar', email: 'edgarat' }}
      />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  )
}
