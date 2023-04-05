import { configureStore } from "@reduxjs/toolkit";
import productReducer from './producterSlice';
import authUser from './userSlice';
import cartList from './cartSlice';

const rootReducer = {
  products: productReducer,
  auth: authUser,
  cart: cartList,
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;