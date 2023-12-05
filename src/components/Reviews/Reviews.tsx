import { useEffect, useState } from 'react'
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
  return (
    <div className={cn('max-w-7xl mx-auto px-clamp', className)}>
      <div className="flex items-center justify-between mb-[60px]">
        <span className="text-2xl font-bold"></span>
        <div className="flex gap-x-5 items-center">
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
      <ul className="grid grid-cols-review-list gap-5"></ul>
    </div>
  )
}
