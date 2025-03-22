import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";
const actGetListAdmin = createAsyncThunk(
  "admin/actGetListAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await request("User/getAllAdmins")
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default actGetListAdmin;
