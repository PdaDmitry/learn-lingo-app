import { configureStore } from '@reduxjs/toolkit';
import { teacherReducer } from './teachers/teachersSlice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { authReducer } from './auth/authSlice';

const persistTeachersConfig = {
  key: 'teachers',
  storage,
  witelist: ['items'],
  // blacklist: ['favorites'],
};

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isLoggedIn', 'refreshToken'],
  // blacklist: ['error'],
};

const persistedReducer = persistReducer(persistTeachersConfig, teacherReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    teachers: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
