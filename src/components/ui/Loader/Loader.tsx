import { cn } from '../../../utils/cn'

interface Props {
  className?: string
}

export default function Loader({ className }: Props) {
  return <span className={cn('mini-loader', className)}></span>
}
