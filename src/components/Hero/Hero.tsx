import { cn } from '../../utils/cn'

import Button, { ButtonVariants } from '../ui/Button/Button'


interface Props {
  className?: string
}

export default function Hero({ className }: Props) {
  return (
    <section
      className={cn(
        ' h-[calc(100vh-90px)] bg-hero bg-right-bottom phone:bg-right-top pt-20 pb-32 bg-no-repeat relative after:content-[""] after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-[#F2F0F1] after:-z-10   ',
        className
      )}
    >
      <div className="relative max-w-7xl mx-auto px-clamp mb-24 after:content-[''] after:absolute after:w-[104px] after:h-[104px] after:bg-frame after:right-0 after:top-0 before:content-[''] before:absolute before:w-14 before:h-14 before:bg-frame before:right-[500px] before:bottom-40 before:bg-contain">
        <div className="max-w-[600px]">
          <h1 className="max-w-xl font-bold text-[clamp(36px,6vw,64px)] mb-8">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-black/60 mb-8">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Button to="/shop" className="mb-12" variant={ButtonVariants.PRIMARY}>
            Shop Now
          </Button>
          <div className="flex gap-x-8">
            <span className="inline-flex flex-col pr-8 border-r-[1px] border-r-black/10">
              <span className="font-bold text-[40px]">200+</span>
              <span className="text-black/60">International Brands</span>
            </span>
            <span className="inline-flex flex-col pr-8 border-r-[1px] border-r-black/10">
              <span className="font-bold text-[40px]">2,000+</span>
              <span className="text-black/60">High-Quality Products</span>
            </span>
            <span className="inline-flex flex-col">
              <span className="font-bold text-[40px]">30,000+</span>
              <span className="text-black/60">Happy Customers</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
