import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";

export const actSignUp = createAsyncThunk(({role = "User"}) =>
    `auth/actSignUp/${role}`,async ({role = "User",email,password,confirmPassword,firstName,lastName,gender},thunkAPI) =>{
    const {rejectWithValue} = thunkAPI
    try {
        const endpoint = role === "User" ? "User/signUp" : "User/signUpAdmin"
        const response = await request(endpoint,"POST",{
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