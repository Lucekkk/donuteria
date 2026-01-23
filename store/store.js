import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "@/store/home-active-states";
import authReducer from "@/store/auth-slice";

export const store = configureStore({
  reducer: {
    homeActive: homeReducer,
    auth: authReducer,
  },
});

export default store;
