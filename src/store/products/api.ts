import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct, IProductRequest } from './types'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'products',
  tagTypes: ['Products'],
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
      providesTags: result => ['Products'],
    }),
    getProduct: builder.query<IProduct, number>({
      query: id => ({
        url: `/${id}`,
      }),
    }),

    createProduct: builder.mutation<IProduct, IProductRequest>({
      query: body => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<
      IProduct,
      { product: IProductRequest; id: number }
    >({
      query: body => ({
        url: `/${body.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body.product,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<string, number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    uploadProductImage: builder.mutation<
      {
        image: {
          src: string
        }
      },
      FormData
    >({
      query: body => ({
        url: 'uploadImage',
        method: 'POST',

        body,
      }),
    }),
  }),
})
