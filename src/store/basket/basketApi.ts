import { ISuccessResponse } from '../../types/types'
import { apiSlice } from '../appApi'
import { IBasketProductRequest, IBasketProductResponse } from './types'

export const basketApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBasketProducts: builder.query<
      NonNullable<ISuccessResponse<IBasketProductResponse>>,
      null
    >({
      query: () => ({
        url: '/basket',
      }),
      providesTags: ['Basket'],
    }),

    createBasketProduct: builder.mutation<
      NonNullable<ISuccessResponse<IBasketProductRequest[]>>,
      IBasketProductRequest
    >({
      query: body => ({
        url: '/basket',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Basket'],
    }),
  }),
})

export const { useCreateBasketProductMutation, useGetBasketProductsQuery } =
  basketApi
