import { ComponentProps } from 'react'
import { cn } from '../../../utils/cn'

interface Props<T = string> extends ComponentProps<'select'> {
  className?: string
  options: [{ value: T; label: string }]
}

export default function Select({
  className,
  options,
  value = '',
  ...otherProps
}: Props) {
  return (
    <select
      className={cn(
        'text-xl py-3 px-5 b-px border-gray-300 focus:outline-none focus:ring-1 focus:ring-black rounded-xl bg-gray-200 font-medium shadow-md cursor-pointer',
        className
      )}
      value={value}
      {...otherProps}
    >
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
