import { createSelector } from '@reduxjs/toolkit';

export const selectTeachers = state => state.teachers.items;
export const selectTeacherForId = state => state.teachers.teacherForId;
export const selectIsLoading = state => state.teachers.isLoading;
export const selectFavoriteTeachers = state => state.teachers.favorites;
export const selectTeachersById = id =>
  createSelector([selectTeacherForId], teachers => teachers.find(teacher => teacher.id === id));

export const selectFavoriteTeacherById = id =>
  createSelector(
    [selectFavoriteTeachers],
    favorites => favorites.find(fav => fav.id === id) || null
  );

export const selectTotal = state => state.teachers.total;
export const selectMaxPage = state => state.teachers.maxPage;
export const selectPerPage = state => state.teachers.perPage;
