import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './products/api'
import { authApi } from './auth/api'
import { userApi } from './user/api'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware
    ),
})
