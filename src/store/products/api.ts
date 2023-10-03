import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from './types'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/products',
  }),
  endpoints: builder => ({
    getProducts: builder.query<
      { count: number; products: IProduct[] },
      Record<string, string | number>
    >({
      query: params => ({
        url: '',
        params: {
          limit: params.limit || 9,
          page: params.page || 1,
          category: params.category,
          sort: params.sort,
        },
      }),
    }),
  }),
})
