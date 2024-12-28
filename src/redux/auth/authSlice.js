import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  registerUser,
  updateTheme,
  updateUserFilters,
} from './operationsAuth';
// import { clearFavorites } from '../teachers/teachersSlice';

const initialState = {
  user: {
    localId: null,
    name: null,
    email: null,
    theme: null,
    filters: {
      language: '', // Начальные значения фильтров
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
        // dispatch(clearFavorites());
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
        state.user.theme = action.payload.theme; //////////////
        state.user.filters = action.payload.filters;
        // state.user.language = action.payload.filters.language;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      })

      //updateTheme
      .addCase(updateTheme.pending, state => {
        state.loader = true; // Статус загрузки
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loader = false;
        state.user.theme = action.payload; // Обновляем тему пользователя
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload; // Обрабатываем ошибку
      })

      //updateUserFilters
      .addCase(updateUserFilters.pending, state => {
        state.loader = true; // Статус загрузки
        state.error = null;
      })
      .addCase(updateUserFilters.fulfilled, (state, action) => {
        state.loader = false;
        state.user.filters = action.payload;
      })
      .addCase(updateUserFilters.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload; // Обрабатываем ошибку
      });
  },
});

export const authReducer = authSlice.reducer;
