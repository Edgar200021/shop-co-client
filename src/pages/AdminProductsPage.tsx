import toast from 'react-hot-toast'
import BasketProduct from '../components/BasketProduct/BasketProduct'
import PageLoader from '../components/ui/PageLoader/PageLoader'

interface Props {
  className?: string
}

export default function AdminProductsPage({ className }: Props) {
  return (
    <main className={className}>
      <section>
        <ul className="py-5 px-6 rounded-3xl border-[1px] border-black/10 divide-y-[1px] divide-black/10 max-w-3xl">
          {/*{data?.products.map(product => (
            <BasketProduct
              className="max-w-2xl py-6"
              key={product.id}
              {...product}
            >
              <BasketProduct.Image />
              <div className="flex flex-col py-3">
                <BasketProduct.Title className="mb-4" />
                <BasketProduct.Size />
                <BasketProduct.Colors />
                <BasketProduct.Price className="mt-auto block" />
              </div>
              <div className="ml-auto space-x-2">
                <BasketProduct.Delete
                  handleDelete={() =>
                    deleteProduct(product.id)
                      .unwrap()
                      .then(() => toast.success('success', { duration: 5000 }))
                      .catch(err =>
                        toast.error(err.data.msg, { duration: 500 })
                      )
                  }
                />
                <BasketProduct.Update />
              </div>
            </BasketProduct>
          ))}*/}
        </ul>
      </section>
    </main>
  )
}
