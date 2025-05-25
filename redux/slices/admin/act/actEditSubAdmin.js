import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";

const actEditSubAdmin = createAsyncThunk(
  "admin/actEditSubAdmin",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await request(
        `User/updateAdmin/${adminData.userId}`,
        "PUT",
        {
            firstName:adminData.firstName,
            lastName:adminData.lastName,
            email:adminData.email
        }
    )
    return  {
      ...response,
      user: {
        ...response.user,
        userId: adminData.userId
      }
    };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actEditSubAdmin;
