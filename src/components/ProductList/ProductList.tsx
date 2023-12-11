import toast from 'react-hot-toast'
import { useGetProductsQuery } from '../../store/products/productsApi'
import { cn } from '../../utils/cn'
import Product from '../Product/Product'
import { IProductFilter } from '../../store/products/types'
import { useSearchParams } from 'react-router-dom'

interface Props {
  className?: string
  filter: Partial<IProductFilter> | null
}

export default function ProductList({ className, filter }: Props) {
  const [searchParams] = useSearchParams()
  const priceLte = searchParams.get('price<='),
    priceGte = searchParams.get('price>='),
    size = searchParams.get('size'),
    color = searchParams.get('color'),
    category = searchParams.get('category')

  const filterObj = {
    'price[gte]': priceGte,
    'price[lte]': priceLte,
    'size[elemMatch]': size,
    'color[elemMatch]': color,
    category,
  }
  const validFilterObj = Object.entries(filterObj).reduce<Map<string, string>>(
    (acc, [key, value]) => {
      if (value) {
        acc.set(key, value)
      }

      return acc
    },
    new Map()
  )

  console.log(Object.fromEntries(validFilterObj))

  const { data, isLoading, error } = useGetProductsQuery(
    {
      ...filter,
      ...(!!validFilterObj.size && Object.fromEntries(validFilterObj)),
    },
    { pollingInterval: 1000 * 60 * 60 }
  )

  if (error) {
    console.log(error)
  }

  return (
    <ul
      className={cn(
        'grid grid-cols-product-list gap-5  grid-rows-[450px] auto-rows-auto ',
        className
      )}
    >
      {data?.data?.products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  )
}
