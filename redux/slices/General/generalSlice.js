import { createSlice } from "@reduxjs/toolkit";



const initialState= {
    isModalVisible:false,
    itemModal:null,
    typeModal:"",
    changedBehaviorModalWrapper:false,
}

const generalSlice = createSlice({
    name:"generals",
    initialState,
    reducers:{
        toggleModalWrapper: (state,action) => {
            state.isModalVisible = action.payload;
        },
        setItemModalWrapper: (state, action) => {
            if (action.payload) {
                state.typeModal = action.payload.typeModal;
                state.itemModal = action.payload.itemModal;
            } else {
                state.typeModal = null;
                state.itemModal = null;
            }
        },
        setChangedBehaviorModalWrapper: (state) => {
            state.changedBehaviorModalWrapper = !state.changedBehaviorModalWrapper
        },

    }
})
export const {toggleModalWrapper,setItemModalWrapper,setChangedBehaviorModalWrapper} = generalSlice.actions

export default generalSlice.reducer