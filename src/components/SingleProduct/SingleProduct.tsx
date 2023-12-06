import { useState } from 'react'
import { cn } from '../../utils/cn'
import ProductStars from '../Stars/Stars'
import Button, { ButtonVariants } from '../ui/Button/Button'
import toast from 'react-hot-toast'
import { useCreateBasketProductMutation } from '../../store/basket/basketApi'
import { ProductSize } from '../../store/products/types'
import { useNavigate } from 'react-router-dom'

interface Props {
  className?: string
  id: string
  image: string
  title: string
  avgRating: number
  price: number
  priceDiscount: number
  description: string
  color: string[]
  size: string[]
  discount: number
}

export default function SingleProduct({
  className,
  id,
  image,
  title,
  avgRating,
  price,
  priceDiscount,
  description,
  color,
  size,
  discount,
}: Props) {
  const [properties, setProperties] = useState({
    color: color[0],
    size: size[0],
    quantity: 1,
  })
  const [createBasketProduct, { isLoading }] = useCreateBasketProductMutation()
  const navigate = useNavigate()

  async function handleCreateBasketProduct() {
    try {
      const res = await createBasketProduct({
        color: properties.color,
        size: properties.size as ProductSize,
        quantity: properties.quantity,
        productId: id,
      }).unwrap()

      toast.success('Success ✅. Please check your basket')
    } catch (error) {
      console.log(error)
      if ('data' in error && 'status' in error.data) {
        toast.error('Unauthorized')
        navigate('/auth/login')
      }
      if (error instanceof Error) toast.error(error.message)
    }
  }

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
        <ProductStars className="mb-4" averageRating={avgRating} />
        <div className="flex gap-3 mb-5">
          {priceDiscount === price ? (
            <span className="font-bold text-2xl "> {price}$</span>
          ) : (
            <>
              <span className="font-bold text-2xl "> {priceDiscount}$</span>
              <span className="font-bold text-2xl line-through text-black/40 ">
                {price}$
              </span>
              <span className="text-[#F33]  bg-pink-200 rounded-full  inline-flex items-center justify-center  w-14">
                -{discount}%
              </span>
            </>
          )}
        </div>
        <div className="border-b-[1px] border-b-solid  border-b-black/10 mb-6">
          <p className="max-w-xl text-base text-black/60 pb-6 ">
            {description}
          </p>
        </div>

        <div className="pb-6 mb-6  border-b-[1px] border-b-solid  border-b-black/10">
          <span className="block text-black/60">Select Color</span>
          <ul className="flex gap-x-4 bg-gray-300 max-w-fit p-2 rounded-lg">
            {color.map(value => (
              <li key={value}>
                <Button
                  variant={ButtonVariants.CLEAR}
                  onClick={() =>
                    setProperties(prev => ({ ...prev, color: value }))
                  }
                  className={`text-red-800 w-[37px] h-[37px] rounded-full relative `}
                  style={{ backgroundColor: value }}
                >
                  <span
                    className={`opacity-${
                      value === properties.color ? '100' : 0
                    }`}
                  >
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
            {size.map(value => (
              <li key={value}>
                <Button
                  variant={ButtonVariants.CLEAR}
                  onClick={() =>
                    setProperties(prev => ({ ...prev, size: value }))
                  }
                  className={cn(
                    `py-3 px-6 rounded-[62px] text-center bg-[#F0F0F0] text-black transition-colors ease duration-300`,
                    {
                      'bg-black text-white': properties.size === value,
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
              onClick={() =>
                setProperties(prev => ({
                  ...prev,
                  count: prev.quantity > 1 ? prev.quantity - 1 : prev.quantity,
                }))
              }
            >
              -
            </Button>
            <span>{properties.quantity}</span>
            <Button
              variant={ButtonVariants.CLEAR}
              onClick={() =>
                setProperties(prev => ({
                  ...prev,
                  quantity: prev.quantity + 1,
                }))
              }
            >
              +
            </Button>
          </div>
          <Button
            onClick={handleCreateBasketProduct}
            className={cn('max-w-full disabled:bg-black/50', {
              'cursor-not-allowed': isLoading,
            })}
            variant={ButtonVariants.PRIMARY}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}
