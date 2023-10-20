import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'

import { cn } from '../../../utils/cn'
import { ReviewSchema, reviewSchema } from '../../../schemas/review-schema'
import { ProductReviewStars } from '../../Stars/Stars'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import { reviewApi } from '../../../store/review/api'
import toast from 'react-hot-toast'

interface Props {
  className?: string
  close?: () => void
  productId: number
}

export default function ReviewForm({ close, className, productId }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  })
  const [createReview, { isLoading }] = reviewApi.useCreateReviewMutation()

  const [rating, setReting] = useState(0)

  function onRating(num: number) {
    setReting(num)
  }

  const onSubmit: SubmitHandler<ReviewSchema> = data => {
    if (rating === 0) {
      toast.error('Please provide rating', { duration: 4000 })
      return
    }

    createReview({ rating, text: data.text, id: productId })
      .unwrap()
      .then(() => {
        toast.success('Success', { duration: 5000 })
        close?.()
      })
      .catch(err => toast.error(err.data.msg, { duration: 4000 }))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('p-6 w-[480px]', className)}
    >
      <fieldset className="p-0 m-0 border-none  relative " disabled={isLoading}>
        <ProductReviewStars onRating={onRating} className="mb-5" />
        <textarea
          className="w-full border-[1px] mb-5 border-black/10 border-solid rounded-lg outline-none focus:ring-gray-600 resize-none p-4"
          rows={15}
          placeholder="Review text"
          minLength={20}
          maxLength={400}
          {...register('text')}
        ></textarea>
        <Button
          variant={ButtonVariants.PRIMARY}
          className="bg-green-500 disabled:bg-green-300 max-w-full"
        >
          {isLoading ? 'Loading...' : ' Create review'}
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
