import { useParams } from 'react-router-dom'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import SingleProduct from '../components/SingleProduct/SingleProduct'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Reviews from '../components/Reviews/Reviews'
import { useGetProductQuery } from '../store/products/productsApi'

interface Props {
  className?: string
}

export default function SingleProductPage({ className }: Props) {
  const { id } = useParams()
  const { data, isLoading, error } = useGetProductQuery(id as string)

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <main className={className}>
      <SingleProduct {...data?.data?.product} className="mb-40" />
      <Reviews productId={Number(id)} />
    </main>
  )
}
