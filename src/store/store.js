import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlise'
export const store = configureStore({
  reducer: categoryReducer,
})