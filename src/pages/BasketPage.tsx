import toast from 'react-hot-toast'
import BasketProduct from '../components/BasketProduct/BasketProduct'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import Button, { ButtonVariants } from '../components/ui/Button/Button'
import {
  useDeleteBasketProductMutation,
  useGetBasketProductsQuery,
} from '../store/basket/basketApi'
import { calculateDeliveryFee } from '../utils/calculateDeliveryFee'
import Paginate from '../components/Paginate/Paginate'
import { usePrefetch } from '../store/basket/basketApi'
import { useSearchParams } from 'react-router-dom'
import { BasketProductSkeleton } from '../components/ui/Skeletons/Skeletons'

interface Props {
  className?: string
}

export default function BasketPage({ className }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')

  const { data, isLoading, isFetching } = useGetBasketProductsQuery({
    page: Number(page)! || 1,
    limit: 6,
  })
  const [deleteBasketProduct, { isLoading: isDeleteLoading }] =
    useDeleteBasketProductMutation()
  const prefetch = usePrefetch('getBasketProducts')

  if (isLoading) return <PageLoader />

  return (
    <main className={className}>
      <div className="max-w-7xl mx-auto px-clamp flex justify-between gap-8 items-start relative">
        {data?.data && (
          <div className="flex-1">
            <ul className="border-[1px] rounded-3xl  px-6 divide-y-[1px] mb-20">
              {(isFetching || isDeleteLoading) && (
                <BasketProductSkeleton
                  className="py-8"
                  quantity={data.data.basketProducts.length}
                />
              )}
              {!isFetching &&
                !isDeleteLoading &&
                data?.data.basketProducts.map(basketProduct => (
                  <BasketProduct
                    key={basketProduct._id}
                    quantity={basketProduct.quantity}
                    size={basketProduct.size}
                    color={basketProduct.color}
                    id={basketProduct._id}
                    image={basketProduct.product.image}
                    title={basketProduct.product.title}
                    price={basketProduct.product.price}
                    productId={basketProduct.product._id}
                    className="py-8"
                  >
                    <div>
                      <BasketProduct.Image />
                    </div>
                    <div className="flex flex-col py-3">
                      <BasketProduct.Title />
                      <BasketProduct.Colors />
                      <BasketProduct.Size />
                      <BasketProduct.Price className="mt-auto" />
                    </div>
                    <div className="ml-auto inline-flex flex-col justify-between items-end grow">
                      <BasketProduct.Delete
                        disabled={isDeleteLoading}
                        handleDelete={() => {
                          deleteBasketProduct(basketProduct._id)
                          if (
                            data.data.basketProducts.length === 1 &&
                            Number(page)! > 1
                          ) {
                            searchParams.set('page', String(+page! - 1))
                            setSearchParams(searchParams)
                          }
                        }}
                      />
                      <BasketProduct.Count />
                    </div>
                  </BasketProduct>
                ))}
            </ul>
            <Paginate
              prefetch={prefetch}
              isLoading={isLoading || isFetching || isDeleteLoading}
              quantityOfItems={data.results!}
              limit={6}
            />
          </div>
        )}
        <div className="rounded-3xl py-5 px-6 border-[1px] border-black/10 grow max-w-[505px] min-w-[350px] sticky top-0">
          <span className="block font-bold text-2xl mb-6">Order Summary</span>
          <dl className="[&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:text-xl [&>div]:gap-x-4 [&>div>dt]:text-black/60 [&>div>dd]:font-bold  space-y-5 mb-20">
            <div>
              <dt>Subtotal</dt>
              <dd>{data?.data.totalPrice || 0}$</dd>
            </div>
            <div>
              <dt>Discounted price </dt>
              <dd>{data?.data.totalDiscountedPrice || 0}$</dd>
            </div>
            <div className=" pb-5 border-b-[1px] border-b-black/10 border-solid">
              <dt>Delivery Fee</dt>
              <dd>
                {(data?.data &&
                  calculateDeliveryFee(data.data.totalDiscountedPrice)) ||
                  0}
                $
              </dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>
                {(
                  data &&
                  data.data.totalDiscountedPrice -
                    calculateDeliveryFee(data.data.totalDiscountedPrice)
                )?.toFixed(2) || 0}
                $
              </dd>
            </div>
          </dl>
          <Button
            disabled={!data || !data.results}
            variant={ButtonVariants.PRIMARY}
            className="max-w-full font-semibold disabled:bg-black/40 disabled:cursor-not-allowed"
          >
            Go to Checkout &rarr;
          </Button>
        </div>
      </div>
    </main>
  )
}
