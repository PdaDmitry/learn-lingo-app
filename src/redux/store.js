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

const persistTeachersConfig = {
  key: 'teachers',
  storage,
  //witelist: [a, d, c], //то что мы хотим сохранить из state
  // blacklist: ['hasBeenFetched'], //то что мы не хотим сохранить из state
};

const persistedReducer = persistReducer(persistTeachersConfig, teacherReducer);

export const store = configureStore({
  reducer: {
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
