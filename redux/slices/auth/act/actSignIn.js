import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../../apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const actSignIn = createAsyncThunk("auth/SignIn",async ({email,password},thunkAPI) =>{
    const {rejectWithValue} = thunkAPI 
    try {
        const response = await request("User/signin","POST",{email,password})
        if(response.token) {
            await AsyncStorage.setItem("token",response.token)
            await AsyncStorage.setItem("userEmail", email)
            return { ...response, email }
        }
    } catch (error) {
        return rejectWithValue(error)
    }
})