import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";

export const actSignUp = createAsyncThunk("auth/actSignUp",async ({email,password,confirmPassword,firstName,lastName,gender},{rejectWithValue}) =>{
    try {
        const response = await request("User/signin","POST",{email,password,confirmPassword,firstName,lastName,gender})
        if(response) {
            return response
        }
        return rejectWithValue("Invalid Credentials")
    } catch (error) {
        return rejectWithValue(error.message)
    }
})