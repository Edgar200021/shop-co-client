import { cn } from '../../utils/cn'
import Modal from '../Modal/Modal'
import Button, { ButtonVariants } from '../ui/Button/Button'
import ReviewForm from '../Forms/ReviewForm/ReviewForm'
import Review from '../Review/Review'
import { useGetReviewsQuery } from '../../store/review/reviewApi'
import Loader from '../ui/Loader/Loader'
import SortBy from '../SortBy/SortBy'
import { SORT_REVIEW } from '../../const/reviews'
import { useSearchParams } from 'react-router-dom'
import { ReviewSkeleton } from '../ui/Skeletons/Skeletons'
import Paginate from '../Paginate/Paginate'
import { IBaseFilter } from '../../types/types'

interface Props {
  className?: string
  productId: string
  renderPagination?: boolean
  filters?: Partial<IBaseFilter>
}

export default function Reviews({
  className,
  productId,
  renderPagination = true,
  filters = { limit: 6 },
}: Props) {
  const [searchParams] = useSearchParams()
  const sort = searchParams.get('sort')

  const { data, isFetching } = useGetReviewsQuery(
    {
      productId,
      limit: filters.limit,
      ...(!!sort && { sort: sort }),
      ...filters,
    },
    { pollingInterval: 1000 * 60 }
  )

  console.log(data)

  return (
    <div className={cn('max-w-7xl mx-auto px-clamp', className)}>
      <div className="flex items-center justify-between mb-[60px]">
        <span className="text-2xl font-bold">All Reviews({data?.results})</span>
        <div className="flex gap-x-5 items-center">
          {/* 
		  // @ts-ignore */}
          <SortBy options={SORT_REVIEW} />
          <Modal>
            <>
              <Modal.Open
                renderButton={open => (
                  <Button
                    variant={ButtonVariants.PRIMARY}
                    onClick={() => open('create-review')}
                  >
                    Write a Review
                  </Button>
                )}
              />
              <Modal.Window
                renderContent={close => (
                  <ReviewForm productId={productId} close={close} />
                )}
                name="create-review"
              />
            </>
          </Modal>
        </div>
      </div>

      <ul
        className={cn('grid grid-cols-review-list gap-5 ', {
          'mb-10': renderPagination,
        })}
      >
        {isFetching && (
          <ReviewSkeleton
            quantity={data?.data.reviews.length || 2}
            className="max-w-[570px] "
          />
        )}
        {!isFetching &&
          data?.data.reviews.map(review => (
            <Review productId={productId} {...review} />
          ))}
      </ul>
      {renderPagination && (
        <Paginate
          isLoading={isFetching}
          quantityOfItems={data?.results || 0}
          limit={filters.limit!}
        />
      )}
    </div>
  )
}
