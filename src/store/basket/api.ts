import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IBasketProduct,
  IBasketProductRequest,
  IBasketProductResponse,
} from './types'

export const basketApi = createApi({
  reducerPath: 'basket',
  tagTypes: ['Basket'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/basket',
  }),
  endpoints: builder => ({
    getBasketProducts: builder.query<IBasketProductResponse, string>({
      query: () => ({
        url: '',
      }),
      providesTags: result => ['Basket'],
    }),

    addBasketProduct: builder.mutation<IBasketProduct, IBasketProductRequest>({
      query: body => ({
        url: `/${body.productId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          color: body.color,
          size: body.size,
          count: body.count,
        },
      }),
      invalidatesTags: ['Basket'],
    }),

    updateBasketProduct: builder.mutation<
      IBasketProduct,
      { id: number; count: number }
    >({
      query: body => ({
        url: `/${body.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { count: body.count },
      }),
      invalidatesTags: ['Basket'],
    }),

    deleteBasketProduct: builder.mutation<{ msg: string }, number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Basket'],
    }),
  }),
})
