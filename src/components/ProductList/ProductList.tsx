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
import SortBy from '../SortBy/SortBy'
import { SORT_PRODUCTS } from '../../const/products'
import { ProductSkeleton } from '../ui/Skeletons/Skeletons'
import MessageNotification from '../MessageNotification/Empty'

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
    sort: searchParams.get('sort'),
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

  if (isLoading) return <PageLoader />
  if (error)
    return (
      <MessageNotification
        className={className}
        type="error"
        variant="vertical"
      />
    )

  return (
    <div className={cn('space-y-5', className)}>
      {showPagination && (
        <div className="text-right">
          Showing {(+filterObj.page || 1) * filter.limit! - filter.limit!}-
          {(+filterObj.page || 1) * filter.limit!} of {data?.results} Products
          Sort by:
          <SortBy
            options={SORT_PRODUCTS}
            className="ml-2 p-0 text-black font-normal font-size-inherit bg-none border-none text-base"
          />
        </div>
      )}
      {!data?.data.products.length ? (
        <MessageNotification
          className={className}
          variant="vertical"
          type="product"
        />
      ) : (
        <ul
          className={cn(
            'grid  grid-cols-product-list gap-5  grid-rows-[450px] auto-rows-auto content-start ',
            className,
            {
              'pb-8 border-b-[1px] border-black/10':
                showPagination && data && data.results! > filter.limit!,
            }
          )}
        >
          {isLoading || (isFetching && <ProductSkeleton />)}
          {!isFetching &&
            data?.data?.products.map(product => (
              <Product key={product._id} {...product} />
            ))}
        </ul>
      )}

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
