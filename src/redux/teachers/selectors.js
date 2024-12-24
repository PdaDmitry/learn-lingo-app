import { createSelector } from '@reduxjs/toolkit';

export const selectTeachers = state => state.teachers.items;

export const selectTeachersById = id =>
  createSelector(
    [selectTeachers], // array of all Teachers
    teachers => teachers.find(teacher => teacher.id === id) // Looking for a Teacher by ID
    // teachers => {
    //   if (!teachers || teachers.length === 0) return null; // Переход к null, если нет учителей
    //   return teachers.find(teacher => teacher.id === id);
    // }
  );

// export const selectTeachersById = id =>
//   createSelector(
//     [selectTeachers], // array of all Teachers
//     teachers => {
//       // Regular expression to match the format of user IDs like hSzMUqvIQmV64E3JaD93lD4OFKG3
//       const userIdPattern = /^[a-zA-Z0-9]{28}$/;

//       // Find a teacher whose ID does not match the user ID pattern and matches the given ID
//       return teachers.find(teacher => !userIdPattern.test(teacher.id) && teacher.id === id);
//     }
//   );
