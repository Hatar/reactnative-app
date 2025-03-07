import { createSlice } from "@reduxjs/toolkit";
import actAddFood from "./act/actAddFoods"
import actGetFoods from "./act/actGetFoods"
import actDeleteFood from "./act/actDeleteFood"
import actEditFood from "./act/actEditFood"


const initialState = {
    foods:[],
    tabName:"all",
    loading:"adle",
    error:null
}

const foodSlice = createSlice({
    name:"food",
    initialState,
    reducers:{
        toggleTabName: (state,action) =>{
            state.tabName = action.payload
        }
    },
    extraReducers: (builder) => {


        // get foods
        builder.addCase(actGetFoods.pending,(state) =>{
            state.loading ="pending",
            state.errror=null
        }),
        builder.addCase(actGetFoods.fulfilled,(state,action) =>{
            state.loading="succeeded",
            state.foods = [
                ...new Map(action.payload.map((food) => [food.id, food])).values(),
            ];
              
        }),
        builder.addCase(actGetFoods.rejected,(state,action) =>{
            state.loading="failed"
            if(action.payload && action.payload=== "string") {
                state.errror = action.payload
            }
        })

        // handle Add Food
        builder.addCase(actAddFood.pending, (state) => {
            state.loading = "pending"
            state.errror=null
        }),
        builder.addCase(actAddFood.fulfilled, (state, action) => {
            state.loading = "succeeded";
            const foodExists = state.foods.some((food) => food.id === action.payload.id)
            if (!foodExists) {
                state.foods = [...state.foods, action.payload];
            }
        }),
        builder.addCase(actAddFood.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.errror = action.payload;
            }
        })

        // edit Food
        builder.addCase(actEditFood.pending, (state) => {
            state.loading = "pending"
            state.errror=null
        }),

        builder.addCase(actEditFood.fulfilled, (state, action) => {
            state.loading = "succeeded";
            const index = state.foods.findIndex((food) => food.id === action.payload.id);
            if (index !== -1) {
                state.foods[index] = action.payload;
            }
        })
        builder.addCase(actEditFood.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.errror = action.payload;
            }
        })


        // delete food
        builder.addCase(actDeleteFood.pending, (state) => {
            state.loading = "pending";
        });
        builder.addCase(actDeleteFood.fulfilled, (state, action) => {
            state.loading = "succeeded";
            const index = state.foods.findIndex((food) => food.id === action.payload.id);
            if (index !== -1) {
                state.foods.splice(index, 1)
            }
        });
        builder.addCase(actDeleteFood.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof action.payload === "string") {
                state.errror = action.payload;
            }
        });
    }
})

export {actAddFood,actGetFoods,actDeleteFood,actEditFood}
export const {toggleTabName} = foodSlice.actions
export default foodSlice.reducer