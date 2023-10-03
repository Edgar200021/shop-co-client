import { productApi } from '../../store/products/api'
import { cn } from '../../utils/cn'
import Product from '../Product/Product'

interface Props {
  className?: string
  limit: number
}

export default function ProductList({ className, limit }: Props) {
  const { data, isLoading, isError } = productApi.useGetProductsQuery({
    limit,
  })

  if (isLoading) {
    return <h1 className="text-5xl font-bold"> Loading...</h1>
  }

  if (isError) {
    return <h1 className="text-5xl font-bold">Failed to fetch products</h1>
  }

  if (data && !data.products.length) {
    return <h1 className="text-5xl font-bold">There are no product</h1>
  }


  return (
    <ul
      className={cn(
        'grid grid-cols-product-list gap-5 grid-rows-[450px] ',
        className
      )}
    >
      {data?.products.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </ul>
  )
}
