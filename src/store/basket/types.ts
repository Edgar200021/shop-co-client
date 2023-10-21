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

export interface IBasketProductResponse {
  discountedPrice: number
  totalPrice: number
  totalCount: number
  deliveryFee: number
  products: IBasketProduct[]
}

export interface IBasketProductRequest {
  productId: number
  color: string
  size: string
  count: number
}
