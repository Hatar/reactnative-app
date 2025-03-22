import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";
const actDeleteSubAdmin = createAsyncThunk(
  "admin/actDeleteSubAdmin",
  async (adminId, { rejectWithValue }) => {
    try {
      console.log("adminId",adminId)
      await request(`removeAdmin/${adminId}`,"DELETE")
      return adminId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export default actDeleteSubAdmin;
