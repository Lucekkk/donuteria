import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "shopping_cart";

// Load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  }
  return [];
};

const initialValues = {
  cartData: {
    cart: loadCartFromStorage(),
    totalPrice: null,
    
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialValues,
  reducers: {
    addProduct: (state, action) => {
      // Check if product already exists in cart
      const existingItem = state.cartData.cart.find(
        (item) => item.idProduct === action.payload.idProduct,
      );

      if (existingItem) {
        // If product exists, increase quantity
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // Add new product with quantity 1
        state.cartData.cart.push({ ...action.payload, quantity: 1 });
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(state.cartData.cart),
          );
        } catch (error) {
          console.error("Error saving cart to localStorage:", error);
        }
      }
    },
    removeProduct: (state, action) => {
      // Remove product by id
      state.cartData.cart = state.cartData.cart.filter(
        (item) => item.idProduct !== action.payload,
      );

      // Save to localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(state.cartData.cart),
          );
        } catch (error) {
          console.error("Error saving cart to localStorage:", error);
        }
      }
    },
    updateQuantity: (state, action) => {
      const { idProduct, symbol } = action.payload;
      const item = state.cartData.cart.find(
        (item) => item.idProduct === idProduct,
      );

       
        if(symbol === 'minus'){
            if (item.quantity > 1) {
                item.quantity--;
            // Remove item if quantity is 0 
            
            } else {
                state.cartData.cart = state.cartData.cart.filter(
                    (item) => item.idProduct !== idProduct,
                );
            }
        }else if(symbol === 'plus'){
            item.quantity++;
        }
        // Save to localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              CART_STORAGE_KEY,
              JSON.stringify(state.cartData.cart),
            );
          } catch (error) {
            console.error("Error saving cart to localStorage:", error);
          }
        }
     
    },
    updateTotalPrice:(state, action) => {
        state.cartData.totalPrice = action.payload;
        
    }
    
 
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
