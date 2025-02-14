import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  displayName: '',
  authority: '',
  isLoggedIn: false, 
};

const artistSlice = createSlice({
  name: 'artist',
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

export const { login, logout } = artistSlice.actions;
export default artistSlice.reducer;
