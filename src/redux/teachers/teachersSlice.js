import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachersThunc, toggleFavoriteTeacher } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  favorites: [],
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchTeachersThunc.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeachersThunc.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.items = Object.values(action.payload);
        state.items = action.payload;
      })
      .addCase(fetchTeachersThunc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      })
      .addCase(toggleFavoriteTeacher.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(toggleFavoriteTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(toggleFavoriteTeacher.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const teacherReducer = teachersSlice.reducer;
