import { ReactNode, createContext, useContext } from 'react'

import { cn } from '../../utils/cn'
import Button, { ButtonVariants } from '../ui/Button/Button'

import deleteIcon from '../../assets/icons/delete.svg'
import updateIcon from '../../assets/icons/pencil.svg'
import Modal from '../Modal/Modal'
//import ProductForm from '../Forms/ProductForm/ProductForm'
//import PageLoader from '../ui/PageLoader/PageLoader'
import { useUpdateBasketQuantityMutation } from '../../store/basket/basketApi'

interface Props {
  className?: string
  id: string
  productId: string
  image: string
  title: string
  size: string[] | string
  color: string[] | string
  price: number
  quantity?: number
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
  color,
  quantity,
  children,
  productId,
}: Props) {
  return (
    <BasketProductContext.Provider
      value={{ image, title, price, quantity, size, color, id, productId }}
    >
      <li className={cn('flex gap-4 ', className)}>{children}</li>
    </BasketProductContext.Provider>
  )
}

function BasketProductImage({ className }: { className?: string }) {
  const { title, image, productId } = useContext(BasketProductContext)!

  return (
    <div
      className={cn(
        'rounded-md max-w-[120px] min-w-[100px] w-full max-h-[130px] min-h-[100px] flex items-center justiyf-center',
        className
      )}
    >
      <Button variant={ButtonVariants.CLEAR} to={`/product/${productId}`}>
        <img className="rounded-md" src={image} alt={title} />
      </Button>
    </div>
  )
}

function BasketProductTitle({ className }: { className?: string }) {
  const { title } = useContext(BasketProductContext)!

  return <h3 className={cn('font-bold text-xl', className)}>{title}</h3>
}
function BasketProductSize({ className }: { className?: string }) {
  const { size } = useContext(BasketProductContext)!

  return (
    <div className={cn('text-sm', className)}>
      <span className="mr-1">Size:</span>
      {Array.isArray(size) ? (
        <ul className="flex gap-1">
          {size.map((val, i, arr) => (
            <li key={val}>
              <span className="text-black/60 capitalize ">
                {i === arr.length - 1 ? val : `${val},`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-black/60">{size}</span>
      )}
    </div>
  )
}
function BasketProductColors({ className }: { className?: string }) {
  const { color } = useContext(BasketProductContext)!

  return (
    <div className={cn('text-sm flex gap-1', className)}>
      <span className="">Color:</span>
      {Array.isArray(color) ? (
        <ul className="flex gap-1">
          {color.map((val, i, arr) => (
            <li key={val}>
              <span className="text-black/60 capitalize ">
                {i === arr.length - 1 ? val : `${val},`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-black/60 capitalize ">{color}</span>
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
  disabled,
}: {
  className?: string
  handleDelete: () => void
  disabled?: boolean
}) {
  return (
    <Button
      variant={ButtonVariants.CLEAR}
      className={cn('w-6 h-6 ', className)}
      onClick={handleDelete}
      disabled={disabled}
    >
      <img src={deleteIcon} />
    </Button>
  )
}
function BasketProductUpdate({ className }: { className?: string }) {
  //  const { id } = useContext(BasketProductContext)!

  return (
    <Modal>
      <>
        <Modal.Open
          renderButton={open => (
            <Button
              onClick={() => {
                open('updateProduct')
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
          renderContent={() => (
            //result.isLoading || !result.data ? (
            //  <PageLoader />
            //) : (
            //  <ProductForm close={close} defaultValues={result.data.product} />
            //)
            <h1>{}</h1>
          )}
        />
      </>
    </Modal>
  )
}

function BasketProductCount({ className }: { className?: string }) {
  const { quantity, id } = useContext(BasketProductContext)!
  const [updateQuantity, { isLoading }] = useUpdateBasketQuantityMutation()

  function decrement() {
    if (quantity && quantity > 1) {
      updateQuantity({ id, quantity: quantity - 1 })
    }
  }

  function increment() {
    updateQuantity({ id, quantity: quantity! + 1 })
  }

  return (
    <div
      className={cn(
        'max-w-[126px] font-bold text-2xl min-w-[105px] w-full rounded-full bg-[#F0F0F0] px-5 py-[4px] flex items-center justify-between',
        className,
        { 'bg-gray-50': isLoading }
      )}
    >
      <Button
        disabled={isLoading}
        onClick={decrement}
        variant={ButtonVariants.CLEAR}
        className={cn({ 'cursor-not-allowed': isLoading })}
      >
        -
      </Button>
      <span>{quantity && quantity}</span>
      <Button
        disabled={isLoading}
        onClick={increment}
        variant={ButtonVariants.CLEAR}
        className={cn({ 'cursor-not-allowed': isLoading })}
      >
        +
      </Button>
    </div>
  )
}
BasketProduct.Image = BasketProductImage
BasketProduct.Title = BasketProductTitle
BasketProduct.Size = BasketProductSize
BasketProduct.Colors = BasketProductColors
BasketProduct.Price = BasketProductPrice
BasketProduct.Delete = BasketProductDelete
BasketProduct.Update = BasketProductUpdate
BasketProduct.Count = BasketProductCount
