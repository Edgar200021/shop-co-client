export interface IProduct {
  id: number
  image: string
  description: string
  discount: number
  price: number
  title: string
  discounted_price: number
  rating: number
  category: string
  size: string
  colors: string[]
  category_id?: number
}

export interface IProductRequest
  extends Omit<IProduct, 'id' | 'category' | 'rating' | 'discounted_price'> {
  category_id: number
}
