import { Outlet } from 'react-router-dom'
import { cn } from '../utils/cn'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'

interface Props {
  className?: string
}

export default function AdminLayout({ className }: Props) {
  return (
    <div
      className={cn(
        'flex justify-between items-start max-w-7xl mx-auto w-full pt-20 gap-20 ',
        className
      )}
    >
      <AdminSidebar/>
      <div className='grow'>
        <Outlet />
      </div>
    </div>
  )
}
