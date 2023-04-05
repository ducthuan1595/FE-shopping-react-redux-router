import { createSlice } from "@reduxjs/toolkit";


const userCurr = JSON.parse(localStorage.getItem('userCrr'));
console.log(userCurr)
const check = userCurr !== null;

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    onLogin: check,
  },
  reducers: {
    login: (state) => {
      state.onLogin = !state.onLogin;
    },
    
  }
});

const { reducer, actions } = userSlice;
export const { login } = userSlice.actions;

export default reducer;