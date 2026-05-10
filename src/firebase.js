// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optional: Analytics only works in browser environments
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_x4hq6aRB4ixr6hxoBATpAlU34LiXuiE",
  authDomain: "gameforge---info340.firebaseapp.com",
  projectId: "gameforge---info340",
  storageBucket: "gameforge---info340.firebasestorage.app",
  messagingSenderId: "220162419538",
  appId: "1:220162419538:web:5b29663be87fd37a17a88b",
  measurementId: "G-3BZK5LGG1Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore
export const db = getFirestore(app);

// Optional analytics
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});