import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";

const actAddCategory = createAsyncThunk(
  "categories/actAddCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      await request("add/category","POST",categoryData,)
      return categoryData
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actAddCategory;
