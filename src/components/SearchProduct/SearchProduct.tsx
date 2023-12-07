import { useMemo, useState } from 'react'
import { cn } from '../../utils/cn'
import Input, { InputVariants } from '../ui/Input/Input'
import { useDebounce } from '../../hooks/useDebounce'
import { useGetProductsQuery } from '../../store/products/productsApi'
import BasketProduct from '../BasketProduct/BasketProduct'
import Button, { ButtonVariants } from '../ui/Button/Button'
import toast from 'react-hot-toast'

interface Props {
  className?: string
}

export default function SearchProduct({ className }: Props) {
  const [value, setValue] = useState('')
  const productTitle = useDebounce<string>(value)

  const filterObj = useMemo(() => {
    return { 'title[regex]': productTitle }
  }, [productTitle])

  const { data, isLoading, error } = useGetProductsQuery({
    ...filterObj,
    fields: 'image,title',
    limit: 100,
  })

  if (error) {
    // @ts-expect-error ssd
    toast.error(error.data)
  }

  return (
    <div className="max-w-[550px] w-full relative">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        className={className}
        variant={InputVariants.SEARCH}
      />
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-all duration-500 ease overflow-hidden absolute  w-full z-50 bg-black rounded-3xl ',
          {
            'grid-rows-[1fr]': !!value,
          }
        )}
      >
        <ul className="min-h-0 max-h-[370px] overflow-y-auto py-5 px-3 rounded-3xl space-y-5 border-[1px] border-black/10 divide-y-[1px] divide-black/10 max-w-3xl">
          {data ? (
            data.data.products.map(product => (
              <BasketProduct
                className=" bg-white rounded-3xl cursor-pointer"
                {...product}
              >
                <div className="relative w-full flex justify-between items-center px-4">
                  <BasketProduct.Image className="min-w-[40px] max-w-[70px] rounded-3xl [&>img]:rounded-3xl" />
                  <BasketProduct.Title />
                  <Button
                    variant={ButtonVariants.CLEAR}
                    className="absolute left-0 top-0 w-full h-full"
                    to={`/product/${product.id}`}
                  />
                </div>
              </BasketProduct>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    </div>
  )
}
