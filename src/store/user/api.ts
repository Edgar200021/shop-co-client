import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUpdatePasswordRequest, IUpdateUserRequest } from './types'
import { IUserResponse } from '../auth/types'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/users',
  }),
  endpoints: builder => ({
    showMe: builder.query<{user:IUserResponse}, ''>({
      query: () => ({
        url: '/showMe',
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: '/',
      }),
    }),

    updateUser: builder.mutation<{ msg: string }, IUpdateUserRequest>({
      query: body => ({
        url: '/updateUser',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),

    updatePassword: builder.mutation<{ msg: string }, IUpdatePasswordRequest>({
      query: body => ({
        url: '/updateUserPassword',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    deleteUser: builder.mutation<{ msg: string }, number>({
      query: id => ({
        url: `/:${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
