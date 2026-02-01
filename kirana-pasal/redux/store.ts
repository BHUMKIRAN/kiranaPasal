import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slice/counterslice'
import lengthReducer from '../lib/features/box/boxSlice'
import userReducer from '../lib/features/user/user'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    length: lengthReducer,
    user: userReducer,
  },
})

// (optional but recommended)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
