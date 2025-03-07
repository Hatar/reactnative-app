import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";

export const actSignUp = createAsyncThunk("auth/actSignUp",async ({email,password,confirmPassword,firstName,lastName,gender},thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try {
        const response = await request("User/signUp","POST",{
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            gender
        })
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})