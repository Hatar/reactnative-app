import { configureStore } from '@reduxjs/toolkit';
import categories from "./slices/category/categorySlice"
import foods from "./slices/food/foodSlice"
import generals from "./slices/General/generalSlice"
import carts from "./slices/cart/cartSlice"
import auth from "./slices/auth/authSlice"
import admin from "./slices/admin/adminSlice.js"

export const store = configureStore({
  reducer: {
    auth,
    admin,
    categories,
    foods,
    generals,
    carts
  },
});
