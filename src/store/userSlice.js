import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userCrr = cookies.get('currUser')
const isLogin = userCrr !== undefined;

console.log(userCrr);
console.log(isLogin);

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    onLogin: isLogin,
    currUser: userCrr,
  },
  reducers: {
    login: (state, payload) => {
      state.onLogin = true;
      state.currUser = payload.payload
    },
    logout: (state) => {
      state.onLogin = false;
    }
  }
});

const { reducer, actions } = userSlice;
export const { login, logout } = userSlice.actions;

export default reducer;