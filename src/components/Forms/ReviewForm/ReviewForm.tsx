import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormEvent, useState } from 'react'

import { cn } from '../../../utils/cn'
import { ReviewSchema, reviewSchema } from '../../../schemas/review-schema'
import { ProductReviewStars } from '../../Stars/Stars'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import toast from 'react-hot-toast'
import {
  useCreateReviewMutation,
  useUpdateMyReviewMutation,
} from '../../../store/review/reviewApi'
import { useAppSelector } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { errorHandlerAPI } from '../../../utils/errorHandler'

interface Props {
  className?: string
  close?: () => void
  productId: string
  defaultRating?: number
  defaultReview?: string
}

export default function ReviewForm({
  close,
  className,
  productId,
  defaultRating = 0,
  defaultReview = '',
}: Props) {
  const user = useAppSelector(state => state.user.user)
  const [review, setReview] = useState({
    rating: defaultRating,
    review: defaultReview,
  })
  const navigate = useNavigate()
  const [createReview, { isLoading }] = useCreateReviewMutation()
  const [updateMyReview, { isLoading: isUpdatReviewLoading }] =
    useUpdateMyReviewMutation()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!user) {
      toast.error('Unauthorized')
      close?.()
      return navigate('/auth/login')
    }

    if (!review.rating && !review.review) {
      toast.error('Please provide rating and review')
      return
    }

    try {
      !!defaultRating && defaultReview
        ? await updateMyReview({ ...review, productId }).unwrap()
        : await createReview({ ...review, productId }).unwrap()

      toast.success('Success')
      close?.()
    } catch (err) {
      errorHandlerAPI(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn('p-6 w-[480px]', className)}>
      <fieldset
        disabled={isLoading || isUpdatReviewLoading}
        className="p-0 m-0 border-none  relative "
      >
        <ProductReviewStars
          defaultRating={defaultRating || 0}
          onRating={num => setReview(prev => ({ ...prev, rating: num }))}
          className="mb-5"
        />
        <textarea
          className="w-full border-[1px] mb-5 border-black/10 border-solid rounded-lg outline-none focus:ring-gray-600 resize-none p-4"
          rows={15}
          placeholder="Review"
          minLength={10}
          maxLength={400}
          defaultValue={defaultReview ?? ''}
          value={review.review}
          onChange={e =>
            setReview(prev => ({ ...prev, review: e.target.value }))
          }
        ></textarea>
        <Button
          variant={ButtonVariants.PRIMARY}
          className=" disabled:bg-black/60 max-w-full"
        >
          {isLoading
            ? 'Loading'
            : !defaultRating && !defaultReview
            ? 'Create Review'
            : 'Update Review'}
        </Button>

        <Button
          className="w-8 h-8 absolute right-0 top-0 rounded-lg bg-[#F5F5F7]"
          variant={ButtonVariants.CLEAR}
          onClick={close}
        >
          X
        </Button>
      </fieldset>
    </form>
  )
}
