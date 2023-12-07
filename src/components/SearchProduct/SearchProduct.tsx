import { useState } from 'react'
import { cn } from '../../utils/cn'
import Input, { InputVariants } from '../ui/Input/Input'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'

interface Props {
  className?: string
}

export default function SearchProduct({ className }: Props) {
  const [value, setValue] = useState('')
  const debouncedValue = useDebouncedValue(value)

  console.log(debouncedValue)
  return (
    <div className="max-w-[550px] w-full relative">
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        className={className}
        variant={InputVariants.SEARCH}
      />
      <div
        className={cn(
          'grid grid-rows-[0fr] transition-all duration-500 ease overflow-hidden absolute  w-full z-50 ',
          {
            'grid-rows-[1fr]': !!value,
          }
        )}
      >
        <p className="text-red-500 min-h-0 bg-black rounded-3xl p-6 ">
          hellofrom Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet vitae dolore ut possimus unde! Dolorem ratione ea voluptatibus
          esse. Repellendus? Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Error possimus molestias aperiam sapiente soluta ea rem,
          consequuntur minima, beatae accusamus unde perferendis culpa
          consequatur aut natus harum aliquid quam magnam veritatis? Omnis harum
          aliquam in corporis aliquid, cumque earum est? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Ipsum, consequatur corporis
          accusantium id laudantium libero doloremque, quo saepe cumque esse
          earum ratione beatae. Aliquid consequatur alias temporibus rerum
          architecto quam atque quisquam dolore facilis tempore molestias quasi
          provident nobis aut quae, beatae inventore, asperiores voluptas rem
          numquam quod ab. Asperiores.
        </p>
      </div>
    </div>
  )
}
