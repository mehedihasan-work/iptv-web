import { createSlice } from "@reduxjs/toolkit";

type TAuthData = {
  baseUrl: string;
  username: string;
  password: string;
  isLoggedIn: boolean;
};

const initialState: TAuthData = {
  baseUrl: "",
  username: "",
  password: "",
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { baseUrl, username, password } = action.payload;
      state.baseUrl = baseUrl;
      state.username = username;
      state.password = password;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.baseUrl = "";
      state.username = "";
      state.password = "";
    },
  },
});

export const { setUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
