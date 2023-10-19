import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    registerSuccess: false,
    logoutSuccess: false,
    showShippingRoute: false,
  },
  reducers: {
    showRegisterSuccess: (state, action) => {
      state.registerSuccess = true;
    },
    hideRegisterSuccess: (state, action) => {
      state.registerSuccess = false;
    },
    showLogoutSuccess: (state, action) => {
      state.logoutSuccess = true;
    },
    hideLogoutSuccess: (state, action) => {
      state.logoutSuccess = false;
    },
    showShippingRoute: (state, action) => {
      state.showShippingRoute = true;
    },
    hideShippingRout: (state, action) => {
      state.showShippingRoute = false;
    },
  },
});

export const {
  showRegisterSuccess,
  hideRegisterSuccess,
  showLogoutSuccess,
  hideLogoutSuccess,
  showShippingRoute,
  hideShippingRout,
} = utilsSlice.actions;
export const selectRegisterSuccess = (state) =>
  state.utilslSlice.registerSuccess;
export const selectLogoutSuccess = (state) => state.utilslSlice.logoutSuccess;
export const selectShowSHippingRoute = (state) =>
  state.utilslSlice.showShippingRoute;
export default utilsSlice.reducer;
