import { createSlice } from '@reduxjs/toolkit';
import { actSignIn } from './act/actSignIn';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actSignUp } from './act/actSignUp';

const initialState = {
  user: null,
  token:null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) =>{
      AsyncStorage.removeItem("token")
      state.token=null
      state.role=null
    },
    setUserInfo:(state) =>{
      state.user=state
    },
    clearStateAuth:(state) =>{
      state.user=null,
      state.error=null,
      state.role=null
    }
  },
  extraReducers: (builder) =>{

    // signIn
    builder.addCase(actSignIn.pending,(state)=>{
      state.loading=true
    }),
    builder.addCase(actSignIn.fulfilled,(state,action) =>{
      state.token= action.payload.token
      state.role = action.payload ? jwtDecode(action.payload.token).role :null
      state.error = null
      state.loading=false

    })
    builder.addCase(actSignIn.rejected,(state,action) =>{
      state.error = action.payload
      state.loading=false
    })

    // SignUp
    builder.addCase(actSignUp.pending,(state) =>{
      state.loading = true
    })
    builder.addCase(actSignUp.fulfilled,(state,action) =>{
      state.user = action?.meta?.arg
      state.loading=false
      state.error =null
    })
    builder.addCase(actSignUp.rejected,(state,action) =>{
      state.error = action.payload
      state.loading=false
    })
  }
});

export {actSignIn,actSignUp}
export const {clearStateAuth,signOut} = authSlice.actions

export default authSlice.reducer;
