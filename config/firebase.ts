import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnDu6VFsaZIIPYG6AWNSqKqnVpgTEplY4",
    authDomain: "gz-bad-erzland-a5231.firebaseapp.com",
    projectId: "gz-bad-erzland-a5231",
    storageBucket: "gz-bad-erzland-a5231.appspot.com",
    messagingSenderId: "389584456404",
    appId: "1:389584456404:web:0af49a35ba216bbd0dc941",
    measurementId: "G-3QLDSXMNVG"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Set auth cookie
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence)

// Database
export const db = getDatabase();

