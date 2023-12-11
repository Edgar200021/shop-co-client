import { toast } from 'react-hot-toast'
import { IFailResponse } from '../types/types'

function isCustomApiError(err: unknown): err is IFailResponse {
  return (err as IFailResponse).data.message !== undefined
}

export function errorHandlerAPI(error: unknown): void {
  if (error instanceof Error) toast.error(error.message)
  if (isCustomApiError(error)) toast.error(error.data.message)
}
