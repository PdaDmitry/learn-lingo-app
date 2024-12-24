import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, registerUser } from './operationsAuth';

const initialState = {
  user: {
    localId: null,
    name: null,
    email: null,
    favorites: [],
  },
  refreshToken: null,
  isLoggedIn: false,
  loader: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      // Register User
      .addCase(registerUser.pending, (state, action) => {
        state.loader = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user.localId = action.payload.localId;
        state.user.name = action.payload.name || null;
        state.user.email = action.payload.email;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Log Out
      .addCase(logoutUser.pending, state => {
        state.loader = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loader = false;
        state.user = { localId: null, name: null, email: null };
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      // Log In
      .addCase(loginUser.pending, state => {
        state.loader = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user.localId = action.payload.localId;
        state.user.email = action.payload.email;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
