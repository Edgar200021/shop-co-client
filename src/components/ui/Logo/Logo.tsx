import { NavLink } from 'react-router-dom'
import { cn } from '../../../utils/cn'


import logo from '../../../assets/icons/logo.svg'


interface Props {
  className?: string
}


export default function Logo({ className }: Props) {
  return (
    <NavLink
      to="/"
      className={cn(
        'shrink-0 inline-block hover:-translate-y-1 duration-300 ease relative w-logo h-logo',
        className
      )}
    >
      <img src={logo} alt="Shop-Co" />
    </NavLink>
  )
}
