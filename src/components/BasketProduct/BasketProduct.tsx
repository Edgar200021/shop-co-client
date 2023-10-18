import { ReactNode, createContext, useContext } from 'react'

import { cn } from '../../utils/cn'
import Button, { ButtonVariants } from '../ui/Button/Button'

import deleteIcon from '../../assets/icons/delete.svg'
import updateIcon from '../../assets/icons/pencil.svg'
import Modal from '../Modal/Modal'
import ProductForm from '../Forms/ProductForm/ProductForm'
import { productApi } from '../../store/products/api'
import PageLoader from '../ui/PageLoader/PageLoader'

interface Props {
  className?: string
  id: number
  image: string
  title: string
  size: string
  colors: string[] | string
  price: number
  count?: number
  children: ReactNode
}

const BasketProductContext = createContext<Omit<
  Props,
  'className' | 'children'
> | null>(null)

export default function BasketProduct({
  className,
  id,
  image,
  title,
  price,
  size,
  colors,
  count,

  children,
}: Props) {
  return (
    <BasketProductContext.Provider
      value={{ image, title, price, count, size, colors, id }}
    >
      <li className={cn('flex gap-4 ', className)}>{children}</li>
    </BasketProductContext.Provider>
  )
}

function BasketProductImage() {
  const { title, image } = useContext(BasketProductContext)!

  return (
    <div className="rounded-md max-w-[125px] min-w-[100px] w-full max-h-[190px] min-h-[150px] flex items-center justiyf-center">
      <img className="rounded-md" src={image} alt={title} />
    </div>
  )
}

function BasketProductTitle({ className }: { className?: string }) {
  const { title } = useContext(BasketProductContext)!

  return <h3 className={cn('font-bold text-xl', className)}>{title}</h3>
}
function BasketProductSize({ className }: { className?: string }) {
  const { size } = useContext(BasketProductContext)!

  console.log(typeof size)
  return (
    <div className={cn('text-sm', className)}>
      <span className="mr-1">Size:</span>
      <span className="text-black/60">{size.slice(1, size.length - 1)}</span>
    </div>
  )
}
function BasketProductColors({ className }: { className?: string }) {
  const { colors } = useContext(BasketProductContext)!

  console.log(typeof colors)
  return (
    <div className={cn('text-sm flex gap-1', className)}>
      <span className="">Color:</span>
      {Array.isArray(colors) ? (
        <ul className="flex gap-1">
          {colors.map((val, i, arr) => (
            <li key={val}>
              <span className="text-black/60 capitalize ">
                {i === arr.length - 1 ? val : `${val},`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-black/60 capitalize ">{colors}</span>
      )}
    </div>
  )
}

function BasketProductPrice({ className }: { className?: string }) {
  const { price } = useContext(BasketProductContext)!

  return <span className={cn('font-bold text-2xl', className)}>${price}</span>
}

function BasketProductDelete({
  className,
  handleDelete,
}: {
  className?: string
  handleDelete: () => void
}) {
  return (
    <Button
      variant={ButtonVariants.CLEAR}
      className={cn('w-6 h-6 ', className)}
      onClick={handleDelete}
    >
      <img src={deleteIcon} />
    </Button>
  )
}
function BasketProductUpdate({ className }: { className?: string }) {
  const { id } = useContext(BasketProductContext)!

  const [trigger, result] = productApi.useLazyGetProductQuery()

  console.log(result.data)

  return (
    <Modal>
      <>
        <Modal.Open
          renderButton={open => (
            <Button
              onClick={() => {
                open('updateProduct')
                trigger(id)
              }}
              variant={ButtonVariants.CLEAR}
              className={cn('w-6 h-6', className)}
            >
              <img src={updateIcon} />
            </Button>
          )}
        />
        <Modal.Window
          className="bg-white flex items-center justify-center"
          name="updateProduct"
          renderContent={close =>
            result.isLoading || !result.data ? (
              <PageLoader />
            ) : (
              <ProductForm close={close} defaultValues={result.data} />
            )
          }
        />
      </>
    </Modal>
  )
}

BasketProduct.Image = BasketProductImage
BasketProduct.Title = BasketProductTitle
BasketProduct.Size = BasketProductSize
BasketProduct.Colors = BasketProductColors
BasketProduct.Price = BasketProductPrice
BasketProduct.Delete = BasketProductDelete
BasketProduct.Update = BasketProductUpdate
