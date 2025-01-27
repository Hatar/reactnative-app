// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTeJf2hpih5h-8SIv6mEbQtSw5UAwfTc8",
  authDomain: "reactnative-8f9fa.firebaseapp.com",
  projectId: "reactnative-8f9fa",
  storageBucket: "reactnative-8f9fa.firebasestorage.app",
  messagingSenderId: "144841279793",
  appId: "1:144841279793:web:07fc82f8adc00bb87ec810",
  measurementId: "G-9LX3VGT7LF"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)

