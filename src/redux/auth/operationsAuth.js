import { getDatabase, ref, get, set, update } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    const auth = getAuth();
    const db = getDatabase();

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        throw new Error('Email already in use');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User registered with UID:', user.uid);

      await set(ref(db, `users/${user.uid}`), {
        name,
        email: user.email,
        favorites: [], // Initializing an empty array
        theme: '',
      });

      return {
        localId: user.uid,
        name,
        email: user.email,
        refreshToken: user.stsTokenManager.refreshToken,
        // theme: theme || 'default',
      };
    } catch (error) {
      console.error('Error registering user:', error.message);
      //  toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// =====================================logoutUser===========================================

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  const auth = getAuth();
  // console.log(auth);

  try {
    await signOut(auth);

    console.log('User logged out');
    // return true;
    return null;
  } catch (error) {
    console.error('Error logging out:', error.message);
    return rejectWithValue(error.message);
  }
});

// =====================================loginUser===========================================

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    const auth = getAuth();
    const db = getDatabase();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const themeSnapshot = await get(ref(db, `users/${user.uid}/theme`));
      const theme = themeSnapshot.exists() ? themeSnapshot.val() : '#F4C550';

      return {
        localId: user.uid,
        email: user.email,
        theme, //////////////////
        refreshToken: user.stsTokenManager.refreshToken,
        // favorites,
      };
    } catch (error) {
      console.error('Error logging in user:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// =====================================updateTheme===========================================

export const updateTheme = createAsyncThunk(
  'auth/updateTheme', // Название экшена
  async ({ userId, theme }, { rejectWithValue }) => {
    const db = getDatabase();

    try {
      // Обновляем поле `theme` в Firebase для конкретного пользователя
      await update(ref(db, `users/${userId}`), {
        theme, // Сохраняем выбранную тему
      });

      return theme; // Возвращаем выбранную тему для дальнейшей работы в редьюсере
    } catch (error) {
      console.error('Error updating theme:', error);
      return rejectWithValue(error.message);
    }
  }
);
