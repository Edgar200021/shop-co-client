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
          'price[lt]': filter?.['price[lt]'],
          'price[gt]': filter?.['price[gt]'],
          'price[lte]': filter?.['price[lte]'],
          'price[gte]': filter?.['price[gte]'],
          size: filter?.size,
          color: filter?.color,
          title: filter?.title,
          'title[regex]': filter?.['title[regex]'],
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

export const { useGetProductsQuery, useGetProductQuery, useLazyGetProductQuery } = productApi
