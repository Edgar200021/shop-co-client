import sprite from '../../../assets/icons/sprite.svg'
import { cn } from '../../../utils/cn'

interface Props {
  className?: string
  full?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

export default function Star({
  onMouseEnter,
  onMouseLeave,
  onClick,
  className,
  full = true,
}: Props) {
  if (full) {
    return (
      <svg
        onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		onClick={onClick}
        className={cn('w-5 h-5  fill-yellow-300 ', className)}
      >
        <use xlinkHref={`${sprite}#star`} />
      </svg>
    )
  }

  return (
    <svg
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
	  onClick={onClick}
      className={cn('w-5 h-5  fill-black ', className)}
    >
      <use xlinkHref={`${sprite}#star`} />
    </svg>
  )
}
