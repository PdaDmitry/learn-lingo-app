import { getDatabase, ref, get, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    const auth = getAuth();
    // const db = getDatabase();

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        throw new Error('Email already in use');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User registered with UID:', user.uid);

      return {
        localId: user.uid,
        name,
        email: user.email,
        refreshToken: user.stsTokenManager.refreshToken,
      };
    } catch (error) {
      console.error('Error registering user:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     const auth = getAuth();

//     try {
//       // Логиним пользователя
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       return {
//         localId: user.uid,
//         email: user.email,
//         refreshToken: user.stsTokenManager.refreshToken,
//       };
//     } catch (error) {
//       console.error('Error logging in user:', error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );
