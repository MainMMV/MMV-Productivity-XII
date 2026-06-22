import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// The user's custom mmv-xii Firebase production configuration
const userConfig = {
  apiKey: "AIzaSyA75UNi_4OxmSMOLoaAHUbSxXKbbj_0t8A",
  authDomain: "mmv-xii.firebaseapp.com",
  projectId: "mmv-xii",
  storageBucket: "mmv-xii.firebasestorage.app",
  messagingSenderId: "448939693376",
  appId: "1:448939693376:web:fb52da97252907b40e56a5",
  measurementId: "G-R1PHSE72FQ"
};

// Allow overriding with environment variables for custom external environments if needed
const firebaseConfig = import.meta.env.VITE_FIREBASE_API_KEY ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} : userConfig;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
