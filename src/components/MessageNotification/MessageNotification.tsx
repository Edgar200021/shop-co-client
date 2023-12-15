import { cn } from '../../utils/cn'

import emptyOrders from '../../assets/icons/empty-order.svg'
import emptyFavorite from '../../assets/icons/empty-favorite.svg'
import emptyAddress from '../../assets/icons/empty-address.svg'
import emptyProduct from '../../assets/images/Box.png'
import errorIcon from '../../assets/icons/error.svg'
import emptyBasket from '../../assets/icons/empty-basket.svg'

interface Props {
  className?: string
  type: 'favorite' | 'address' | 'order' | 'product' | 'error' | 'basket'
  variant?: 'vertical' | 'horizontal'
}

const notificationOptions: Record<
  Props['type'],
  { img: string; title: string; text: string }
> = {
  address: {
    img: emptyAddress,
    title: 'You have no saved addresses',
    text: 'Add a new address by clicking on the "New Address" button',
  },
  favorite: {
    img: emptyFavorite,
    title: "You haven't added anything yet",
    text: 'Go to the category you are interested in and mark your favorites',
  },
  order: {
    img: emptyOrders,
    title: 'You have no orders',
    text: 'Go to the category you are interested in and place your first order',
  },
  product: {
    img: emptyProduct,
    title: 'No products found',
    text: 'Oops! It seems there are no products that match your selected criteria.',
  },
  error: {
    img: errorIcon,
    title: 'Oops!',
    text: ' Something went wrong,please try again later',
  },
  basket: {
    img: emptyBasket,
    title: 'Your cart is still empty',
    text: 'This is where the items you order will appear',
  },
}

export default function MessageNotification({
  className,
  type,
  variant = 'horizontal',
}: Props) {
  if (variant === 'horizontal')
    return (
      <div className={cn('p-10 flex gap-8 bg-gray-100 rounded-lg', className)}>
        <div className="max-w-xs min-w-[200px] w-full">
          <img src={notificationOptions[type].img} alt="Empty Order" />
        </div>
        <div className="max-w-md w-full">
          <span className="font-medium text-2xl block mb-2">
            {notificationOptions[type].title}
          </span>
          <span className="text-sm">{notificationOptions[type].text}</span>
        </div>
      </div>
    )

  if (variant === 'vertical')
    return (
      <div
        className={cn(
          'p-10 flex flex-col items-center justify-center text-center gap-8  rounded-lg text-[#4A4A4A] bg-white border-[1px] border-solid border-black/60 w-fit mx-auto',
          className
        )}
      >
        <div className="max-w-fit w-full">
          <img src={notificationOptions[type].img} alt="Empty Order" />
        </div>
        <div className="max-w-md w-full text-xl">
          <span className="font-bold text-2xl block mb-2">
            {notificationOptions[type].title}
          </span>
          <span className="text-xl font-medium">
            {notificationOptions[type].text}
          </span>
        </div>
      </div>
    )

  return
}
