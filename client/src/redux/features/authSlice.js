import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      //state.user = null;
      window.location.href = "/login";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
