import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC7mQFz_F6dPOvrZhEMz_R_BalfR4PDQE8',
  authDomain: 'learn-auth-ff6fe.firebaseapp.com',
  projectId: 'learn-auth-ff6fe',
  storageBucket: 'learn-auth-ff6fe.firebasestorage.app',
  messagingSenderId: '615484235727',
  appId: '1:615484235727:web:3f3dde725742145bb2bcba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
