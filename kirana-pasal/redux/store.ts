import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../lib/features/box/boxSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
