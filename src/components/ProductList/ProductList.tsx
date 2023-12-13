import toast from 'react-hot-toast'
import {
  useGetProductsQuery,
  usePrefetch,
} from '../../store/products/productsApi'
import { cn } from '../../utils/cn'
import Product from '../Product/Product'
import { IProductFilter } from '../../store/products/types'
import { useSearchParams } from 'react-router-dom'
import Paginate from '../Paginate/Paginate'
import PageLoader from '../ui/PageLoader/PageLoader'

interface Props {
  className?: string
  showPagination?: boolean
  filter?: Partial<IProductFilter>
}

export default function ProductList({
  className,
  showPagination = false,
  filter = { limit: 9 },
}: Props) {
  const [searchParams] = useSearchParams()
  const prefetch = usePrefetch('getProducts')

  const filterObj = {
    page: searchParams.get('page')!,
    'price[gte]': searchParams.get('price>=')!,
    'price[lte]': searchParams.get('price<=')!,
    'size[elemMatch]': searchParams.get('size')!,
    'color[elemMatch]': searchParams.get('color')!,
    category: searchParams.get('category') as IProductFilter['category'],
  }

  const validFilterObj = Object.fromEntries(
    Object.entries(filterObj).filter(([key, value]) => {
      return typeof value === 'number' && value >= 0 ? isFinite(value) : value
    })
  )

  const { data, isLoading, isFetching, error } = useGetProductsQuery(
    {
      ...filter,
      ...(!!Object.keys(validFilterObj).length && validFilterObj),
    },
    { pollingInterval: 1000 * 60 * 60 }
  )

  if (error) {
    console.log(error)
  }

  if (isLoading) return <PageLoader />

  return (
    <div className="grow space-y-5">
      <ul
        className={cn(
          'grid  grid-cols-product-list gap-5  grid-rows-[450px] auto-rows-auto ',
          className,
          {
            'pb-8 border-b-[1px] border-black/10':
              showPagination && data && data.results! > filter.limit!,
          }
        )}
      >
        {data?.data?.products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </ul>
      {showPagination && (
        <Paginate
          prefetch={prefetch}
          limit={filter.limit!}
          quantityOfItems={data?.results || 1}
          isLoading={isFetching}
        />
      )}
    </div>
  )
}
