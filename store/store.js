import { configureStore } from "@reduxjs/toolkit";
import homeReducer from  "@/store/home-active-states";

export const store = configureStore({
    reducer:{
        homeActive: homeReducer
    }
})

export default store;