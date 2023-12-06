import { IProduct, ProductSize } from '../products/types'

export interface IBasketProduct {
  id: number
  product_id: number
  count: number
  price: number
  discounted_price: number
  image: string
  color: string
  title: string
  size: string
}

export interface IBasketProductRequest {
  productId: string
  color: string
  size: ProductSize
  quantity: number
}

export interface IBasketProductResponse {
  totalQuantity: number
  totalPrice: number
  totalDiscountedPrice: number
  items: {
    size: ProductSize
    color: string
    quantity: number
    _id: string
    product: IProduct
  }[]
}
