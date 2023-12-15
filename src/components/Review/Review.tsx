import { useDeleteMyReviewMutation } from '../../store/review/reviewApi'
import { IReviewResponse } from '../../store/review/types'
import { useAppSelector } from '../../store/store'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/intl'
import Collapsed from '../Collapsed/Collapsed'
import ReviewForm from '../Forms/ReviewForm/ReviewForm'
import Modal from '../Modal/Modal'
import ProductStars from '../Stars/Stars'
import Button, { ButtonVariants } from '../ui/Button/Button'

import pencilIcon from '../../assets/icons/pencil.svg'
import deleteIcon from '../../assets/icons/delete.svg'
import { errorHandlerAPI } from '../../utils/errorHandler'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
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
  const navigate = useNavigate()
  const [deleteReview, { isLoading }] = useDeleteMyReviewMutation()

  async function handleDeleteReview() {
    if (!currentUser) return navigate('/auth/login')
    try {
      await deleteReview(productId).unwrap()
      toast.success('Success!', { duration: 3000 })
    } catch (error) {
      console.log(error)
      errorHandlerAPI(error)
    }
  }

  return (
    <li
      className={cn(
        'max-w-[610px] min-w-[360px] py-7 px-8 rounded-lg border-[1px] border-solid border-black/10 ',
        className
      )}
    >
      <div className="flex h-4 mb-5  justify-between items-start">
        <ProductStars averageRating={rating} />
        {currentUser && currentUser.id === user._id && (
          <Collapsed
            className="-translate-y-4"
            isCollapsed={isLoading || true}
            renderCollapseBtn={fn => (
              <Button
                className="text-3xl inline-block mb-2 disabled:text-black/40"
                variant={ButtonVariants.CLEAR}
                onClick={() => fn(prev => !prev)}
              >
                ...
              </Button>
            )}
          >
            <div className="flex gap-2 items-center">
              <Button
                variant={ButtonVariants.CLEAR}
                onClick={handleDeleteReview}
                disabled={isLoading}
              >
                <img src={deleteIcon} alt="" />
              </Button>
              <Modal>
                <>
                  <Modal.Open
                    renderButton={open => (
                      <Button
                        className="text-3xl "
                        disabled={isLoading}
                        variant={ButtonVariants.CLEAR}
                        onClick={() => open('review-action')}
                      >
                        <img src={pencilIcon} alt="pencil" />
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
            </div>
          </Collapsed>
        )}
      </div>
      <div className="max-w-[450px]">
        <div className=" space-x-2 mb-4 ">
          <span className=" font-bold text-xl"> {user.name}</span>
          <span className=" w-6 h-6 rounded-full bg-green-600 text-white inline-flex items-center justify-center">
            &#10003;
          </span>
        </div>
        <p className="text-black/60 mb-6">"{review}"</p>
        Posted on {formatDate(new Date(createdAt))}
      </div>
    </li>
  )
}
