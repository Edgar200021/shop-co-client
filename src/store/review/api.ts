import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRevewRequest, IReviewResponse, SortReview } from './types'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const reviewApi = createApi({
  reducerPath: 'review',
  tagTypes: ['Review'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/review',
  }),
  endpoints: builder => ({
    getAllReviews: builder.query<
      { reviews: IReviewResponse[] },
      { productId: number; limit?: number; sort?: SortReview }
    >({
      query: ({ productId, limit = 6, sort }) => ({
        url: `allReviews/${productId}`,
        params: {
          limit: limit,
          sort: sort || SortReview.DATE_ASC,
        },
      }),
      providesTags: result => ['Review'],
    }),
    getReview: builder.query<{ review: IReviewResponse }, number>({
      query: id => ({
        url: `/${id}`,
      }),
    }),
    createReview: builder.mutation<
      { review: IReviewResponse },
      IRevewRequest & { id: number }
    >({
      query: body => ({
        url: `/${body.id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { rating: body.rating, text: body.text },
      }),
      invalidatesTags: ['Review'],
    }),
    updateReview: builder.mutation<
      { review: IReviewResponse },
      IRevewRequest & { id: number }
    >({
      query: body => ({
        url: `/${body.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type:': 'application/json',
        },
        body: { rating: body.rating, text: body.text },
      }),
      invalidatesTags: ['Review'],
    }),
    deleteReview: builder.mutation<string, number>({
      query: id => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
})
