import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import categories from "./slices/category/categorySlice"
import foods from "./slices/food/foodSlice"
import generals from "./slices/General/generalSlice"
export const store = configureStore({
  reducer: {
    auth,
    categories,
    foods,
    generals
  },
});
