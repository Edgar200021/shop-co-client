import { useState } from 'react'
import { cn } from '../../utils/cn'
import ProductStars from '../Stars/Stars'
import Button, { ButtonVariants } from '../ui/Button/Button'

interface Props {
  className?: string
  image: string
  title: string
  rating: number
  price: number
  discounted_price: number
  description: string
  colors: string[]
  size: string
  discount: number
}

export default function SingleProduct({
  className,
  image,
  title,
  rating,
  price,
  discounted_price,
  description,
  colors,
  size,
  discount,
}: Props) {
  const [color, setColor] = useState(colors[0])
  const [productSize, setProductSize] = useState(
    size.slice(1, size.length - 1).split(',')[0]
  )
  const [count, setCount] = useState(1)

  console.log(color)

  return (
    <div
      className={cn(
        'flex justify-between gap-8 max-w-7xl mx-auto px-clamp',
        className
      )}
    >
      <div className="max-w-md min-w-[350px] w-full max-h-[530px] min-h-[290px]  rounded-md inline-flex items-center justify-center bg-[#F0EEED] ">
        <img src={image} alt={title} className="object-contain  h-full" />
      </div>
      <div className="grow">
        <h1 className="font-bold text-[40px] mb-4">{title}</h1>
        <ProductStars className="mb-4" averageRating={rating} />
        <div className="flex gap-3 mb-5">
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
        <p className="max-w-xl text-base text-black/60 pb-6 border-b-[1px] border-b-solid  border-b-black/10 mb-6">
          {description}
        </p>

        <div className="pb-6 mb-6  border-b-[1px] border-b-solid  border-b-black/10">
          <span className="block text-black/60">Select Colors</span>
          <ul className="flex gap-x-4 bg-gray-300 max-w-fit p-2 rounded-lg">
            {colors.map(value => (
              <li key={value}>
                <Button
                  variant={ButtonVariants.CLEAR}
                  onClick={() => setColor(value)}
                  className={`text-red-800 w-[37px] h-[37px] rounded-full relative `}
                  style={{ backgroundColor: value }}
                >
                  <span className={`opacity-${value === color ? '100' : 0}`}>
                    &#10003;
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-6 mb-6  border-b-[1px] border-b-solid  border-b-black/10">
          <span className="block text-black/60">Choose Size</span>
          <ul className="flex gap-x-4">
            {size
              .slice(1, size.length - 1)
              .split(',')
              .map(value => (
                <li key={value}>
                  <Button
                    variant={ButtonVariants.CLEAR}
                    onClick={() => setProductSize(value)}
                    className={cn(
                      `py-3 px-6 rounded-[62px] text-center bg-[#F0F0F0] text-black transition-colors ease duration-300`,
                      {
                        'bg-black text-white': productSize === value,
                      }
                    )}
                    style={{ backgroundColor: value }}
                  >
                    {value}
                  </Button>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex justify-between gap-x-5 items-center">
          <div className="max-w-[170px] min-w-[110px] w-full px-5 py-4 flex justify-between items-center bg-[#F0F0F0] rounded-full font-bold text-3xl">
            <Button
              variant={ButtonVariants.CLEAR}
              onClick={() => setCount(prev => (prev > 1 ? prev - 1 : prev))}
            >
              -
            </Button>
            <span>{count}</span>
            <Button
              variant={ButtonVariants.CLEAR}
              onClick={() => setCount(prev => prev + 1)}
            >
              +
            </Button>
          </div>
          <Button className="max-w-full" variant={ButtonVariants.PRIMARY}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}
