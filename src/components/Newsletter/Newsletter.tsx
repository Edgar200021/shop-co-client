import Button, { ButtonVariants } from '../ui/Button/Button'
import Input, { InputVariants } from '../ui/Input/Input'

interface Props {
  className?: string
}

export default function Newsletter({ className }: Props) {
  return (
    <article className={className}>
      <div className="max-w-7xl mx-auto px-clamp bg-black rounded-3xl">
        <div className="py-9 px-16 flex justify-between flex-wrap gap-5 items-center">
          <p className="uppercase text-bold text-[40px] text-white max-w-[550px]">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </p>
          <form action="">
            <label className="mb-[14px] inline-block w-full relative before:content-[''] before:absolute before:left-4 before:top-[50%] before:translate-y-[-50%] before:bg-cover before:w-8 before:h-8 before:bg-email">
              <Input
                variant={InputVariants.PRIMARY}
                className="rounded-full bg-white py-4 pl-[52px] pr-4 "
                placeholder="Enter your email address"
              />
            </label>
            <Button
              variant={ButtonVariants.PRIMARY}
              className="max-w-full font-medium bg-white text-black"
            >
              Subscribe to Newsletter
            </Button>
          </form>
        </div>
      </div>
    </article>
  )
}
