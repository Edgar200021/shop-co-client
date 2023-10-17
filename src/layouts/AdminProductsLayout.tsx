import { NavLink, Outlet } from 'react-router-dom'

interface Props {
  className?: string
}

export default function AdminProductsLayout({ className }: Props) {
  return (
    <div className={className}>
      <nav>
        <ul className="li">
          <NavLink to="/"></NavLink>
        </ul>
        <ul className="li">
          <NavLink to="/add"></NavLink>
        </ul>
        <ul className="li">
          <NavLink to="/update"></NavLink>
        </ul>
        <ul className="li">
          <NavLink to="/delete"></NavLink>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}


