import { createSlice } from '@reduxjs/toolkit';
import {
  fetchFavoriteTeachers,
  fetchTeacherForId,
  fetchTeachersThunc,
  toggleFavoriteTeacher,
} from './operations';

const handleIsLoadingState = state => {
  state.isLoading = true;
  state.isError = false;
};

const handleIsErrorState = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload || 'Something went wrong';
  // state.isError = true;
};

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
      .addCase(fetchTeachersThunc.pending, handleIsLoadingState)
      .addCase(fetchTeachersThunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || [];
        // state.teacherForById = action.payload;
        state.total = state.items.length;
        state.maxPage = Math.ceil(state.total / state.perPage);
      })
      .addCase(fetchTeachersThunc.rejected, handleIsErrorState)

      //ForId
      .addCase(fetchTeacherForId.pending, handleIsLoadingState)
      .addCase(fetchTeacherForId.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.teacherById = action.payload;
        state.teacherForId = action.payload || [];
      })
      .addCase(fetchTeacherForId.rejected, handleIsErrorState)

      //
      .addCase(toggleFavoriteTeacher.pending, handleIsLoadingState)
      .addCase(toggleFavoriteTeacher.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(toggleFavoriteTeacher.rejected, handleIsErrorState)

      //
      .addCase(fetchFavoriteTeachers.pending, handleIsLoadingState)
      .addCase(fetchFavoriteTeachers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteTeachers.rejected, handleIsErrorState);
  },
});

export const { clearFavorites } = teachersSlice.actions;
export const teacherReducer = teachersSlice.reducer;
