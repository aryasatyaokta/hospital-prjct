// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ6P5umwNvYtmPkcKU0tRDofhif4XXEC0",
  authDomain: "hermina-project-9b686.firebaseapp.com",
  projectId: "hermina-project-9b686",
  storageBucket: "hermina-project-9b686.appspot.com",
  messagingSenderId: "722369498383",
  appId: "1:722369498383:web:90334a272e469abae2c27a",
  measurementId: "G-1BVYK83NXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;