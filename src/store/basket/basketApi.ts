import { IBaseFilter, ISuccessResponse } from '../../types/types'
import { apiSlice } from '../appApi'
import { IBasketProductRequest, IBasketProductResponse } from './types'

export const basketApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBasketProducts: builder.query<
      NonNullable<ISuccessResponse<IBasketProductResponse>>,
      Partial<IBaseFilter> | undefined
    >({
      query: filter => ({
        url: '/basket',
        params: {
          page: filter?.page,
          limit: filter?.limit,
        },
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
    deleteBasketProduct: builder.mutation<
      { status: 'string'; data: null },
      string
    >({
      query: id => ({
        url: `/basket/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Basket'],
    }),

    updateBasketQuantity: builder.mutation<
      ISuccessResponse<Pick<IBasketProductResponse, 'basketProducts'>>,
      { id: string; quantity: number }
    >({
      query: body => ({
        url: `/basket/${body.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { quantity: body.quantity },
      }),
      invalidatesTags: ['Basket'],
    }),
  }),
})

export const {
  useCreateBasketProductMutation,
  useGetBasketProductsQuery,
  useUpdateBasketQuantityMutation,
  useDeleteBasketProductMutation,
  usePrefetch,
} = basketApi
