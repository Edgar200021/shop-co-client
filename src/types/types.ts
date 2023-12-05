import { IProduct } from '../store/products/types'

export interface ISuccessResponse<T> {
  status: 'success'

  data: T
}

export interface IFailResponse {
  status: 'fail' | 'error'
  results?: number
  message: string
}

export interface IBaseFilter {
  page: number
  limit: number
  fields: string
  sort: string
}
