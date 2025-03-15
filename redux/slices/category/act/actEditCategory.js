import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";

const actEditCategory = createAsyncThunk(
  "categories/actEditCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await request(`category/updateCategory/${categoryData.id}`,"PUT",{nameCategory:categoryData.nameCategory})
      return response.updatedCategory
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actEditCategory;
