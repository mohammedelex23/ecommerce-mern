import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import utilslSlice from "./slices/utilsSlice";
const store = configureStore({
  reducer: { cartSlice, utilslSlice },
});
store.subscribe(() => {
  let newState = store.getState().cartSlice;
  if (newState.itemsCount === 0) {
    localStorage.removeItem("cart");
  } else {
    localStorage.setItem("cart", JSON.stringify(newState));
  }
});
export default store;
