import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";

const actApiPayment = createAsyncThunk(
  "carts/actApiPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response =  await request("payments/intents","POST",data)
      return response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actApiPayment;
