import { getDatabase, ref, get, set, update } from 'firebase/database';
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
          favorites: [],
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

// ===================================favorites=======================================
export const toggleFavoriteTeacher = createAsyncThunk(
  'favorites/toggleFavoriteTeacher',
  async ({ userId, teacher }, thunkAPI) => {
    const db = getDatabase();
    const userRef = ref(db, `users/${userId}/favorites`);

    try {
      // current list of favorites
      const currentFavoritesSnapshot = await get(userRef);
      const currentFavorites = currentFavoritesSnapshot.exists()
        ? currentFavoritesSnapshot.val()
        : [];
      // if the teacher is missing, add it, if it exists, delete it;
      const teacherExists = currentFavorites.find(fav => fav.id === teacher.id);
      let updatedFavorites;

      if (!teacherExists) {
        updatedFavorites = [...currentFavorites, teacher]; // Adding a teacher
      } else {
        updatedFavorites = currentFavorites.filter(fav => fav.id !== teacher.id); // Removing a teacher
      }
      // Updating favorites in the database
      await update(ref(db, `users/${userId}`), {
        favorites: updatedFavorites,
      });

      return updatedFavorites;
    } catch (error) {
      console.error('Error updating favorites:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
