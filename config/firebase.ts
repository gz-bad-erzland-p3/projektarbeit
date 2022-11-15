
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth();