export interface IProduct {
  id: number
  image: string
  discount: number
  price: number
  title: string
  discounted_price: number
  rating: number
  category: string
}

export interface IProductRequest
  extends Omit<IProduct, 'id' | 'category' | 'rating' | 'discounted_price'> {
  category_id: number
}
