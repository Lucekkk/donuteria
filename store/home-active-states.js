import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
 active: 0,
 prevActive: 0
}

const homePageSlice = createSlice({
 name: 'active',
 initialState: initialValue,
 reducers: {
    setActiveSlice(state, action){
        state.active = action.payload;
    },
    setPrevActiveSlice(state, action){
        state.prevActive = action.payload;
    }

 }

})

export const homeActions = homePageSlice.actions;
export default homePageSlice.reducer