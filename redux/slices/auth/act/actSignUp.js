import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";

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
        console.log("endpoint & res",endpoint,response)

        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})