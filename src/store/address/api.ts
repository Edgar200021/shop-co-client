import { AddressSchema } from './../../schemas/address-schema'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IResponseAddress } from './types'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const addressApi = createApi({
  reducerPath: 'address',
  tagTypes: ['Address'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/address',
  }),
  endpoints: builder => ({
    getAddresses: builder.query<{addresses:IResponseAddress[], count:number}, { limit: number }>({
      query: params => ({
        url: '',
        params: {
          limit: params.limit || 5,
        },
      }),
      providesTags: result => ['Address'],
    }),

    createAddress: builder.mutation<IResponseAddress, AddressSchema>({
      query: body => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Address'],
    }),

    updateAddress: builder.mutation<
      IResponseAddress,
      { address: AddressSchema; id: number }
    >({
      query: body => ({
        url: `/${body.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body.address,
      }),
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation<string, number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
  }),
})
