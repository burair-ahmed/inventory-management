// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-enclave.firebaseapp.com",
  projectId: "mern-enclave",
  storageBucket: "mern-enclave.appspot.com",
  messagingSenderId: "91125893134",
  appId: "1:91125893134:web:1a17b328a5db0d08e3945f",
  measurementId: "G-HK74K2PNGD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
