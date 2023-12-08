import { configureStore } from "@reduxjs/toolkit";
import CartReduccer from "./redux/CartReduccer";

export default configureStore({
  reducer: {
    cart: CartReduccer,
  },
});
