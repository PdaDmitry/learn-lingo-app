import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachersThunc } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
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
        state.items = action.payload.items;
      })
      .addCase(fetchTeachersThunc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
      });
  },
});

export const teacherReducer = teachersSlice.reducer;
