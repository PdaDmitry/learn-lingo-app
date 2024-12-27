import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteTeachers, fetchTeachersThunc, toggleFavoriteTeacher } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  favorites: [],
};

const teachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    clearFavorites: state => {
      state.favorites = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeachersThunc.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeachersThunc.fulfilled, (state, action) => {
        state.isLoading = false;
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
      })
      .addCase(fetchFavoriteTeachers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFavoriteTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteTeachers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const { clearFavorites } = teachersSlice.actions;
export const teacherReducer = teachersSlice.reducer;
