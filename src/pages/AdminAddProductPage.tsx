import ProductForm from '../components/Forms/ProductForm/ProductForm'

interface Props {
  className?: string
}

export default function AdminAddProductPage({ className }: Props) {
  return (
    <main className={className}>
      <section>
        <ProductForm />
      </section>
    </main>
  )
}
