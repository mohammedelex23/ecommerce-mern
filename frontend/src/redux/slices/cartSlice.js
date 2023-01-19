import { createSlice } from "@reduxjs/toolkit";

let cart = localStorage.getItem("cart");

if (cart) {
  try {
    cart = JSON.parse(cart);
  } catch (error) {
    console.log(error);
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    total: cart ? cart.total : 0,
    cartItems: cart ? cart.cartItems : [],
    itemsCount: cart ? cart.itemsCount : 0,
  },
  reducers: {
    fillCartItems: (state, action) => {
      if (!Array.isArray(action.payload)) {
        state.total = action.payload.total;
        state.cartItems = action.payload.cartItems;
        state.itemsCount = action.payload.itemsCount;
      } else {
        state.cartItems = action.payload.map((product) => {
          return {
            ...product,
            qty: 1,
            inCart: false,
          };
        });
      }
    },
    addToCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.inCart = true;
        }
        return item;
      });
      // update total
      state.itemsCount++;
      state.total = state.cartItems.reduce((a, item) => {
        if (item.inCart) {
          return a + item.price * item.qty;
        }
        return a;
      }, 0);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.inCart = false;
          item.qty = 1;
        }
        return item;
      });
      // update total
      state.itemsCount--;
      state.total = state.cartItems.reduce((a, item) => {
        if (item.inCart) {
          return a + item.price * item.qty;
        }
        return a;
      }, 0);
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
      state.cartItems = state.cartItems.map((item) => {
        if (item._id === action.payload) {
          item.qty++;
        }
        return item;
      });
      state.total = state.cartItems.reduce((a, item) => {
        if (item.inCart) {
          return a + item.price * item.qty;
        }
        return a;
      }, 0);
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
      state.total = state.cartItems.reduce((a, item) => {
        if (item.inCart) {
          return a + item.price * item.qty;
        }
        return a;
      }, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateTotal,
  fillCartItems,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;
export const selectCart = (state) => state.cartSlice;
export const selectItemInCart = (id) => (state) => {
  let item = state.cartSlice.cartItems.find((item) => item._id === id);
  return item?.inCart;
};
export const selectItemQty = (id) => (state) => {
  let item = state.cartSlice.cartItems.find((item) => item._id === id);
  return item?.qty;
};
export const slelectProduct = (id) => (state) => {
  return state.cartSlice.cartItems.filter((item) => item._id === id)[0];
};

export default cartSlice.reducer;
