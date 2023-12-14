import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

import Input, { InputVariants } from '../../ui/Input/Input'
import Button, { ButtonVariants } from '../../ui/Button/Button'

import emptyImage from '../../../assets/images/empty.jpg'
import { cn } from '../../../utils/cn'
import toast from 'react-hot-toast'
import { IProduct } from '../../../store/products/types'

interface Props {
  className?: string
  defaultValues?: IProduct

  close?: () => void
}

export default function ProductForm({ className, defaultValues }: Props) {
  const { control } = useForm()

  return (
    <h1>hello</h1>
    //<form className={className}>
    //  <fieldset className="grid grid-cols-2 grid-rows-2 items-center gap-10">
    //    <div className="space-y-5">
    //      <Controller
    //        name="title"
    //        control={control}
    //        render={({ field }) => (
    //          <Input
    //            placeholder="Title"
    //            variant={InputVariants.PRIMARY}
    //            {...field}
    //          />
    //        )}
    //      />
    //      <Controller
    //        name="description"
    //        control={control}
    //        render={({ field }) => (
    //          <Input
    //            placeholder="Description"
    //            variant={InputVariants.PRIMARY}
    //            {...field}
    //          />
    //        )}
    //      />
    //      <Controller
    //        name="price"
    //        control={control}
    //        render={({ field }) => (
    //          <Input
    //            placeholder="Price"
    //            variant={InputVariants.PRIMARY}
    //            type="number"
    //            {...field}
    //          />
    //        )}
    //      />

    //      <div className="flex flex-wrap gap-2 bg-[#f0f0f0] rounded-lg items-center px-5 py-3">
    //        {COLORS.map((color, i) => (
    //          <label
    //            key={color.value}
    //            className={` w-8 h-8 rounded-full inline-block cursor-pointer relative`}
    //            style={{ backgroundColor: color.value }}
    //          >
    //            <Input
    //              type="checkbox"
    //              variant={InputVariants.PRIMARY}
    //              className="hidden peer"
    //              defaultChecked={i === 0}
    //            />
    //            <span className="opacity-0 peer-checked:opacity-100 transition-opacity duration-300 ease absolute right-1 -top-1 text-red-500">
    //              &#10003;
    //            </span>
    //          </label>
    //        ))}
    //      </div>
    //      <div className="flex flex-wrap gap-2 bg-[#f0f0f0] px-5  rounded-lg items-center text-white py-3">
    //        {SIZE.map((size, i) => (
    //          <label
    //            key={size.value}
    //            className="bg-black rounded-3xl px-2 py-2 cursor-pointer relative"
    //          >
    //            <Input
    //              type="checkbox"
    //              variant={InputVariants.PRIMARY}
    //              className="hidden peer"
    //              defaultChecked={i === 0}
    //            />
    //            <span className="opacity-0 peer-checked:opacity-100 transition-opacity duration-300 ease absolute right-1 -top-1 text-red-500 ">
    //              &#10003;
    //            </span>
    //            {size.value}
    //          </label>
    //        ))}
    //      </div>
    //      <Controller
    //        name="discount"
    //        control={control}
    //        render={({ field }) => (
    //          <Input
    //            placeholder="Discount"
    //            variant={InputVariants.PRIMARY}
    //            type="number"
    //            {...field}
    //          />
    //        )}
    //      />
    //      <Select
    //        options={CATEGORY}
    //        placeholder="Choose product category"

    //      />
    //    </div>
    //    <div>
    //      <div className="w-80 h-80 mb-20">
    //        <img alt="Product image" />
    //      </div>
    //      <Input
    //        type="file"
    //        variant={InputVariants.PRIMARY}
    //        accept="image/png, image/jpg, image/jpeg"
    //        className="disabled:cursor-wait"
    //      />
    //    </div>
    //    <Button
    //      className="self-start disabled:bg-gray-300  "
    //      variant={ButtonVariants.PRIMARY}
    //      type="submit"
    //    ></Button>
    //  </fieldset>
    //</form>
  )
}
