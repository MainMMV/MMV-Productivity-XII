import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import appletConfig from "../../firebase-applet-config.json";

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

const isPreviewEnv = typeof window !== "undefined" && (
  window.location.hostname.includes("localhost") || 
  window.location.hostname.includes("run.app") || 
  window.location.hostname.includes("gitpod") ||
  window.location.hostname.includes("ai.studio")
);

// If in preview/workspace env, use appletConfig, otherwise use userConfig (or environment variables)
const firebaseConfig = isPreviewEnv && appletConfig.apiKey ? {
  apiKey: appletConfig.apiKey,
  authDomain: appletConfig.authDomain,
  projectId: appletConfig.projectId,
  storageBucket: appletConfig.storageBucket,
  messagingSenderId: appletConfig.messagingSenderId,
  appId: appletConfig.appId,
} : (import.meta.env.VITE_FIREBASE_API_KEY ? {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
} : userConfig);

const app = initializeApp(firebaseConfig);
const databaseId = (isPreviewEnv && appletConfig.apiKey)
  ? (appletConfig as any).firestoreDatabaseId
  : (import.meta.env.VITE_FIREBASE_DATABASE_ID || null);

const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, auth, googleProvider };
