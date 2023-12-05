import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'

import { cn } from '../../../utils/cn'
import { ReviewSchema, reviewSchema } from '../../../schemas/review-schema'
import { ProductReviewStars } from '../../Stars/Stars'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import toast from 'react-hot-toast'

interface Props {
  className?: string
  close?: () => void
  productId: number
}

export default function ReviewForm({ close, className, productId }: Props) {
  const { register } = useForm()
  return (
    <form className={cn('p-6 w-[480px]', className)}>
      <fieldset className="p-0 m-0 border-none  relative ">
        {/*<ProductReviewStars className="mb-5" />*/}
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
        ></Button>

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
