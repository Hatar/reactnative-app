import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import categories from "./slices/category/categorySlice"
export const store = configureStore({
  reducer: {
    auth,
    categories
  },
});
