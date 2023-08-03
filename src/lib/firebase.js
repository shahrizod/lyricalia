// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUqEseKDZnsC8XZd9stQNyHQUFctY8ywY",
  authDomain: "lyricalia-ba999.firebaseapp.com",
  projectId: "lyricalia-ba999",
  storageBucket: "lyricalia-ba999.appspot.com",
  messagingSenderId: "560965154017",
  appId: "1:560965154017:web:7c1eafa3c4d7c4c0b7f3a0",
  measurementId: "G-84VJQ3XT14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);