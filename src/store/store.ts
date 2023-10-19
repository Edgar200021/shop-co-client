import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './products/api'
import { authApi } from './auth/api'
import { userApi } from './user/api'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { addressApi } from './address/api'
//import { userReducer } from './user/slice'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      addressApi.middleware
    ),
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
