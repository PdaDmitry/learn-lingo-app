import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './operationsAuth';

const initialState = {
  user: {
    localId: null,
    name: null,
    email: null,
  },
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user.localId = action.payload.localId;
        state.user.name = action.payload.name || null;
        state.user.email = action.payload.email;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
