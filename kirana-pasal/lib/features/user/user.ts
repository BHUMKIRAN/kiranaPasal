import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  token: string
}

const initialState: UserState = {
  name: '',
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; token: string }>
    ) => {
      state.name = action.payload.name
      state.token = action.payload.token
    },

    clearUser: (state) => {
      state.name = ''
      state.token = ''
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
