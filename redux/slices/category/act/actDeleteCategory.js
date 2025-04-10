import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
const actDeleteCategory = createAsyncThunk(
  "categories/actDeleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      await request(`category/${categoryId}`,"DELETE")
      return categoryId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export default actDeleteCategory;
