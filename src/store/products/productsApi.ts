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
      Partial<IProductFilter> | null
    >({
      query: filter => ({
        url: '/products',
        params: {
          limit: filter?.limit || 9,
          page: filter?.page || 1,
          sort: filter?.sort,
          fields: filter?.fields,
          category: filter?.category,
          price: filter?.price,
          size: filter?.size,
          color: filter?.color,
        },
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
