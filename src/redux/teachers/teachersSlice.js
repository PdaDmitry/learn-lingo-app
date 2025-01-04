import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFavoriteTeachers,
  fetchTeacherForId,
  fetchTeachersThunc,
  toggleFavoriteTeacher,
} from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  favorites: [],
  teacherForId: [],
  perPage: 4,
  total: 0,
  maxPage: 1,
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
      .addCase(fetchTeachersThunc.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeachersThunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || [];
        // state.teacherForById = action.payload;
        state.total = state.items.length;
        state.maxPage = Math.ceil(state.total / state.perPage);
      })
      .addCase(fetchTeachersThunc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
        state.isError = true;
      })

      //ForId
      .addCase(fetchTeacherForId.pending, state => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTeacherForId.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.teacherById = action.payload;
        state.teacherForId = action.payload || [];
      })
      .addCase(fetchTeacherForId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Something went wrong';
        state.isError = true;
      })

      //
      .addCase(toggleFavoriteTeacher.pending, state => {
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
        state.isError = true;
      })

      //
      .addCase(fetchFavoriteTeachers.pending, state => {
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
        state.isError = true;
      });
  },
});

export const { clearFavorites } = teachersSlice.actions;
export const teacherReducer = teachersSlice.reducer;
