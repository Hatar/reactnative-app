import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    try {
      const response = await request("categories")
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default actGetCategories;
