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
