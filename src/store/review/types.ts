export interface IReviewResponse {
  id: number
  rating: number
  text: string
  created_at: string
  username: string
}

export interface IRevewRequest {
  rating: number
  text: string
}

export enum SortReview {
  DATE_DESC = 'date-desc',
  DATE_ASC = 'date-asc',
  TEXT_DESC = 'text-desc',
  TEXT_ASC = 'text-asc',
  RATING_DESC = 'rating-desc',
  RATING_ASC = 'rating-asc',
}
