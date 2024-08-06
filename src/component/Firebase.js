// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGPd9enDZE8cztitHO-08AAPZsNWhYnYk",
  authDomain: "oetomo-hospital.firebaseapp.com",
  projectId: "oetomo-hospital",
  storageBucket: "oetomo-hospital.appspot.com",
  messagingSenderId: "551772090196",
  appId: "1:551772090196:web:aeca1a2af2164c00cb62c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;