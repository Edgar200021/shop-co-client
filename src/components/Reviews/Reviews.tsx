import { useEffect, useState } from 'react'
import { reviewApi } from '../../store/review/api'
import { cn } from '../../utils/cn'
import toast from 'react-hot-toast'
import { SortReview } from '../../store/review/types'
import { SORT } from '../../const/reviews'
import Modal from '../Modal/Modal'
import Button, { ButtonVariants } from '../ui/Button/Button'
import ReviewForm from '../Forms/ReviewForm/ReviewForm'
import Review from '../Review/Review'

interface Props {
  className?: string
  productId: number
}

export default function Reviews({ className, productId }: Props) {
  const [sortQuery, setSortQuery] = useState<SortReview>(SortReview.DATE_ASC)

  const { data, isLoading, isError, error } = reviewApi.useGetAllReviewsQuery(
    {
      productId,
      sort: sortQuery,
    },
    { pollingInterval: 60000 }
  )

  useEffect(() => {
    if (isError) {
      toast.error(error.data.msg, { duration: 5000 })
    }
  }, [isError, error])

  if (isLoading) {
    return <h1 className="text-3xl font-bold">Loading...</h1>
  }

  console.log(data?.reviews)

  return (
    <div className={cn('max-w-7xl mx-auto px-clamp', className)}>
      <div className="flex items-center justify-between mb-[60px]">
        <span className="text-2xl font-bold">
          All reviews ({data?.reviews.length})
        </span>
        <div className="flex gap-x-5 items-center">
          <select onChange={e => setSortQuery(e.target.value as SortReview)}>
            {SORT.map(sort => (
              <option key={sort.value} value={sort.value}>
                {sort.text}
              </option>
            ))}
          </select>
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
      <ul className="grid grid-cols-review-list">
        {data?.reviews.map(review => (
          <Review {...review}  />
        ))}
      </ul>
    </div>
  )
}
