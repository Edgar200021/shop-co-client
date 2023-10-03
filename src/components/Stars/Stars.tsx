import { useState } from 'react'
import { cn } from '../../utils/cn'
import Star from '../ui/Star/Star'

interface Props {
  className?: string
  count?: number
  averageRating: number
}

export default function ProductStars({
  className,
  count = 5,
  averageRating = 0,
}: Props) {
  return (
    <ul className={cn('flex gap-1', className)}>
      {[...Array(count)].map((_, i) => (
        <li>
          <Star full={i + 1 <= Math.round(averageRating)} />
        </li>
      ))}
    </ul>
  )
}

export const ProductReviewStars = ({
  className,
  count = 5,
}: Omit<Props, 'averageRating'>) => {
  const [selectedRating, setSelectedRating] = useState(0)
  const [rating, setRating] = useState(0)

  function handleRating(num: number) {
    setRating(num)
  }

  function handleSelectedRating(num: number) {
	setSelectedRating(num)
  }

  return (
    <ul className={cn('flex gap-1', className)}>
      {[...Array(count)].map((_, i) => (
        <li>
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
