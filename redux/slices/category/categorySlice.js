import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import actAddCategory from "./act/actAddCategory";
import actEditCategory from "./act/actEditCategory";
import actDeleteCategory from "./act/actDeleteCategory";

const initialState = {
    categories:[],
    loading:"adle",
    error: null
}

const categorySlice = createSlice({
    name:"categories",
    initialState,
    reducers:{},
    extraReducers: (builder) => {

        // get categories
        builder.addCase(actGetCategories.pending,(state) =>{
            state.loading ="pending",
            state.errror=null
        }),
        builder.addCase(actGetCategories.fulfilled,(state,action) =>{
            state.loading="succeeded",
            state.categories = action.payload
              
        }),
        builder.addCase(actGetCategories.rejected,(state,action) =>{
            state.loading="failed"
            if(action.payload && action.payload=== "string") {
                state.errror = action.payload
            }
        })

        // handle Add Category
        builder.addCase(actAddCategory.pending, (state) => {
            state.loading = "pending"
            state.errror=null
        }),
        builder.addCase(actAddCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
        }),
        builder.addCase(actAddCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.errror = action.payload;
            }
        })


        // edit Category
         builder.addCase(actEditCategory.pending, (state) => {
            state.loading = "pending"
            state.errror=null
        }),

        builder.addCase(actEditCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            const index = state.categories.findIndex((category) => category.categoryId === action.payload.categoryId);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        })
        builder.addCase(actEditCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.errror = action.payload;
            }
        })


        // delete category
        builder.addCase(actDeleteCategory.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(actDeleteCategory.fulfilled, (state, action) => {
            state.loading = "succeeded";
            const index = state.categories.findIndex((category) => category.categoryId === action.payload);
            if (index !== -1) {
                state.categories.splice(index, 1)
            }
        });
        builder.addCase(actDeleteCategory.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.errror = action.payload;
            }
        });
    }
})



export {actGetCategories,actAddCategory,actEditCategory,actDeleteCategory}
export default categorySlice.reducer