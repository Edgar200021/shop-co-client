import { useSearchParams } from 'react-router-dom'
import { memo } from 'react'
import { PrefetchOptions } from '@reduxjs/toolkit/query'

import { cn } from '../../utils/cn'
import Button, { ButtonVariants } from '../ui/Button/Button'
import { IBaseFilter } from '../../types/types'

interface Props {
  className?: string
  prefetch?: <T extends IBaseFilter>(
    arg: Partial<T> | undefined,
    options?: PrefetchOptions | undefined
  ) => void
  quantityOfItems: number
  limit: number
  isLoading?: boolean
}

const Paginate = memo(
  ({ className, quantityOfItems, limit, prefetch, isLoading }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = Number(searchParams.get('page'))
    const pageCount = Math.ceil(quantityOfItems / limit)

    function handleChangePage(e: MouseEvent<HTMLButtonElement>) {
      const isPrevPage = e.target.name === 'prev' && page && page > 1

      searchParams.set(
        'page',
        String(isPrevPage ? page - 1 : page ? page + 1 : 2)
      )
      setSearchParams(searchParams)
    }

    function handlePrefetch() {
      if (page === pageCount) return
      prefetch?.({ page: page ? page + 1 : 2 })
    }

    if (pageCount === 1 || pageCount === 0) return null

    return (
      <div className={cn('flex items-center justify-between', className)}>
        <Button
          className="w-[140px] border-[1px]  rounded-md border-black/10 border-solid  py-2 font-medium  disabled:cursor-not-allowed disabled:text-black/40 inline-flex items-center justify-center gap-x-2"
          variant={ButtonVariants.CLEAR}
          name="prev"
          disabled={isLoading || !page || page === 1}
          onClick={handleChangePage}
        >
          <span className="text-4xl font-black -translate-y-1">&#8592;</span>
          Previous
        </Button>
        <Button
          name="next"
          className="w-[140px] border-[1px]  rounded-md border-black/10 border-solid   py-2 font-medium disabled:cursor-not-allowed disabled:text-black/40 inline-flex items-center justify-center gap-x-2"
          variant={ButtonVariants.CLEAR}
          onClick={handleChangePage}
          onMouseOver={handlePrefetch}
          disabled={isLoading || pageCount === page}
        >
          Next
          <span className="text-4xl font-black -translate-y-1"> &#8594;</span>
        </Button>
      </div>
    )
  }
)

export default Paginate
