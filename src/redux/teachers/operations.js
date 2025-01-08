import { getDatabase, ref, get, set, update } from 'firebase/database';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { app } from '../../../firebase';

export const fetchTeachersThunc = createAsyncThunk('fetchTeachers', async (filters, thunkAPI) => {
  try {
    const db = getDatabase(app);
    const dbReference = ref(db, '/');
    const readingData = await get(dbReference);

    if (readingData.exists()) {
      const data = readingData.val();

      const userIdPattern = /^[a-zA-Z0-9]{28}$/;

      const teachersWithId = Object.entries(data)
        .filter(([key, value]) => {
          return !key.startsWith('users') && !userIdPattern.test(key);
        })
        .filter(([key, value]) => {
          const speaksLanguage = filters.language
            ? value.languages.includes(filters.language)
            : true;
          const matchesLevel = filters.level ? value.levels.includes(filters.level) : true;
          const matchesPrice = filters.price ? value.price_per_hour <= filters.price : true;

          return speaksLanguage && matchesLevel && matchesPrice;
        })
        .map(([key, value]) => ({
          id: key,
          ...value,
          favorites: [],
        }));

      return teachersWithId;
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// ===================================fetchTeacherForId ===============================

export const fetchTeacherForId = createAsyncThunk('fetchTeachersForId', async (_, thunkAPI) => {
  try {
    const db = getDatabase(app);
    const dbReference = ref(db, '/');
    const readingData = await get(dbReference);

    if (readingData.exists()) {
      const data = readingData.val();

      const userIdPattern = /^[a-zA-Z0-9]{28}$/;

      const teacherData = Object.entries(data)
        .filter(([key, value]) => {
          return !key.startsWith('users') && !userIdPattern.test(key);
        })
        .map(([key, value]) => ({
          id: key,
          ...value,
        }));

      return teacherData;
    } else {
      throw new Error('No data available');
    }
  } catch (error) {
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
      const currentFavoritesSnapshot = await get(userRef);
      const currentFavorites = currentFavoritesSnapshot.exists()
        ? currentFavoritesSnapshot.val()
        : [];
      const teacherExists = currentFavorites.find(fav => fav.id === teacher.id);
      let updatedFavorites;

      if (!teacherExists) {
        updatedFavorites = [...currentFavorites, teacher];
      } else {
        updatedFavorites = currentFavorites.filter(fav => fav.id !== teacher.id);
      }

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

// ====================================fetchFavoriteTeachers========================================

export const fetchFavoriteTeachers = createAsyncThunk(
  'fetchUserFavorites',
  async (userId, thunkAPI) => {
    try {
      const db = getDatabase(app);
      const userFavoritesRef = ref(db, `users/${userId}/favorites`);
      const readingData = await get(userFavoritesRef);

      if (readingData.exists()) {
        const data = readingData.val();
        return data;
      } else {
        throw new Error('No favorites available for this user');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
