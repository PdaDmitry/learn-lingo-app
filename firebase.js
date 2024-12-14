import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAFvWZPWiouammzCyAdoGKvgvgTaP1oGJ4',
  authDomain: 'learn-lingo-app-3bb37.firebaseapp.com',
  databaseURL: 'https://learn-lingo-app-3bb37-default-rtdb.firebaseio.com',
  projectId: 'learn-lingo-app-3bb37',
  storageBucket: 'learn-lingo-app-3bb37.firebasestorage.app',
  messagingSenderId: '1032488177681',
  appId: '1:1032488177681:web:1813054d98495cf96fe1b0',
  measurementId: 'G-ECS0F2S9PZ',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
