import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use explicit environment variables
const firebaseConfig = {
    apiKey: "AIzaSyD1af3Zxfz3Nc0oyDRyLpiLv6dWOG2AiC8",
    authDomain: "netflix-app-9c828.firebaseapp.com",
    projectId: "netflix-app-9c828",
    storageBucket: "netflix-app-9c828.firebasestorage.app",
    messagingSenderId: "252027157459",
    appId: "1:252027157459:web:b26497063307960bb34d26",
    measurementId: "G-F2J9VQ13J9"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);