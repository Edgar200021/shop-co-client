export interface ISuccessResponse<T> {
  status: 'success'
  results?: number
  data: T
}

export interface IFailResponse {
  data: { status: 'fail' | 'error'; message: string }
}

export interface IBaseFilter {
  page: number
  limit: number
  fields: string
  sort: string
}
