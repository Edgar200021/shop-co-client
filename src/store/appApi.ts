import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '/api/v1' })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Auth', 'User', 'Basket', 'Order', 'Review'],
  endpoints: builder => ({}),
})
