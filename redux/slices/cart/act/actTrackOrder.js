import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";

const actTrackOrder = createAsyncThunk(
  "carts/actTrackOrder",
  async ({ items, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await request("/order", "POST", { items, paymentMethod });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actTrackOrder;