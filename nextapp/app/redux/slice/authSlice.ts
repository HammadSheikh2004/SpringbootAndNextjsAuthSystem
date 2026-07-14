import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  userId: null,
  registrationId: null,
  token: null,
  role: null,
  userName: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.registrationId = action.payload.registrationId;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    setUser: (state, action) => {
      state.registrationId = action.payload.registrationId;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    logout: state => {
      state.email = null;
      state.userId = null;
      state.registrationId = null;
      state.role = null;
      state.userName = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { loginSuccess, logout, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
