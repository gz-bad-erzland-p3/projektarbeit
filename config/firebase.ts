import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjA58UCRRVykokfVIjCBmfXBO3Z7JOKqo",
    authDomain: "gz-bad-erzland.firebaseapp.com",
    projectId: "gz-bad-erzland",
    storageBucket: "gz-bad-erzland.appspot.com",
    messagingSenderId: "396413104350",
    appId: "1:396413104350:web:79e1c8cd676570493a924f",
    measurementId: "G-M8QSDK1HPQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Set auth cookie
export const auth = getAuth();
setPersistence(auth, browserSessionPersistence)

// Database
export const db = getDatabase();

