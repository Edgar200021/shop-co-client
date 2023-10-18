import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Select from 'react-select'

import { ChangeEvent, useState } from 'react'

import { ProductSchema, productSchema } from '../../../schemas/product-schema'
import Input, { InputVariants } from '../../ui/Input/Input'
import { CATEGORY, COLORS, SIZE } from '../../../const/products'
import Button, { ButtonVariants } from '../../ui/Button/Button'
import { productApi } from '../../../store/products/api'

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
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          description: defaultValues.description,
          price: defaultValues.price,
          discount: defaultValues.discount,
        }
      : {},
  })

  const [properties, setProperties] = useState({
    colors: defaultValues?.colors || ['#fff'],
    size: defaultValues?.size || ['Small'],
    category_id: defaultValues?.category_id ?? 0,
    image: defaultValues?.image ?? '',
  })

  const [propertyErrors, setPropertyErrors] = useState({
    colors: '',
    size: '',
    category_id: '',
    image: '',
  })

  console.log(defaultValues)
  console.log(properties)

  const [uploadImage, { isLoading }] =
    productApi.useUploadProductImageMutation()
  const [createProduct, { isLoading: isProductLoading }] =
    productApi.useCreateProductMutation()

  const onSubmit: SubmitHandler<ProductSchema> = data => {
    for (const key in properties) {
      /* @ts-ignore */
      const value = properties[key]

      if (Array.isArray(value) && !value.length) {
        setPropertyErrors(prev => ({
          ...prev,
          [key]: `Please provide ${key} `,
        }))
      } else if (!value) {
        setPropertyErrors(prev => ({
          ...prev,
          [key]: `Please provide ${key} `,
        }))
      }
    }

    if (Object.values(propertyErrors).some(Boolean)) {
      return
    }

    createProduct({ ...data, ...properties })
      .unwrap()
      .then(() => {
        toast.success('Success', { duration: 500 })
        reset({ price: 0, title: '', description: '', discount: 0 })
        setProperties({
          colors: ['#fff'],
          size: ['Small'],
          category_id: 0,
          image: '',
        })
      })
      .catch(err => toast.error(err.data.msg, { duration: 500 }))
  }

  function uploadProductImage(e: ChangeEvent<HTMLInputElement>) {
    const formData = new FormData()

    const maxImageSize = 1024 * 1024

    if (
      !e.target.files ||
      !e.target.files[0].type.startsWith('image') ||
      e.target.files[0].size > maxImageSize
    ) {
      toast.error(
        `Invalid type of file or image size greather than ${maxImageSize} `
      )
      return
    }

    formData.append('image', e.target.files[0])

    uploadImage(formData)
      .unwrap()
      .then(data => setProperties({ ...properties, image: data.image.src }))
      .catch(err => toast(err.data.msg, { duration: 5000 }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <fieldset
        disabled={isProductLoading}
        className="grid grid-cols-2 grid-rows-2 items-center gap-10"
      >
        <div className="space-y-5">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Title"
                variant={InputVariants.PRIMARY}
                {...field}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Description"
                variant={InputVariants.PRIMARY}
                {...field}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Price"
                variant={InputVariants.PRIMARY}
                type="number"
                {...field}
              />
            )}
          />

          <div className="flex flex-wrap gap-2 bg-[#f0f0f0] rounded-lg items-center px-5 py-3">
            {COLORS.map((color, i) => (
              <label
                key={color.value}
                className={` w-8 h-8 rounded-full inline-block cursor-pointer relative`}
                style={{ backgroundColor: color.value }}
              >
                <Input
                  type="checkbox"
                  variant={InputVariants.PRIMARY}
                  className="hidden peer"
                  defaultChecked={i === 0}
                  onChange={() =>
                    setProperties(prev => {
                      const colors = prev.colors.includes(color.value)
                        ? prev.colors.filter(val => val !== color.value)
                        : [...prev.colors, color.value]

                      return { ...prev, colors }
                    })
                  }
                />
                <span className="opacity-0 peer-checked:opacity-100 transition-opacity duration-300 ease absolute right-1 -top-1 text-red-500">
                  &#10003;
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 bg-[#f0f0f0] px-5  rounded-lg items-center text-white py-3">
            {SIZE.map((size, i) => (
              <label
                key={size.value}
                className="bg-black rounded-3xl px-2 py-2 cursor-pointer relative"
              >
                <Input
                  type="checkbox"
                  variant={InputVariants.PRIMARY}
                  className="hidden peer"
                  defaultChecked={i === 0}
                  onChange={() =>
                    setProperties(prev => {
                      const sizes = prev.size.includes(size.value)
                        ? prev.size.filter(val => val !== size.value)
                        : [...prev.size, size.value]

                      return { ...prev, size: sizes }
                    })
                  }
                />
                <span className="opacity-0 peer-checked:opacity-100 transition-opacity duration-300 ease absolute right-1 -top-1 text-red-500 ">
                  &#10003;
                </span>
                {size.value}
              </label>
            ))}
          </div>
          <Controller
            name="discount"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Discount"
                variant={InputVariants.PRIMARY}
                type="number"
                {...field}
              />
            )}
          />
          <Select
            /* @ts-ignore */
            options={CATEGORY}
            placeholder="Choose product category"
            onChange={value =>
              /* @ts-ignore */
              setProperties({ ...properties, category_id: value!.value })
            }
          />
        </div>
        <div>
          <div className="w-80 h-80 mb-20">
            <img
              className={cn({ 'blur-lg': isLoading })}
              src={properties.image ? properties.image : emptyImage}
              alt="Product image"
            />
          </div>
          <Input
            disabled={isLoading}
            onChange={uploadProductImage}
            type="file"
            variant={InputVariants.PRIMARY}
            accept="image/png, image/jpg, image/jpeg"
            className="disabled:cursor-wait"
          />
        </div>
        <Button
          className="self-start disabled:bg-gray-300  "
          disabled={isProductLoading}
          variant={ButtonVariants.PRIMARY}
          type="submit"
        >
          {isProductLoading ? 'Loading...' : 'Submit'}
        </Button>
      </fieldset>
    </form>
  )
}
