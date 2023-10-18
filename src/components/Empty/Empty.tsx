import { cn } from '../../utils/cn'

import emptyOrders from '../../assets/icons/empty-order.svg'
import emptyFavorite from '../../assets/icons/empty-favorite.svg'
import emptyAddress from '../../assets/icons/empty-address.svg'

interface Props {
  className?: string
  type: 'favorite' | 'address' | 'order'
}

const emptyOptions: Record<
  'favorite' | 'address' | 'order',
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
}

export default function Empty({ className, type }: Props) {
  return (
    <div className={cn('p-10 flex gap-8 bg-gray-100 rounded-lg', className)}>
      <div className="max-w-xs min-w-[200px] w-full">
        <img src={emptyOptions[type].img} alt="Empty Order" />
      </div>
      <div className="max-w-md w-full">
        <span className="font-medium text-2xl block mb-2">
          {emptyOptions[type].title}
        </span>
        <span className="text-sm">{emptyOptions[type].text}</span>
      </div>
    </div>
  )
}
