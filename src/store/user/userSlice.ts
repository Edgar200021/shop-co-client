import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../auth/types'

interface UserInitialState {
  user: IUser | null
}

const initialState: UserInitialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    deleteUser(state) {
      state.user = null
    },
  },
})

export const { addUser, deleteUser } = userSlice.actions
export default userSlice.reducer
