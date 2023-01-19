import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
  reducer: { cartSlice },
});
store.subscribe(() => {
  let newState = store.getState().cartSlice;

  localStorage.setItem("cart", JSON.stringify(newState));
});
export default store;
