import toast from 'react-hot-toast'
import BasketProduct from '../components/BasketProduct/BasketProduct'
import PageLoader from '../components/ui/PageLoader/PageLoader'
import { basketApi } from '../store/basket/api'
import Button, { ButtonVariants } from '../components/ui/Button/Button'

interface Props {
  className?: string
}

export default function BasketPage({ className }: Props) {
  const { data, isLoading, isError, error } =
    basketApi.useGetBasketProductsQuery('')
  const [deleteBasketProduct, { isLoading: isDeleteLoading }] =
    basketApi.useDeleteBasketProductMutation()

  console.log(data)

  if (isLoading || isDeleteLoading) {
    return <PageLoader />
  }

  return (
    <main className={className}>
      <div className="max-w-7xl mx-auto px-clamp flex justify-between gap-8">
        {data && !!data.products.length && (
          <ul className="py-5 px-6 rounded-3xl border-[1px] border-black/10 divide-y-[1px] divide-black/10 max-w-3xl w-full">
            {data.products.map(basketProduct => (
              <BasketProduct
                key={basketProduct.id}
                {...basketProduct}
                colors={basketProduct.color}
              >
                <BasketProduct.Image />
                <div className="flex flex-col py-3">
                  <BasketProduct.Title />
                  <BasketProduct.Size />
                  <BasketProduct.Colors />
                  <BasketProduct.Price />
                </div>
                <div className="ml-auto flex flex-col justify-between items-end grow ">
                  <BasketProduct.Delete
                    handleDelete={() =>
                      deleteBasketProduct(basketProduct.id)
                        .unwrap()
                        .then(() =>
                          toast.success('Success', { duration: 5000 })
                        )
                        .catch(err =>
                          toast.error(err.data.msg, { duration: 5000 })
                        )
                    }
                  />
                  <BasketProduct.Count />
                </div>
              </BasketProduct>
            ))}
          </ul>
        )}
        {data && !data.products.length && <h1>Empty basket</h1>}

        <div className="rounded-3xl py-5 px-6 border-[1px] border-black/10 grow max-w-[505px] min-w-[350px] ">
          <span className="block font-bold text-2xl mb-6">Order Summary</span>
          <dl className="[&>div]:flex [&>div]:items-center [&>div]:justify-between [&>div]:text-xl [&>div]:gap-x-4 [&>div>dt]:text-black/60 [&>div>dd]:font-bold  space-y-5 mb-20">
            <div>
              <dt>Subtotal</dt>
              <dd>{data?.totalPrice || 0}$</dd>
            </div>
            <div>
              <dt>Discounted price </dt>
              <dd>{data?.discountedPrice || 0}$</dd>
            </div>
            <div className=" pb-5 border-b-[1px] border-b-black/10 border-solid">
              <dt>Delivery Fee</dt>
              <dd>{data?.deliveryFee || 0}$</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{(data && data.discountedPrice - data.deliveryFee) || 0}$</dd>
            </div>
          </dl>
          <Button
            disabled={data && !data.products.length}
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
