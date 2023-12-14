import { cn } from '../utils/cn'

import notFound from '../assets/images/not-found.png'
import Button, { ButtonVariants } from '../components/ui/Button/Button'

interface Props {
  className?: string
}

export default function NotFound({ className }: Props) {
  return (
    <main
      className={cn('h-[100svh] flex justify-center items-center px-clamp', className)}
    >
      <div className=" max-w-md text-center ">
        <h1 className="font-extrabold text-[58px] mb-6">Whoops!</h1>
        <span className="block mb-[72px] text-xl">
          Sorry, this page is not available or broken.
        </span>
        <img className="mb-20" src={notFound} alt="" />
        <Button to="/" className='text-xl max-w-full font-bold' variant={ButtonVariants.PRIMARY}>
          Back to Home
        </Button>
      </div>
    </main>
  )
}
