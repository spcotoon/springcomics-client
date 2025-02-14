
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  displayName: '',
  authority: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.authority = action.payload.authority;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.email = '';
      state.displayName = '';
      state.authority = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
