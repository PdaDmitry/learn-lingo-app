import { createSelector } from '@reduxjs/toolkit';

export const selectTeachers = state => state.teachers.items;

export const selectTeachersById = id =>
  createSelector(
    [selectTeachers], // array of all Teachers
    teachers => teachers.find(teacher => teacher.id === id) // Looking for a Teacher by ID
  );
