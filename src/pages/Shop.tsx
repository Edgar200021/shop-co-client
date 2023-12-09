import ProductFilters from '../components/ProductFilters/ProductFilters'
import { cn } from '../utils/cn'

interface Props {
  className?: string
}

export default function Shop({ className }: Props) {
  return (
    <main className={cn('', className)}>
      <div className="max-w-7xl mx-auto px-clamp flex justify-between gap-8">
        <ProductFilters />
      </div>
    </main>
  )
}
