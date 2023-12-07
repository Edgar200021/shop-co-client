import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

import ProductStars from '../Stars/Stars'

interface Props {
  className?: string
  id: string
  image: string
  title: string
  avgRating: number
  price: number
  priceDiscount: number
  discount: number
}

export default function Product({
  className,
  id,
  image,
  title,
  avgRating,
  price,
  priceDiscount,
  discount,
}: Props) {
  return (
    <li
      className={cn('max-w-[300px] min-w-[200px] w-full list-none border-[1px] rounded-3xl p-4', className)}
    >
      <div className="relative mb-4 bg-white  flex items-center justify-center max-h-[300px] min-h-[200px] h-full rounded-[20px] cursor-pointer">
        <img
          className="rounded-[20px] h-full object-cover bg-transparent bg-white"
          src={image}
          alt={title}
        />
        <Link
          to={`product/${id}`}
          className="absolute block w-full h-full top-0 left-0"
        />
      </div>
      <span className="block font-bold text-xl  mb-2">{title}</span>
      <div className="flex items-center gap-2 mb-2">
        <ProductStars averageRating={avgRating} />
        <span>{avgRating}/5</span>
      </div>
      <div className="flex gap-3">
        {discount ? (
          <>
            <span className="font-bold text-2xl "> {priceDiscount}$</span>
            <span className="font-bold text-2xl line-through text-black/40 ">
              {price}$
            </span>
            <span className="text-[#F33]  bg-pink-200 rounded-full  inline-flex items-center justify-center  w-14">
              -{discount}%
            </span>
          </>
        ) : (
          <span className="font-bold text-2xl "> {price}$</span>
        )}
      </div>
    </li>
  )
}
