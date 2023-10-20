import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/intl'
import ProductStars from '../Stars/Stars'

interface Props {
  className?: string
  text: string
  username: string
  rating: number
  created_at: string
}

export default function Review({
  className,
  text,
  username,
  rating,
  created_at,
}: Props) {
  console.log(new Date(created_at))
  return (
    <li
      className={cn(
        'max-w-[610px] min-w-[360px] py-7 px-8 rounded-lg border-[1px] border-solid border-black/10 ',
        className
      )}
    >
      <ProductStars className="mb-5" averageRating={rating} />
      <div className=" space-x-2 mb-4 ">
        <span className=" font-bold text-xl"> {username}</span>
        <span className=" w-6 h-6 rounded-full bg-green-600 text-white inline-flex items-center justify-center">
          &#10003;
        </span>
      </div>
      <p className="text-black/60 mb-6">"{text}"</p>
      Posted on
      {formatDate(new Date(created_at))}
    </li>
  )
}
