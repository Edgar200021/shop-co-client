export interface IReviewResponse {
  id: number
  rating: number
  text: number
  created_ad: Date
  username: string
}

export interface IRevewRequest {
  rating: number
  text: string
}
