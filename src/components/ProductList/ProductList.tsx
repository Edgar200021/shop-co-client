import toast from 'react-hot-toast'
import { useGetProductsQuery } from '../../store/products/productsApi'
import { cn } from '../../utils/cn'
import Product from '../Product/Product'

interface Props {
  className?: string
  limit: number
}

export default function ProductList({ className, limit }: Props) {
  const { data, isLoading, error } = useGetProductsQuery(null)

  if (error) {
    console.log(error)
  }
  console.log(data)

  return (
    <ul
      className={cn(
        'grid grid-cols-product-list gap-5 grid-rows-[450px] ',
        className
      )}
    >
      {data?.data?.products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  )
}
