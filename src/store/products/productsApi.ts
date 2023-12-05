import { ISuccessResponse } from '../../types/types'
import { apiSlice } from '../appApi'
import {
  IProduct,
  IProductsResponse,
  IProductFilter,
  IProductResponse,
} from './types'

export const productApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<
      ISuccessResponse<IProductsResponse>,
      IProductFilter | null
    >({
      query: filter => ({
        url: '/products',
      }),
    }),

    getProduct: builder.query<ISuccessResponse<IProductResponse>, string>({
      query: id => ({
        url: `/products/${id}`,
      }),
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productApi
