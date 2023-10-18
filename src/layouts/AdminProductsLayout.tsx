import { NavLink, Outlet } from 'react-router-dom'
import Button, { ButtonVariants } from '../components/ui/Button/Button'

interface Props {
  className?: string
}

export default function AdminProductsLayout({ className }: Props) {
  return (
    <div className={className}>
      <nav>
        <ul className="flex gap-5 mb-20">
          <li>
            <Button variant={ButtonVariants.PRIMARY} to="/admin/products">
              Products
            </Button>
          </li>
          <li>
            <Button variant={ButtonVariants.PRIMARY} to="/admin/products/addProduct">
              Add product
            </Button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
