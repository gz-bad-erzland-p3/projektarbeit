import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDI3MO8GtJ9J0Ps0vWWeCvwiNH6wA4Lyy8",
    authDomain: "gz-bad-erzland-1eab5.firebaseapp.com",
    projectId: "gz-bad-erzland-1eab5",
    storageBucket: "gz-bad-erzland-1eab5.appspot.com",
    messagingSenderId: "813720766420",
    appId: "1:813720766420:web:982fff757b06eada6ff841",
    measurementId: "G-23PY6JFSK9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Set auth cookie
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence)

// Database
export const db = getDatabase();

