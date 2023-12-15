import { IBaseFilter } from './../../types/types'
import { ISuccessResponse } from '../../types/types'
import { apiSlice } from '../appApi'
import { ICreateReview, IReviewResponse, IReviewsResponse } from './types'

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getReviews: builder.query<
      ISuccessResponse<IReviewsResponse>,
      Partial<IBaseFilter> & { productId: string }
    >({
      query: filter => ({
        url: `/review/${filter.productId}`,
        params: {
          sort: filter?.sort,
          page: filter?.page,
          limit: filter?.limit,
          fields: filter?.fields,
        },
      }),
      providesTags: ['Review'],
    }),

    createReview: builder.mutation<
      ISuccessResponse<IReviewResponse>,
      ICreateReview
    >({
      query: review => ({
        url: `/review/${review.productId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { rating: review.rating, review: review.review },
      }),
      invalidatesTags: ['Review'],
    }),

    updateMyReview: builder.mutation<
      ISuccessResponse<{ review: IReviewResponse }>,
      ICreateReview
    >({
      query: review => ({
        url: `review/updateMyReview/${review.productId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { rating: review.rating, review: review.review },
      }),
      invalidatesTags: ['Review'],
    }),

    deleteMyReview: builder.mutation<ISuccessResponse<null>, string>({
      query: productID => ({
        url: `review/deleteMyReview/${productID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateMyReviewMutation,
  useDeleteMyReviewMutation,
} = reviewApi
