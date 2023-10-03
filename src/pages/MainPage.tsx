import Brands from '../components/Brands/Brands'
import Hero from '../components/Hero/Hero'
import ProductList from '../components/ProductList/ProductList'
import Button, { ButtonVariants } from '../components/ui/Button/Button'

interface Props {
  className?: string
}

export default function MainPage({ className }: Props) {
  return (
    <main className={className}>
      <Hero />
      <Brands className="mb-[72px]" />
      <section className='mb-16 pb-16 border-b-[1px]'>
        <div className="max-w-7xl mx-auto px-clamp">
          <h1 className="text-center text-5xl font-bold mb-16 uppercase">NEW ARRIVALS</h1>
          <ProductList className="mb-10" limit={4} />
          <Button className='bg-white text-black border-solid border-[1px] block mx-auto' variant={ButtonVariants.PRIMARY}>View all</Button>
        </div>
      </section>
      <section>
        <div className="max-w-7xl mx-auto px-clamp">
          <h1 className="text-center text-5xl font-bold mb-16 uppercase">top selling</h1>
          <ProductList className="mb-10" limit={4} />
          <Button className='bg-white text-black border-solid border-[1px] block mx-auto' variant={ButtonVariants.PRIMARY}>View all</Button>
        </div>
      </section>
    </main>
  )
}
