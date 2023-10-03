
import { NavLink } from "react-router-dom"

interface Props {
  className?: string
}

export default function Navbar({ className }: Props) {
  return (
    <nav className={className}>
      <ul className="flex gap-x-6 [&>li>a]:transition-transform [&>li>a]:duration-300 [&>li>a]:ease [&>li>a]:inline-block [&>li>a]:whitespace-nowrap">
        <li>
          <NavLink to="/shop" className="hover:-translate-y-1">
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/sale" className="hover:-translate-y-1">
            On Sale
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-arrivals" className="hover:-translate-y-1">
            New Arrivals
          </NavLink>
        </li>
        <li>
          <NavLink to="/brands" className="hover:-translate-y-1">
            Brands
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
