import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChDiUUVRNskRyxp42MrrMwr42FIQZ3OEk",
    authDomain: "react-info-projekt.firebaseapp.com",
    databaseURL: "https://react-info-projekt-default-rtdb.firebaseio.com",
    projectId: "react-info-projekt",
    storageBucket: "react-info-projekt.appspot.com",
    messagingSenderId: "563818488061",
    appId: "1:563818488061:web:30767c5e076238c13f9e94",
    measurementId: "G-C69MRHMZY6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Set auth cookie
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence)

// Database
export const db = getDatabase();

