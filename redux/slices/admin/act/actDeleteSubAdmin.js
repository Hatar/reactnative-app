import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
const actDeleteSubAdmin = createAsyncThunk(
  "admin/actDeleteSubAdmin",
  async (adminId, { rejectWithValue }) => {
    try {
      await request(`removeAdmin/${adminId}`,"DELETE")
      return adminId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export default actDeleteSubAdmin;
