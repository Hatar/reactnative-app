import { createSlice } from "@reduxjs/toolkit";



const initialState= {
    isModalVisible:false,
    itemModal:null,
    typeModal:""
}

const generalSlice = createSlice({
    name:"generals",
    initialState,
    reducers:{
        toggleDisplayModal: (state, action) => {
            state.isModalVisible = !state.isModalVisible;
            if (action.payload) {
                state.typeModal = action.payload.typeModal;
                state.itemModal = action.payload.itemModal;
            } else {
                state.typeModal = null;
                state.itemModal = null;
            }
        },
    }
})
export const {toggleDisplayModal} = generalSlice.actions

export default generalSlice.reducer