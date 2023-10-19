import { NavLink, useNavigate } from 'react-router-dom'

import Input, { InputVariants } from '../ui/Input/Input'
import Logo from '../ui/Logo/Logo'
import Navbar from '../Navbar/Navbar'
import { userApi } from '../../store/user/api'
import Button, { ButtonVariants } from '../ui/Button/Button'
import { authApi } from '../../store/auth/api'
import PageLoader from '../ui/PageLoader/PageLoader'

import basket from '../../assets/icons/basket.svg'
import user from '../../assets/icons/user.svg'
import logoutIcon from '../../assets/icons/logout.svg'

interface Props {
  className?: string
}

export default function Header({ className }: Props) {
  const { data } = userApi.useShowMeQuery('')
  const [logout, { isLoading: isLogoutLoading }] = authApi.useLogoutMutation()
  const navigate = useNavigate()

  if (isLogoutLoading) {
    return <PageLoader />
  }

  function handleLogout() {
    logout({})
    navigate('/auth/login')
  }

  return (
    <header className={className}>
      <div className="max-w-7xl mx-auto px-clamp py-6 flex items-center justify-between gap-x-10">
        <Logo />
        <Navbar />
        <Input variant={InputVariants.SEARCH} />
        <div className="flex gap-x-[14px]  [&>a]:transition-transform [&>a]:duration-300 [&>a]:ease">
          <Button
            variant={ButtonVariants.CLEAR}
            to="/user/basket"
            className="w-6 h-6 hover:-translate-y-1"
          >
            <img src={basket} alt="Basket" />
          </Button>
          <Button
            variant={ButtonVariants.CLEAR}
            to="/user/account/orders"
            className=" w-6 h-6 hover:-translate-y-1"
          >
            <img src={user} alt="User" />
          </Button>
          {data?.user && (
            <Button
              variant={ButtonVariants.CLEAR}
              className=" w-6 h-6 hover:-translate-y-1"
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="Logout" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
