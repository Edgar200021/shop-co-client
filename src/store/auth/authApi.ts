import { ISuccessResponse } from '../../types/types'
import { apiSlice } from '../appApi'
import { ISignupRequest, ISignupResponse } from './types'

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation<ISuccessResponse<ISignupResponse>, ISignupRequest>(
      {
        query: body => ({
          url: '/users/signup',
          body,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      }
    ),
    login: builder.mutation<
      ISuccessResponse<ISignupResponse>,
      Pick<ISignupRequest, 'email' | 'password'>
    >({
      query: body => ({
        url: '/users/login',
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    forgotPassword: builder.mutation<
      { status: 'success'; message: string },
      { email: string }
    >({
      query: body => ({
        url: '/users/forgotPassword',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    resetPassword: builder.mutation<
      { status: 'success'; message: string },
      { token: string; password: string; passwordConfirm: string }
    >({
      query: body => ({
        url: `/users/resetPassword/${body.token}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          password: body.password,
          passwordConfirm: body.passwordConfirm,
        },
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi
