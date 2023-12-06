import { useNavigate } from 'react-router-dom'

import Logo from '../ui/Logo/Logo'
import Navbar from '../Navbar/Navbar'
import Button, { ButtonVariants } from '../ui/Button/Button'
import PageLoader from '../ui/PageLoader/PageLoader'

import basketIcon from '../../assets/icons/basket.svg'
import userIcon from '../../assets/icons/user.svg'
import logoutIcon from '../../assets/icons/logout.svg'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useLogoutMutation } from '../../store/auth/authApi'
import { deleteUser } from '../../store/user/userSlice'
import toast from 'react-hot-toast'
import SearchProduct from '../SearchProduct/SearchProduct'

interface Props {
  className?: string
}

export default function Header({ className }: Props) {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user.user)

  async function handleLogout() {
    try {
      await logout({}).unwrap()
      toast.success('Logged out', { duration: 3000 })
      navigate('/')
      setTimeout(() => {
        dispatch(deleteUser())
      }, 1000)
    } catch (error) {
      if ('data' in error && 'message' in error.data)
        toast.error(error.data.message as string)
      if (error instanceof Error) toast.error(error.message)
    }
  }

  return (
    <header className={className}>
      <div className="max-w-7xl mx-auto px-clamp py-6 flex items-center justify-between gap-x-10">
        <Logo />
        <Navbar />
        <SearchProduct />
        <div className="flex gap-x-[14px]  [&>a]:transition-transform [&>a]:duration-300 [&>a]:ease">
          <Button
            variant={ButtonVariants.CLEAR}
            to="/user/basket"
            className="w-6 h-6 hover:-translate-y-1"
          >
            <img src={basketIcon} alt="Basket" />
          </Button>
          <Button
            variant={ButtonVariants.CLEAR}
            to="/user/account/orders"
            className=" w-6 h-6 hover:-translate-y-1"
          >
            <img src={userIcon} alt="User" />
          </Button>
          {user && (
            <Button variant={ButtonVariants.CLEAR} onClick={handleLogout}>
              <img src={logoutIcon} alt="logout" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
