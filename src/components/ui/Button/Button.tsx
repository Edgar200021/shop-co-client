import { NavLink } from 'react-router-dom'
import { ComponentProps } from 'react'
import { cn } from '../../../utils/cn'

export enum ButtonVariants {
  PRIMARY = 'primary',
  CLEAR = 'clear',
}

interface Props extends ComponentProps<'button'> {
  className?: string
  variant: ButtonVariants
  to?: string
}

const buttonVariants: Record<string, string> = {
  primary:
    'max-w-[210px] inline-block border-none rounded-full p-4 bg-black text-white w-full hover:-translate-y-1 duration-300 transition-transform ease text-center',
  clear: 'border-none bg-none ',
}

export default function Button({
  variant,
  className,
  children,
  to,
  ...otherProps
}: Props) {
  if (to) {
    return (
      <NavLink to={to} className={cn(buttonVariants[variant], className)}>
        {children}
      </NavLink>
    )
  }

  return (
    <button className={cn(buttonVariants[variant], className)} {...otherProps}>
      {children}
    </button>
  )
}
