import { useParams } from 'react-router-dom'
import { productApi } from '../store/products/api'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import { reviewApi } from '../store/review/api'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface Props {
  className?: string
}

export default function SingleProductPage({ className }: Props) {
  const { id } = useParams()
  const { data, isLoading, isError, error } = productApi.useGetProductQuery(
    Number(id)
  )
  const {
    data: reviewData,
    isLoading: isReviewLoading,
    isError: isReviewError,
    error: reviewError,
  } = reviewApi.useGetAllReviewsQuery({ productId: Number(id) })

  console.log(reviewData)

  useEffect(() => {
    if (error) {
      console.log(error)
      //  toast.error(error.data.msg, { duration: 5000 })
    }
    if (isReviewError) {
      console.log(error)
      //  toast.error(reviewError.data.msg, { duration: 5000 })
    }
  }, [isReviewError, isError, error, reviewError])

  if (isLoading || isReviewLoading) return <PageLoader />

  if (!data) return null

  return (
    <main className={className}>
      <SingleProduct className="mb-40" {...data.product} />
      <div className="max-w-7xl mx-auto px-clamp">
        <span className="text-2xl font-bold">All reviews ({reviewData?.reviews.length})</span>
      </div>
    </main>
  )
}
