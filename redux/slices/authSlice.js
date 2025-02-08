import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAdminAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;

      // Check if the user is an admin (assuming `role` is part of user data)
      state.isAdminAuthenticated = action.payload.role === 'admin';
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = null;
      state.isAdminAuthenticated = false; // Reset admin authentication
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
