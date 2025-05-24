import { createSlice } from '@reduxjs/toolkit';
import { actSignIn } from './act/actSignIn';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { actSignUp } from './act/actSignUp';

const initialState = {
  user: null,
  token: null,
  role: null,
  email: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      AsyncStorage.removeItem("token")
      AsyncStorage.removeItem("userEmail")
      state.token = null
      state.role = null
      state.email = null
      state.isAuthenticated = false
    },
    setUserInfo: (state) => {
      state.user = state
    },
    clearStateAuth: (state) => {
      state.user = null,
      state.error = null,
      state.role = null,
      state.email = null,
      state.isAuthenticated = false
    },
    setTypeRole: (state, action) => {
      state.role = action.payload
    },
    restoreAuthState: (state, action) => {
      state.token = action.payload.token
      state.role = action.payload.role
      state.email = action.payload.email
      state.isAuthenticated = true
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // signIn
    builder.addCase(actSignIn.pending, (state) => {
      state.loading = true
    }),
    builder.addCase(actSignIn.fulfilled, (state, action) => {
      state.token = action.payload.token
      state.email = action.payload.email
      if (action.payload && action.payload.token) {
        state.role = action.payload ? jwtDecode(action.payload.token).role : null
        state.isAuthenticated = true
      }
      state.error = null
      state.loading = false
    })
    builder.addCase(actSignIn.rejected, (state) => {
      state.error = "Network request failed"
      state.loading = false
      state.isAuthenticated = false
    })

    // SignUp
    builder.addCase(actSignUp.pending, (state) => {
      state.loading = true
    })
    builder.addCase(actSignUp.fulfilled, (state, action) => {
      state.user = action?.meta?.arg
      state.loading = false
      state.error = null
    })
    builder.addCase(actSignUp.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  }
});

export { actSignIn, actSignUp }
export const { clearStateAuth, signOut, setTypeRole, restoreAuthState } = authSlice.actions
export default authSlice.reducer
