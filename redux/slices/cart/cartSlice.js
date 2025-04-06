import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    items:[
        {
            id: 1,
            title: "Margherita Pizza",
            image: "https://via.placeholder.com/150",
            price: 10,
            quantity: 5
        }
    ],
    typePayment:"",
    total:50
}

const cartSlice = createSlice({
    name:"carts",
    initialState,
    reducers:{
        addItemToCart: (state,action) =>{
            const checkExistItem = state.items.find((item) => item.id === action.payload.id)
            if(checkExistItem){
                checkExistItem.quantity +=1
            } else {
                state.items.push({...action.payload,quantity:1})
            }
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },
        deleteItemFromCart:(state,action) =>{
            state.items = state.items.filter((item) => item.id !== action.payload.id)
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },
        increaseQuantity:(state,action) =>{
            const item = state.items.find((item) => item.id === action.payload.id)
            if(item) {
                item.quantity +=1
            }
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },
        decreaseQuantity:(state,action) =>{
            const item = state.items.find((item) => item.id === action.payload.id)
            if(item && item.quantity > 1) {
                item.quantity -=1
            }
            state.total = state.items.reduce((sum,item) =>sum+item.price * item.quantity,0)
        },

        setTypePayment:(state,action) =>{
            state.typePayment = action.payload
        },
    }
})



export const {addItemToCart,deleteItemFromCart,increaseQuantity,decreaseQuantity,setTypePayment} = cartSlice.actions
export default cartSlice.reducer