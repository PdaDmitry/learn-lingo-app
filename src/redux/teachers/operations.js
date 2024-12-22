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

// export const registerUser = async ({ email, password }) => {
//   const auth = getAuth();

//   const db = getDatabase();
//   // console.log('db: ', db);

//   try {
//     const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//     console.log('signInMethods ', signInMethods);
//     if (signInMethods.length > 0) {
//       throw new Error('Email already in use');
//     }

//     // Register a user using email and password
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     console.log('User registered with UID:', user.uid);
//     return user;
//   } catch (error) {
//     console.error('Error registering user:', error.message);
//     throw error;
//   }
// };
