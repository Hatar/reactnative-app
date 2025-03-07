import { configureStore } from '@reduxjs/toolkit';
import categories from "./slices/category/categorySlice"
import foods from "./slices/food/foodSlice"
import generals from "./slices/General/generalSlice"
import carts from "./slices/cart/cartSlice"
import auth from "./slices/auth/authSlice"
export const store = configureStore({
  reducer: {
    auth,
    categories,
    foods,
    generals,
    carts
  },
});
