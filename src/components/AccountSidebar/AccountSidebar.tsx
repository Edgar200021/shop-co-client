import { IUserResponse } from '../../store/auth/types'
import { cn } from '../../utils/cn'
import { generateColor, generateRandomNumber } from '../../utils/random'
import UpdateUserForm from '../Forms/UpdateUserForm/UpdateUserForm'
import Modal from '../Modal/Modal'
import Button, { ButtonVariants } from '../ui/Button/Button'

import ordersIcon from '../../assets/icons/orders.svg'
import hearthIcon from '../../assets/icons/hearth.svg'
import locationIcon from '../../assets/icons/location.svg'
import sunIcon from '../../assets/icons/sun.svg'
import pencil from '../../assets/icons/pencil.svg'

interface Props {
  className?: string
  user: IUserResponse
}

const color = generateColor(
  generateRandomNumber(50, 150),
  generateRandomNumber(50, 150),
  generateRandomNumber(50, 150)
)

export default function AccountSidebar({ className, user }: Props) {
  return (
    <aside className={cn('max-w-[250px] w-full', className)}>
      <nav>
        <ul className="space-y-5 [&>li>*]:bg-white [&>li>*]:text-black  [&>li>*]:rounded-lg  [&>li>*]:inline-flex  [&>li>*]:items-center  [&>li>*]:gap-x-3  [&>li>*]:max-w-full  [&>li>*]:px-3 mb-9">
          <li>
            <Button
              to="/user/account/orders"
              className="hover:bg-orange-600 duration-300 transition-colors ease aria-[current=page]:bg-orange-600"
              variant={ButtonVariants.PRIMARY}
            >
              <img width={48} height={48} src={ordersIcon} alt="Orders" />
              <span>История заказов</span>
            </Button>
          </li>
          <li>
            <Button
              to="/user/account/favorite"
              className="hover:bg-orange-600 duration-300 transition-colors ease whitespace-nowrap aria-[current=page]:bg-orange-600"
              variant={ButtonVariants.PRIMARY}
            >
              <img width={48} height={48} src={hearthIcon} alt="Hearth" />
              <span> Избранные товары</span>
            </Button>
          </li>
          <li>
            <Button
              to="/user/account/addresses"
              className="hover:bg-orange-600 duration-300 transition-colors ease aria-[current=page]:bg-orange-600"
              variant={ButtonVariants.PRIMARY}
            >
              <img width={48} height={48} src={locationIcon} alt="Location" />
              <span> Адрес доставки</span>
            </Button>
          </li>
          <li>
            <Button
              variant={ButtonVariants.PRIMARY}
              className="hover:bg-orange-600 duration-300 transition-colors ease aria-[current=page]:bg-orange-600"
            >
              <img width={48} height={48} src={sunIcon} alt="Sun" />
              <span> Тема сайта</span>
            </Button>
          </li>
        </ul>
        <div className="flex items-center  gap-x-4">
          <span
            className={` w-16 h-12 text-white text-3xl rounded-full inline-flex items-center justify-center `}
            style={{
              backgroundColor: color,
            }}
          >
            {user?.name.slice(0, 1)}
          </span>
          <div>
            <span className="flex justify-between items-center mb-1">
              {user?.name}
              <Modal>
                <>
                  <Modal.Open
                    renderButton={open => (
                      <Button
                        onClick={() => open('update-user')}
                        variant={ButtonVariants.CLEAR}
                        className="rounded-md w-6 h-6 inline-flex items-center justify-center bg-gray-100 hover:-translate-y-1 transition-transform duration-300 ease hover:bg-orange-600"
                      >
                        <img src={pencil} alt="pencil" width={14} height={14}/>
                      </Button>
                    )}
                  />
                  <Modal.Window
                    renderContent={close => (
                      <UpdateUserForm close={close} user={user} />
                    )}
                    name="update-user"
                  />
                </>
              </Modal>
            </span>
            <span className="text-black/50">{user?.email}</span>
          </div>
        </div>
      </nav>
    </aside>
  )
}
