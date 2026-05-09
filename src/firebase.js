// Citation: Human setup from google cloud firebase 
// Was setup correctly with firebase console

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ6Kban9DMiBd176XOFriPaZa8WIenE-0",
  authDomain: "gameforge-d5395.firebaseapp.com",
  databaseURL: "https://gameforge-d5395-default-rtdb.firebaseio.com",
  projectId: "gameforge-d5395",
  storageBucket: "gameforge-d5395.firebasestorage.app",
  messagingSenderId: "250423629470",
  appId: "1:250423629470:web:1b70bbbf0cd99d9d088d8f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

