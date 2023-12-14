import { IProduct, ProductSize } from '../products/types'

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
  basketProducts: {
    size: ProductSize
    color: string
    quantity: number
    _id: string
    product: Pick<IProduct, '_id' | 'image' | 'title' | 'price'>
  }[]
}
