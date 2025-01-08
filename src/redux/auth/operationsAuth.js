import { getDatabase, ref, get, set, update } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// =========================================registerUser==========================================

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
      const initialFilters = {
        language: '',
        level: '',
        price: '',
      };

      await set(ref(db, `users/${user.uid}`), {
        name,
        email: user.email,
        favorites: [],
        theme: '',
        filters: initialFilters,
      });

      return {
        localId: user.uid,
        name,
        email: user.email,
        refreshToken: user.stsTokenManager.refreshToken,
        filters: initialFilters,
      };
    } catch (error) {
      console.error('Error registering user:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// =====================================logoutUser===========================================

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  const auth = getAuth();

  try {
    await signOut(auth);

    toast.success('User logged out', {
      duration: 4000,
      position: 'top-center',
      style: { background: 'orange', color: 'black' },
    });

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

      const filtersSnapshot = await get(ref(db, `users/${user.uid}/filters`));
      const filters = filtersSnapshot.exists()
        ? filtersSnapshot.val()
        : { language: '', level: '', price: '' };

      toast.success(`User ${email} has successfully logged in!`, {
        duration: 4000,
        position: 'top-center',
        style: { background: 'green', color: 'white' },
      });
      return {
        localId: user.uid,
        email: user.email,
        theme,
        refreshToken: user.stsTokenManager.refreshToken,
        filters,
      };
    } catch (error) {
      toast.error('Incorrect email or password', {
        duration: 4000,
        position: 'bottom-center',
        style: { background: 'orange', color: 'black' },
      });
      return rejectWithValue(error.message);
    }
  }
);

// =====================================updateTheme===========================================

export const updateTheme = createAsyncThunk(
  'auth/updateTheme',
  async ({ userId, theme }, { rejectWithValue }) => {
    const db = getDatabase();

    try {
      await update(ref(db, `users/${userId}`), {
        theme,
      });

      return theme;
    } catch (error) {
      console.error('Error updating theme:', error);
      return rejectWithValue(error.message);
    }
  }
);

// =====================================updateUserFilters===========================================

export const updateUserFilters = createAsyncThunk(
  'auth/updateUserFilters',
  async ({ userId, filters }, { rejectWithValue }) => {
    const db = getDatabase();

    try {
      await update(ref(db, `users/${userId}`), {
        filters,
      });

      return filters;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
