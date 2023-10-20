import { useParams } from 'react-router-dom'
import { productApi } from '../store/products/api'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import { reviewApi } from '../store/review/api'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Reviews from '../components/Reviews/Reviews'

interface Props {
  className?: string
}

export default function SingleProductPage({ className }: Props) {
  const { id } = useParams()
  const { data, isLoading, isError, error } = productApi.useGetProductQuery(
    Number(id)
  )

  useEffect(() => {
    if (error) {
      toast.error(error.data.msg, { duration: 5000 })
    }
  }, [isError, error])

  if (isLoading) return <PageLoader />

  if (!data) return null

  return (
    <main className={className}>
      <SingleProduct className="mb-40" {...data.product} />
      <Reviews productId={Number(id)} />
    </main>
  )
}
