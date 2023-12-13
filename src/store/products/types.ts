import { IBaseFilter } from '../../types/types'

export enum ProductSize {
  XX_SMALL = 'XX-Small',
  X_SMALL = 'X-Small',
  SMALL = 'Small',
  MEDIUM = 'Medium',
  LARGE = 'Large',
  X_LARGE = 'X-Large',
  XX_LARGE = 'XX-Large',
  '3X_LARGE' = '3X-Large',
  '4x_LARGE' = '4X-Large',
}

export interface IProduct {
  id: string
  title: string
  image: string
  description: string
  discount: number
  price: number
  priceDiscount: number
  avgRating: number
  size: ProductSize[]
  color: string[]
  category: 't-shirt' | 'shorts' | 'shirts' | 'hoodie' | 'jeans'
}

export interface IProductRequest
  extends Omit<IProduct, 'id' | 'category' | 'rating' | 'discounted_price'> {
  category_id: number
}

export interface IProductFilter extends IBaseFilter {
  category: 't-shirt' | 'shorts' | 'shirts' | 'hoodie' | 'jeans'
  price: number
  'price[lt]': number
  'price[gt]': number
  'price[lte]': number
  'price[gte]': number
  'color[elemMatch]': string
  'size[elemMatch]': string
  title: string
  'title[regex]': string
}

export interface IProductFilterResponse {
  minPrice: number
  maxPrice: number
  colors: string[]
  size: ProductSize[]
  categories: string[]
}
export interface IProductsResponse {
  products: IProduct[]
}

export interface IProductResponse {
  product: IProduct
}
