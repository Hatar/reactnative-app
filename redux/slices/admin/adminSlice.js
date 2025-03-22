import { createSlice } from '@reduxjs/toolkit';
import actGetListAdmin from './act/actGetListAdmin';
import actDeleteSubAdmin from './act/actDeleteSubAdmin';
import actEditSubAdmin from './act/actEditSubAdmin';

const initialState = {
  admins:[],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    // get list admins
    builder.addCase(actGetListAdmin.pending,(state) =>{
      state.loading ="pending",
      state.errror=null
    }),
    builder.addCase(actGetListAdmin.fulfilled,(state,action) =>{
        state.loading="succeeded",
        state.admins = action.payload
          
    }),
    builder.addCase(actGetListAdmin.rejected,(state,action) =>{
        state.loading="failed"
        if(action.payload && action.payload=== "string") {
            state.errror = action.payload
        }
    })

    // edit admin
    builder.addCase(actEditSubAdmin.pending, (state) => {
      state.loading = "pending"
      state.errror=null
    }),

    builder.addCase(actEditSubAdmin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.admins.findIndex((admin) => admin.userId === action.payload.userId);
        if (index !== -1) {
            state.admins[index] = action.payload;
        }
    })
    builder.addCase(actEditSubAdmin.rejected, (state, action) => {
        state.loading = "failed";
        if (typeof action.payload === "string") {
            state.errror = action.payload;
        }
    })


    // delete admin
    builder.addCase(actDeleteSubAdmin.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(actDeleteSubAdmin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const index = state.admins.findIndex((admin) => admin.userId === action.payload);
        if (index !== -1) {
            state.admins.splice(index, 1)
        }
    });
    builder.addCase(actDeleteSubAdmin.rejected, (state, action) => {
        state.loading = "failed";
        if (typeof action.payload === "string") {
            state.errror = action.payload;
        }
    });
  }
});

export {actGetListAdmin,actDeleteSubAdmin,actEditSubAdmin}
export default adminSlice.reducer;
