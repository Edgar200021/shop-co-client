import { IUser } from '../../store/auth/types'
import { useDeleteMyReviewMutation } from '../../store/review/reviewApi'
import { IReviewResponse } from '../../store/review/types'
import { useAppSelector } from '../../store/store'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/intl'
import ReviewForm from '../Forms/ReviewForm/ReviewForm'
import Modal from '../Modal/Modal'
import ProductStars from '../Stars/Stars'
import Button, { ButtonVariants } from '../ui/Button/Button'

interface Props extends IReviewResponse {
  className?: string
  productId: string
}

export default function Review({
  className,
  review,
  user,
  rating,
  createdAt,
  productId,
}: Props) {
  const currentUser = useAppSelector(state => state.user.user)
  const [deleteReview, { isLoading }] = useDeleteMyReviewMutation()

  return (
    <li
      className={cn(
        'max-w-[610px] min-w-[360px] py-7 px-8 rounded-lg border-[1px] border-solid border-black/10 ',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <ProductStars className="mb-5" averageRating={rating} />
        {currentUser?.role === 'admin' ||
          (currentUser && currentUser.id === user._id && (
            <Modal>
              <>
                <Modal.Open
                  renderButton={open => (
                    <Button
                      variant={ButtonVariants.CLEAR}
                      onClick={() => open('review-action')}
                    >
                      Click
                    </Button>
                  )}
                />
                <Modal.Window
                  name="review-action"
                  renderContent={close => (
                    <ReviewForm
                      defaultRating={rating}
                      defaultReview={review}
                      productId={productId}
                      close={close}
                    />
                  )}
                />
              </>
            </Modal>
          ))}
      </div>
      <div className=" space-x-2 mb-4 ">
        <span className=" font-bold text-xl"> {user.name}</span>
        <span className=" w-6 h-6 rounded-full bg-green-600 text-white inline-flex items-center justify-center">
          &#10003;
        </span>
      </div>
      <p className="text-black/60 mb-6">"{review}"</p>
      Posted on {formatDate(new Date(createdAt))}
    </li>
  )
}
