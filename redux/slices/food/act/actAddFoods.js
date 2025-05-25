import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
const actAddFood = createAsyncThunk(
  "foods/actAddFood",
  async (foodData, { rejectWithValue }) => {
    try {
      const response = await request("Admin/addFood", "POST", foodData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actAddFood;
