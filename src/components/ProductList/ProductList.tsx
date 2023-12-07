import toast from 'react-hot-toast'
import { useGetProductsQuery } from '../../store/products/productsApi'
import { cn } from '../../utils/cn'
import Product from '../Product/Product'
import { IProductFilter } from '../../store/products/types'

interface Props {
  className?: string
  filter?: Partial<IProductFilter>
}

export default function ProductList({ className, filter }: Props) {
  const { data, isLoading, error } = useGetProductsQuery({ limit: 50 })

  if (error) {
    console.log(error)
  }

  console.log(data)

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
