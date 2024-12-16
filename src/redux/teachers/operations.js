import { getDatabase, ref, get } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { app } from '../../../firebase';

export const fetchTeachersThunc = createAsyncThunk('fetchTeachers', async (_, thunkAPI) => {
  try {
    const db = getDatabase(app);
    const dbReference = ref(db, '/');
    const readingData = await get(dbReference);

    if (readingData.exists()) {
      // console.log(readingData.val());
      return readingData.val();
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
