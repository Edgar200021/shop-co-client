import ProductFilters from '../components/ProductFilters/ProductFilters'
import ProductList from '../components/ProductList/ProductList'
import { cn } from '../utils/cn'

interface Props {
  className?: string
}

export default function Shop({ className }: Props) {
  return (
    <main className={cn('', className)}>
      <div className="max-w-7xl mx-auto px-clamp flex justify-between gap-8 items-start">
        <ProductFilters />
        <ProductList className='grow' showPagination={true} />
      </div>
    </main>
  )
}
