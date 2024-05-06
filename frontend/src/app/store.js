import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/authSlice';
import { productSlice } from '../features/product/productSlice';
import { cartSlice } from '../features/cart/cartSlice';


export const store = configureStore({
  reducer: {
   auth: authSlice.reducer,//use authSlice.reducer here
   product: productSlice.reducer,
   cart: cartSlice.reducer,
   devtools: true
  },
});
