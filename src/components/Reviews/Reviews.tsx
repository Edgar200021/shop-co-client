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

interface Props {
  className?: string
  productId: string
}

export default function Reviews({ className, productId }: Props) {
  const [searchParams] = useSearchParams()
  const sort = searchParams.get('sort')

  console.log(sort)

  const { data, isLoading } = useGetReviewsQuery(
    {
      productId,
      ...(!!sort && { sort: sort }),
    },
    { pollingInterval: 1000 * 60 }
  )

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
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="grid grid-cols-review-list gap-5">
          {data?.data.reviews.map(review => (
            <Review productId={productId} {...review} />
          ))}
        </ul>
      )}
    </div>
  )
}
