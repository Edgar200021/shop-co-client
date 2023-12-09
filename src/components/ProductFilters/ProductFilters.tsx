import ReactSlider from 'react-slider'

import { ChangeEvent, useEffect, useState } from 'react'
import { cn } from '../../utils/cn'
import Button, { ButtonVariants } from '../ui/Button/Button'
import { useGetProductFiltersQuery } from '../../store/products/productsApi'
import PageLoader from '../ui/PageLoader/PageLoader'
import Input, { InputVariants } from '../ui/Input/Input'

import checkIcon from '../../assets/icons/check.svg'
import { useSearchParams } from 'react-router-dom'

interface Props {
  className?: string
}

export default function ProductFilters({ className }: Props) {
  const { data, isLoading } = useGetProductFiltersQuery(null)
  const [price, setPrice] = useState<number[]>([0, 50])
  const [urlParams, setParams] = useSearchParams()

  useEffect(() => {
    if (data)
      setPrice([Math.round(data.data.minPrice), Math.round(data.data.maxPrice)])
  }, [data])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('.slider [role="slider"]')
    )

    elements.forEach((elem, i) => {
      elem.setAttribute('data-price', `${price[i]}$`)
    })
  }, [price])

  function handleChangeUrlParams(e: ChangeEvent<HTMLInputElement>) {
    urlParams.set(e.target.name, e.target.value)
    setParams({ [e.target.name]: e.target.value })
  }

  if (isLoading || !data) return <PageLoader />

  return (
    <div
      className={cn(
        'px-6 py-5 rounded-3xl border-[1px] max-w-[295px]',
        className
      )}
    >
      <div className="pb-6 border-b-[1px] mb-6">
        <span className="text-xl font-bold">Filters</span>
      </div>
      <div>
        <span className="block mb-5 text-xl font-bold">Categories</span>
        <ul className="pb-6 border-b-[1px] mb-6 flex flex-wrap gap-3">
          {data.data.categories.map(category => (
            <label
              key={category}
              className="capitalize cursor-pointer text-black/60 hover:scale-110 hover:text-black transition-all duration-300"
            >
              <Input
                type="radio"
                key={category}
                variant={InputVariants.PRIMARY}
                className="fixed opacity-0 pointer-events-none"
                value={category}
                name="category"
                onChange={handleChangeUrlParams}
              />
              {category}
            </label>
          ))}
        </ul>
      </div>
      <div className="pb-12 border-b-[1px] mb-6">
        <span className="block mb-5 text-xl font-bold">Price</span>
        <ReactSlider
          min={price[0]}
          max={price[1]}
          className="bg-[#f0f0f0] w-full h-3 rounded-full slider cursor-pointer"
          thumbClassName=" rounded-full top-[-50%] w-6 h-6 bg-black  after:absolute after:block after:w-full after:h-4 after:left-[20%]  after:-bottom-6"
          trackClassName="bg-black h-full rounded-full"
          value={price}
          onChange={setPrice}
        />
      </div>
      <div className="pb-6 border-b-[1px] mb-6">
        <span className="block mb-5 text-xl font-bold">Colors</span>
        <ul className="flex gap-4 flex-wrap">
          {data.data.colors.map(color => (
            <li
              className={`w-10 h-10 rounded-full border-[1px] border-black/20`}
              key={color}
            >
              <label
                style={{ backgroundColor: color }}
                className={`w-full h-full inline-block cursor-pointer rounded-full relative`}
              >
                <Input
                  type="checkbox"
                  variant={InputVariants.PRIMARY}
                  className="fixed opacity-0 pointer-events-none peer"
                  name="color"
                  value={color}
                  onChange={handleChangeUrlParams}
                />
                <img
                  className="w-4 h-4 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 transition-opacity duration-300 peer-checked:opacity-1 "
                  src={checkIcon}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="pb-6 border-b-[1px] mb-6">
        <span className="block mb-5">Size</span>
        <ul className="flex gap-4 flex-wrap">
          {data.data.size.map(size => (
            <li className={`rounded-[62px]`} key={size}>
              <Input
                type="checkbox"
                className="fixed opacity-0 pointer-events-none peer"
                variant={InputVariants.PRIMARY}
                id={size}
                name="size"
                value={size}
                onChange={handleChangeUrlParams}
              />
              <label
                htmlFor={size}
                className="inline-block w-full h-full cursor-pointer px-5 py-[10px] bg-[#F0F0F0] rounded-[62px] hover:bg-black text-black/60 hover:text-white transition-colors duration-300 ease peer-checked:bg-black peer-checked:text-white"
              >
                {size}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <Button className="max-w-full" variant={ButtonVariants.PRIMARY}>
        Apply Filters
      </Button>
    </div>
  )
}
