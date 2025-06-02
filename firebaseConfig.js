// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBd43qF_f5qkN0Ti_tnJT2L2q9a9ZHF0_w",
  authDomain: "vrijgezellenfeest-luis.firebaseapp.com",
  databaseURL: "https://vrijgezellenfeest-luis-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vrijgezellenfeest-luis",
  storageBucket: "vrijgezellenfeest-luis.firebasestorage.app",
  messagingSenderId: "382835718443",
  appId: "1:382835718443:web:21c6a9e917258988e22d6e",
  measurementId: "G-65WM9E5LX7"
};

// Singleton-safe init
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // 👈 nodig voor login

export { app, database, auth };
