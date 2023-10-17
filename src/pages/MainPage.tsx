import Brands from '../components/Brands/Brands'
import Hero from '../components/Hero/Hero'
import Newsletter from '../components/Newsletter/Newsletter'
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
      <section className="mb-16 pb-16 border-b-[1px]">
        <div className="max-w-7xl mx-auto px-clamp">
          <h1 className="text-center text-5xl font-bold mb-16 uppercase">
            NEW ARRIVALS
          </h1>
          <ProductList className="mb-10" limit={4} />
          <Button
            className="bg-white text-black border-solid border-[1px] block mx-auto"
            variant={ButtonVariants.PRIMARY}
          >
            View all
          </Button>
        </div>
      </section>
      <section className="mb-20">
        <div className="max-w-7xl mx-auto px-clamp">
          <h1 className="text-center text-5xl font-bold mb-16 uppercase">
            top selling
          </h1>
          <ProductList className="mb-10" limit={4} />
          <Button
            className="bg-white text-black border-solid border-[1px] block mx-auto"
            variant={ButtonVariants.PRIMARY}
          >
            View all
          </Button>
        </div>
      </section>
      <section className='mb-20'>
        <div className="max-w-7xl mx-auto px-clamp bg-[#F0F0F0] rounded-2xl">
          <div className="py-[70px] px-16">
            <h2 className="uppercase text-5xl font-bold text-center mb-16">
              BROWSE BY dress STYLE
            </h2>
            <div className="grid grid-cols-[repeat(8,118px)] grid-rows-[repeat(2,300px)] gap-5 [&>div]:bg-white [&>div]:rounded-2xl [&>div]:bg-no-repeat [&>div]:bg-right-bottom [&>div]:bg-cover">
              <div className="col-span-3 bg-casual">hello</div>
              <div className="col-span-5 bg-formal">hello</div>
              <div className="col-span-5 bg-party">hello</div>
              <div className="col-span-3 bg-gym">hello</div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter className='translate-y-20' />
    </main>
  )
}
