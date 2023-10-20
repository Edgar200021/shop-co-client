import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

import ProductStars from '../Stars/Stars'

interface Props {
  className?: string
  id: number
  image: string
  title: string
  rating: number
  price: number
  discounted_price: number
  discount: number
}

export default function Product({
  className,
  id,
  image,
  title,
  rating = 0,
  price,
  discounted_price,
  discount,
}: Props) {
  return (
    <li
      className={cn('max-w-[300px] min-w-[200px] w-full list-none ', className)}
    >
      <div className="relative mb-4 bg-[#F0EEED] flex items-center justify-center max-h-[300px] min-h-[200px] h-full rounded-[20px] cursor-pointer">
        <img className="rounded-[20px]" src={image} alt={title} />
        <Link
          to={`product/${id}`}
          className="absolute block w-full h-full top-0 left-0"
        />
      </div>
      <span className="block font-bold text-xl  mb-2">{title}</span>
      <div className="flex items-center gap-2 mb-2">
        <ProductStars averageRating={rating} />
        <span>{rating}/5</span>
      </div>
      <div className="flex gap-3">
        {discounted_price === price ? (
          <span className="font-bold text-2xl "> {price}$</span>
        ) : (
          <>
            <span className="font-bold text-2xl "> {discounted_price}$</span>
            <span className="font-bold text-2xl line-through text-black/40 ">
              {price}$
            </span>
            <span className="text-[#F33]  bg-pink-200 rounded-full  inline-flex items-center justify-center  w-14">
              -{discount}%
            </span>
          </>
        )}
      </div>
    </li>
  )
}
