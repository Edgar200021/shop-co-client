import { useState } from 'react'
import { cn } from '../../utils/cn'
import Star from '../ui/Star/Star'

interface Props {
  className?: string
  count?: number
  averageRating: number
  onRating: (rating: number) => void
}

export default function ProductStars({
  className,
  count = 5,
  averageRating = 0,
}: Omit<Props, 'onRating'>) {
  return (
    <ul className={cn('flex gap-1', className)}>
      {[...Array(count)].map((_, i) => (
        <li key={i}>
          <Star full={i + 1 <= Math.round(averageRating)} />
        </li>
      ))}
    </ul>
  )
}

export const ProductReviewStars = ({
  className,
  count = 5,
  onRating,
  defaultRating
}: Omit<Props, 'averageRating'> & { defaultRating?: number }) => {
  const [selectedRating, setSelectedRating] = useState(defaultRating || 0)
  const [rating, setRating] = useState(defaultRating || 0)

  function handleRating(num: number) {
    setRating(num)
  }

  function handleSelectedRating(num: number) {
    setSelectedRating(num)
    onRating(num)
  }

  return (
    <ul className={cn('flex gap-1', className)}>
      {[...Array(count)].map((_, i) => (
        <li key={i}>
          <Star
            className="cursor-pointer"
            full={rating ? rating >= i + 1 : selectedRating >= i + 1}
            onMouseLeave={() => handleRating(0)}
            onMouseEnter={() => handleRating(i + 1)}
            onClick={() => handleSelectedRating(i + 1)}
          />
        </li>
      ))}
    </ul>
  )
}
