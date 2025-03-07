import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../servers/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const actSignIn = createAsyncThunk("auth/SignIn",async ({email,password},{rejectWithValue}) =>{
    try {
        const response = await request("User/signin","POST",{email,password})
        if(response.token) {
            await AsyncStorage.setItem("token",response.token)
            return response
        }
        return rejectWithValue("Invalid Credentials")
    } catch (error) {
        return rejectWithValue(error.message)
    }
})