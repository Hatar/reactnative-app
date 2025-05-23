import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    items:[],
    total:0,
    typePayment:"",
}

const cartSlice = createSlice({
    name:"carts",
    initialState,
    reducers:{
        addItemToCart: (state,action) =>{
            const checkExistItem = state.items.find((item) => item.foodId === action.payload.foodId)
            if(checkExistItem){
                checkExistItem.quantity +=1
            } else {
                const quantity = action.payload.quantity || 1
                state.items.push({...action.payload, quantity})
            }
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },
        deleteItemFromCart:(state,action) =>{
            state.items = state.items.filter((item) => item.foodId !== action.payload.foodId)
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },
        increaseQuantity:(state,action) =>{
            const item = state.items.find((item) => item.foodId === action.payload.foodId)
            if(item) {
                item.quantity +=1
            }
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },
        decreaseQuantity:(state,action) =>{
            const item = state.items.find((item) => item.foodId === action.payload.foodId)
            if(item && item.quantity > 1) {
                item.quantity -=1
            }
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },

        setTypePayment:(state,action) =>{
            console.log("action.payload ttttt" ,action.payload);
            state.typePayment = action.payload
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            state.typePayment = "";
        }
    }
})



export const {addItemToCart,deleteItemFromCart,increaseQuantity,decreaseQuantity,setTypePayment,clearCart} = cartSlice.actions
export default cartSlice.reducer