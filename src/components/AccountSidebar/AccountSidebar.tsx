import { IUserResponse } from '../../store/auth/types'
import { cn } from '../../utils/cn'
import { generateColor, generateRandomNumber } from '../../utils/random'
import UpdateUserForm from '../Forms/UpdateUserForm/UpdateUserForm'
import Modal from '../Modal/Modal'
import Button, { ButtonVariants } from '../ui/Button/Button'

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
              <span className="inline-block w-[46px] h-[46px] rounded-lg  bg-white  relative before:absolute before:content-[''] before:w-8 before:h-8 before:left-[50%] before:top-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:bg-orders before:bg-contain"></span>
              <span>История заказов</span>
            </Button>
          </li>
          <li>
            <Button
              to="/user/account/favorite"
              className="hover:bg-orange-600 duration-300 transition-colors ease whitespace-nowrap aria-[current=page]:bg-orange-600"
              variant={ButtonVariants.PRIMARY}
            >
              <span className="inline-block w-[46px] h-[46px] rounded-lg  bg-white relative before:absolute before:content-[''] before:w-8 before:h-8 before:left-[50%] before:top-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:bg-hearth before:bg-contain"></span>
              <span> Избранные товары</span>
            </Button>
          </li>
          <li>
            <Button
              to="/user/account/addresses"
              className="hover:bg-orange-600 duration-300 transition-colors ease aria-[current=page]:bg-orange-600"
              variant={ButtonVariants.PRIMARY}
            >
              <span className="inline-block w-[46px] h-[46px] rounded-lg  bg-white relative before:absolute before:content-[''] before:w-8 before:h-8 before:left-[50%] before:top-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:bg-location before:bg-contain"></span>
              <span> Адрес доставки</span>
            </Button>
          </li>
          <li>
            <Button
              variant={ButtonVariants.PRIMARY}
              className="hover:bg-orange-600 duration-300 transition-colors ease aria-[current=page]:bg-orange-600"
            >
              <span className="inline-block w-[46px] h-[46px] rounded-lg  bg-white relative before:absolute before:content-[''] before:w-8 before:h-8 before:left-[50%] before:top-[50%] before:translate-y-[-50%] before:translate-x-[-50%] before:bg-sun before:bg-contain"></span>
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
                        className='rounded-md w-6 h-6 relative bg-gray-100 before:absolute before:content-[""] before:w-4 before:h-4 before:left-[50%] before:top-[50%] before:bg-pencil before:bg-contain before:bg-no-repeat before:translate-x-[-50%] before:translate-y-[-50%] hover:-translate-y-1 transition-transform duration-300 ease hover:bg-orange-600'
                      />
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
