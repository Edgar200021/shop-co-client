import ReactSlider from 'react-slider'
import { useSearchParams } from 'react-router-dom'
import React, { ChangeEvent, useEffect, useState } from 'react'

import Button, { ButtonVariants } from '../ui/Button/Button'
import PageLoader from '../ui/PageLoader/PageLoader'
import Input, { InputVariants } from '../ui/Input/Input'
import Collapsed from '../Collapsed/Collapsed'

import { cn } from '../../utils/cn'
import { useGetProductFiltersQuery } from '../../store/products/productsApi'

import checkIcon from '../../assets/icons/check.svg'
import arrowIcon from '../../assets/icons/arrow.svg'
import { ProductSize } from '../../store/products/types'

interface Filter {
  category: string
  price: [number, number]
  size: ProductSize[]
  color: string[]
}

interface Props {
  className?: string
}

export default function ProductFilters({ className }: Props) {
  const { data, isLoading } = useGetProductFiltersQuery(null, {
    pollingInterval: 1000 * 60 * 60,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<Filter>({
    category: searchParams.get('category') || '',
    price: searchParams.get('price<=')
      ? [+searchParams.get('price>=')!, +searchParams.get('price<=')!]
      : [0, 50],
    size: searchParams.get('size')
      ? (searchParams.get('size')!.split(',') as ProductSize[])
      : [],
    color: searchParams.get('color')
      ? searchParams.get('color')!.split(',')
      : [],
  })

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFilters(prev => {
      if (e.target.name === 'size' || e.target.name === 'color') {
        const value =
          e.target.name === 'size'
            ? (e.target.value as ProductSize)
            : e.target.value

        //@ts-expect-error
        const isExists = prev[e.target.name].includes(value)

        return {
          ...prev,
          [e.target.name]: isExists
            ? prev[e.target.name].filter(val => val !== value)
            : [...prev[e.target.name], value],
        }
      }
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  function handleSearchParams() {
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'price') {
        searchParams.set('price>=', value[0])
        searchParams.set('price<=', value[1])
      }
      if ((key === 'color' || key === 'size') && !!value.length) {
        searchParams.set(key, value.join(',').replace(/#/g, ''))
      }

      if (key === 'category' && value) {
        searchParams.set('category', value)
      }
    }, {})

    setSearchParams(searchParams)
  }
  function handlePriceChange(value: [number, number]) {
    setFilters(prev => ({ ...prev, price: value }))
  }
  function handlePriceClick(value: number) {
    const [min, max] = filters.price

    setFilters(prev => ({
      ...prev,
      price: value > min ? [min, value] : [value, max],
    }))
  }

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll('.slider [role="slider"]')
    )

    elements.forEach((elem, i) => {
      elem.setAttribute('data-price', `${filters.price[i]}$`)
    })
  }, [filters.price])

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
      <div className="mb-6 pb-6 border-b-[1px]">
        <Collapsed
          renderCollapseBtn={(fn, isCollapsed) => (
            <Button
              variant={ButtonVariants.CLEAR}
              onClick={() => fn(prev => !prev)}
              className="flex items-center justify-between mb-5 text-xl font-bold max-w-full w-full text-start"
            >
              Categories
              <img
                className={cn(
                  'rotate-180 w-4 h-4 transition-transform duration-300 ease',
                  {
                    'rotate-0': !isCollapsed,
                  }
                )}
                src={arrowIcon}
              />
            </Button>
          )}
        >
          <ul className="flex flex-wrap gap-3">
            {data.data.categories.map(category => (
              <label
                key={category}
                className={cn(
                  'capitalize cursor-pointer text-black/60 hover:scale-110 hover:text-black transition-all duration-300',
                  {
                    'text-black': filters.category === category,
                  }
                )}
              >
                <Input
                  type="radio"
                  key={category}
                  variant={InputVariants.PRIMARY}
                  className="fixed opacity-0 pointer-events-none"
                  value={category}
                  name="category"
                  onChange={handleInputChange}
                  checked={filters.category === category}
                />
                {category}
              </label>
            ))}
          </ul>
        </Collapsed>
      </div>
      <div className="pb-12 border-b-[1px] mb-6">
        <span className="block mb-5 text-xl font-bold">Price</span>
        <ReactSlider
          min={0}
          max={Math.round(data.data.maxPrice)}
          className="bg-[#f0f0f0] w-full h-3 rounded-full slider cursor-pointer"
          thumbClassName=" rounded-full top-[-50%] w-6 h-6 bg-black  after:absolute after:block after:w-full after:h-4 after:left-[20%]  after:-bottom-6"
          trackClassName="bg-black h-full rounded-full"
          onChange={handlePriceChange}
          onSliderClick={handlePriceClick}
          minDistance={10}
          defaultValue={[0, Math.round(data.data.maxPrice)]}
          value={filters.price}
        />
      </div>
      <div className="pb-6 border-b-[1px] mb-6">
        <Collapsed
          renderCollapseBtn={(fn, isCollapsed) => (
            <Button
              variant={ButtonVariants.CLEAR}
              onClick={() => fn(prev => !prev)}
              className="flex items-center justify-between mb-5 text-xl font-bold max-w-full w-full text-start"
            >
              Colors
              <img
                className={cn(
                  'rotate-180 w-4 h-4 transition-transform duration-300 ease',
                  {
                    'rotate-0': !isCollapsed,
                  }
                )}
                src={arrowIcon}
              />
            </Button>
          )}
        >
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
                    className="fixed opacity-0 pointer-events-none"
                    name="color"
                    value={color.slice(1)}
                    onChange={handleInputChange}
                    checked={filters.color.includes(color.slice(1))}
                  />
                  <img
                    className={cn(
                      'w-4 h-4 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] opacity-0 transition-opacity duration-300  ',
                      {
                        'opacity-1': filters.color.includes(color.slice(1)),
                      }
                    )}
                    src={checkIcon}
                  />
                </label>
              </li>
            ))}
          </ul>
        </Collapsed>
      </div>
      <div className="pb-6 border-b-[1px] mb-6">
        <Collapsed
          renderCollapseBtn={(fn, isCollapsed) => (
            <Button
              variant={ButtonVariants.CLEAR}
              onClick={() => fn(prev => !prev)}
              className="flex items-center justify-between mb-5 text-xl font-bold max-w-full w-full text-start"
            >
              Size
              <img
                className={cn(
                  'rotate-180 w-4 h-4 transition-transform duration-300 ease',
                  {
                    'rotate-0': !isCollapsed,
                  }
                )}
                src={arrowIcon}
              />
            </Button>
          )}
        >
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
                  onChange={handleInputChange}
                  checked={filters.size.includes(size)}
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
        </Collapsed>
      </div>
      <Button
        onClick={handleSearchParams}
        className="max-w-full"
        variant={ButtonVariants.PRIMARY}
      >
        Apply Filters
      </Button>
    </div>
  )
}
