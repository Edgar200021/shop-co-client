import { cn } from '../../../utils/cn'

export enum InputVariants {
  SEARCH = 'search',
  PRIMARY = 'primary',
}

interface Props extends React.ComponentProps<'input'> {
  variant: InputVariants
  className?: string
}

const inputVariants: Record<string, string> = {
  search: 'py-3 pr-4 px-14 bg-[#F0F0F0] outline-none rounded-full w-full ',
  primary: 'p-4 bg-[#F0F0F0] outline-none rounded-xl w-full',
}

export default function Input({ variant, className, ...otherProps }: Props) {
  if (variant === InputVariants.SEARCH) {
    return (
      <label className="relative before:content-[''] before:absolute before:w-6 before:h-6 before:bg-search before:left-4 before:top-[50%] before:-translate-y-[50%] max-w-[550px] w-full min-w-[230px] ">
        <input
          className={cn(inputVariants[variant], className)}
          placeholder="Search for products..."
          {...otherProps}
        />
      </label>
    )
  }

  return (
    <input className={cn(inputVariants[variant], className)} {...otherProps} />
  )
}
