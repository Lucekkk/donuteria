import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '@/store/shopping-cart-slice';
import authReducer from "@/store/auth-slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
