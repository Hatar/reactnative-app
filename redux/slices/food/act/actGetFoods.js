import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
const actGetFoods = createAsyncThunk(
  "foods/actGetFoods",
  async (_, thunkAPI) => {
    try {
      const response = await request("getAllfoods")
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default actGetFoods;
