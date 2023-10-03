import { NavLink } from 'react-router-dom'

import Input, { InputVariants } from '../ui/Input/Input'
import Logo from '../ui/Logo/Logo'
import Navbar from '../Navbar/Navbar'

interface Props {
  className?: string
}

export default function Header({ className }: Props) {
  return (
    <header className={className}>
      <div className="max-w-7xl mx-auto px-clamp py-6 flex items-center justify-between gap-x-10">
        <Logo />
        <Navbar />
        <Input variant={InputVariants.SEARCH} />
        <div className="flex gap-x-[14px]  [&>a]:transition-transform [&>a]:duration-300 [&>a]:ease">
          <NavLink
            to="/user/basket"
            className="bg-basket w-6 h-6 hover:-translate-y-1"
          ></NavLink>
          <NavLink
            to="/user/account"
            className="bg-user w-6 h-6 hover:-translate-y-1"
          ></NavLink>
        </div>
      </div>
    </header>
  )
}
