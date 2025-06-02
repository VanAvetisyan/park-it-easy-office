// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9gr9bT7RUy6svVFA8Vk0Pbobw-5wEOiw",
  authDomain: "park-it-easy---office.firebaseapp.com",
  projectId: "park-it-easy---office",
  storageBucket: "park-it-easy---office.firebasestorage.app",
  messagingSenderId: "951807393997",
  appId: "1:951807393997:web:ab74115f9e8347d467e984",
  measurementId: "G-T5P1KNC0BM",
  databaseURL: "https://park-it-easy---office-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);