import { getDatabase, ref, get } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { app } from '../../../firebase';

export const fetchTeachersThunc = createAsyncThunk('fetchTeachers', async (_, thunkAPI) => {
  try {
    const db = getDatabase(app);
    const dbReference = ref(db, '/'); // Link to database root
    const readingData = await get(dbReference);

    if (readingData.exists()) {
      const data = readingData.val();

      // We go through the data and add a unique ID, which is the Firebase key
      const teachersWithId = Object.entries(data).map(([key, value]) => {
        return {
          id: key, // Using Firebase key as ID
          ...value, // Adding the rest of the data
        };
      });

      return teachersWithId; // Sending data with ID to Redux
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const getTeacherById = async teacherId => {
//   try {
//     // Получаем доступ к базе данных Firebase
//     const db = getDatabase(app);

//     // Создаем ссылку на конкретного преподавателя по его ID
//     const teacherRef = ref(db, `/teachers/${teacherId}`); // Ссылка на конкретного преподавателя

//     // Получаем данные о преподавателе
//     const readingData = await get(teacherRef);

//     if (readingData.exists()) {
//       // Если данные есть, возвращаем их
//       return {
//         id: teacherId,
//         ...readingData.val(), // Добавляем остальные данные о преподавателе
//       };
//     } else {
//       throw new Error('Teacher not found');
//     }
//   } catch (error) {
//     console.error('Error fetching teacher by ID:', error);
//     throw error;
//   }
// };
