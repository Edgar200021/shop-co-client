import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IUserResponse,
  IUserRequest,
  IRegisterResponse,
  IAccountVerificationRequest,
} from './types'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/auth',
  }),
  endpoints: builder => ({
    register: builder.mutation<IRegisterResponse, IUserRequest>({
      query: body => ({
        url: '/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    login: builder.mutation<
      { user: IUserResponse },
      Omit<IUserRequest, 'name'>
    >({
      query: body => ({
        url: '/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    accountVerification: builder.mutation<
      IRegisterResponse,
      IAccountVerificationRequest
    >({
      query: body => ({
        url: '/verify-email',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'DELETE',
      }),
    }),
  }),
})
