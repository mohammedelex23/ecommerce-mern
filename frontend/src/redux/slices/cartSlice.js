import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: 0,
    cartItems: [],
    itemsCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      let product = action.payload;
      // add item to cartitems
      product = {
        ...product,
        qty: 1,
      };
      state.cartItems.push(product);

      // increase items on cart
      state.itemsCount++;
      // update total amount
      state.total = calculateTotal(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      // update total
      state.total = calculateTotal(state.cartItems);
      // update itemsCount
      state.itemsCount--;
    },
    updateTotal: (state, action) => {
      state.total = state.cartItems.reduce((a, item) => {
        if (item._id === action.payload._id) {
          return a + item.price * action.payload.qty;
        } else {
          return a + item.price * item.qty;
        }
      }, 0);
    },
    increaseQty: (state, action) => {
      let product = action.payload;
      // check product in cart items
      if (state.cartItems.find((item) => item._id === product._id)) {
        // if product found update it
        state.cartItems = state.cartItems.map((item) => {
          if (item._id === product._id) {
            item.qty++;
          }
          return item;
        });
      } else {
        // if product not found create it
        product = {
          ...product,
          qty: 2,
        };
        state.cartItems.push(product);
        // update items count
        state.itemsCount++;
      }
      // update total
      state.total = calculateTotal(state.cartItems);
    },
    decreaseQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          if (item.qty > 1) {
            item.qty--;
          }
        }
        return item;
      });
      // update total
      state.total = calculateTotal(state.cartItems);
    },
    initializeCart: (state, action) => {
      let cart = localStorage.getItem("cart");
      if (cart) {
        try {
          cart = JSON.parse(cart);
          state.total = cart.total;
          state.cartItems = cart.cartItems;
          state.itemsCount = cart.itemsCount;
        } catch (error) {
          console.log(error);
        }
      } else {
        state.total = 0;
        state.cartItems = [];
        state.itemsCount = 0;
      }
    },
    clearCart: (state, action) => {
      state.total = 0;
      state.cartItems = [];
      state.itemsCount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateTotal,
  increaseQty,
  decreaseQty,
  initializeCart,
  clearCart,
} = cartSlice.actions;
export const selectCart = (state) => state.cartSlice;
export const selectItemInCart = (id) => (state) => {
  let item = state.cartSlice.cartItems.find((item) => item._id === id);

  return !!item;
};
export const selectItemQty = (id) => (state) => {
  let item = state.cartSlice.cartItems.find((item) => item._id === id);
  return item?.qty;
};

export default cartSlice.reducer;

function calculateTotal(cartItems) {
  let total = cartItems.reduce((a, item) => {
    return a + item.price * item.qty;
  }, 0);
  return total;
}
