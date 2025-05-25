import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
const actDeleteFood = createAsyncThunk(
  "foods/actDeleteFood",
  async ({foodId,categoryId}, { rejectWithValue }) => {
    try {
      await request(`deleteFood/${foodId}/${categoryId}`,"DELETE")
      return foodId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export default actDeleteFood;


