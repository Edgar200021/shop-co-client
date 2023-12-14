import { useSearchParams } from 'react-router-dom'
import Select from '../ui/Select/Select'
import { ChangeEvent } from 'react'

interface Props {
  className?: string
  options: { value: string; label: string }[]
}

export default function SortBy({ className, options }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort')

  function handleChangeSort(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sort', e.target.value)
    setSearchParams(searchParams)
  }

  return (
    <Select
      value={sort || options[0].value}
      onChange={handleChangeSort}
      options={options}
      className={className}
    />
  )
}
