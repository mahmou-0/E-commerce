import { configureStore } from "@reduxjs/toolkit";
import CartReuccer from "./redux/CartReduccer";

const store = configureStore({
  reducer: {
    user: CartReuccer,
    // Other reducers go here
  },
});

export default store;
