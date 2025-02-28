import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTeJf2hpih5h-8SIv6mEbQtSw5UAwfTc8",
  authDomain: "reactnative-8f9fa.firebaseapp.com",
  projectId: "reactnative-8f9fa",
  storageBucket: "reactnative-8f9fa.appspot.com", // Fix the storageBucket URL
  messagingSenderId: "144841279793",
  appId: "1:144841279793:web:07fc82f8adc00bb87ec810",
  measurementId: "G-9LX3VGT7LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export Firebase instances
export const FIREBASE_APP = app;
export const FIREBASE_AUTH = auth;
export const FIREBASE_DB = db;
export const FIREBASE_STORAGE = storage; // Export Storage
