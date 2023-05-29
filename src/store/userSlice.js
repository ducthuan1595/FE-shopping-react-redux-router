import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const userCrr = cookies.get('currUser');

console.log(userCrr);

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    onLogin: userCrr === undefined ? false : true,
    currUser: userCrr,
  },
  reducers: {
    login: (state, payload) => {
      state.onLogin = true;
      state.currUser = payload.payload
    },
    logout: (state) => {
      state.onLogin = false;
      state.currUser = undefined;
    }
  }
});

const { reducer, actions } = userSlice;
export const { login, logout } = userSlice.actions;

export default reducer;