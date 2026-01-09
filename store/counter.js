import { createSlice } from "@reduxjs/toolkit";

const initialValue = {value: 0};

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialValue,
    reducers:{
        increment(state){
            state.value++;
        },
        decrement(state){
            state.value--;
        }
    }
})

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;