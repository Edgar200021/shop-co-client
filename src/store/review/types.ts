import { IUser } from '../auth/types'

export interface IReviewResponse {
  id: string
  rating: number
  review: string
  user: Omit<IUser, 'role' | 'id'> & { _id: string }
  createdAt: Date
}

export interface IReviewsResponse {
  reviews: IReviewResponse[]
}

export interface IReviewRequest {}
export interface ICreateReview {
  productId: string
  rating: number
  review: string
}

export enum SortReview {
  DATE_DESC = '-createdAt',
  DATE_ASC = 'createdAt',
  TEXT_DESC = '-review',
  TEXT_ASC = 'review',
  RATING_DESC = '-rating',
  RATING_ASC = 'rating',
}
