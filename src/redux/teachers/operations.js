import { getDatabase, ref, get, set } from 'firebase/database';
// import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { app } from '../../../firebase';

export const fetchTeachersThunc = createAsyncThunk('fetchTeachers', async (_, thunkAPI) => {
  try {
    const db = getDatabase(app);
    const dbReference = ref(db, '/'); // Link to database root
    const readingData = await get(dbReference);

    if (readingData.exists()) {
      const data = readingData.val();

      const userIdPattern = /^[a-zA-Z0-9]{28}$/;

      const teachersWithId = Object.entries(data)
        .filter(([key, value]) => {
          // if the key matches users, skip it
          return !key.startsWith('users') && !userIdPattern.test(key);
        })
        .map(([key, value]) => ({
          id: key,
          ...value,
        }));

      return teachersWithId; // Sending data with ID to Redux
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
