import { configureStore } from "@reduxjs/toolkit";
import CartReduccer from "./redux/CartReduccer";
import FavoriteReducer from "./redux/FavoriteReducer";

export default configureStore({
  reducer: {
    cart: CartReduccer,
    favorites: FavoriteReducer,
  },
});
