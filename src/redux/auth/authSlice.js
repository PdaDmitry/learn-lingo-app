import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  registerUser,
  updateTheme,
  updateUserFilters,
} from './operationsAuth';

const handleLoaderState = state => {
  state.loader = true;
  state.error = null;
};

const handleErrorState = (state, action) => {
  state.loader = false;
  state.error = action.payload;
};

const initialState = {
  user: {
    localId: null,
    name: null,
    email: null,
    theme: null,
    filters: {
      language: '',
      level: '',
      price: '',
    },
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
      .addCase(registerUser.pending, handleLoaderState)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user.localId = action.payload.localId;
        state.user.name = action.payload.name || null;
        state.user.email = action.payload.email;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.user.filters = action.payload.filters;
      })
      .addCase(registerUser.rejected, handleErrorState)

      // Log Out
      .addCase(logoutUser.pending, handleLoaderState)
      .addCase(logoutUser.fulfilled, state => {
        state.loader = false;
        state.user = { localId: null, name: null, email: null };
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, handleErrorState)

      // Log In
      .addCase(loginUser.pending, handleLoaderState)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loader = false;
        state.user.localId = action.payload.localId;
        state.user.email = action.payload.email;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.user.theme = action.payload.theme;
        state.user.filters = action.payload.filters;
      })
      .addCase(loginUser.rejected, handleErrorState)

      //updateTheme
      .addCase(updateTheme.pending, handleLoaderState)
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loader = false;
        state.user.theme = action.payload;
      })
      .addCase(updateTheme.rejected, handleErrorState)

      //updateUserFilters
      .addCase(updateUserFilters.pending, handleLoaderState)
      .addCase(updateUserFilters.fulfilled, (state, action) => {
        state.loader = false;
        state.user.filters = action.payload;
      })
      .addCase(updateUserFilters.rejected, handleErrorState);
  },
});

export const authReducer = authSlice.reducer;
