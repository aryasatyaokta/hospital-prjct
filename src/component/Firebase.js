// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz4-ISK6lxeGTEZZGjRP-8WMjgl5_OLB8",
  authDomain: "oetomo-hos.firebaseapp.com",
  projectId: "oetomo-hos",
  storageBucket: "oetomo-hos.appspot.com",
  messagingSenderId: "482398847573",
  appId: "1:482398847573:web:89b1183c16b36caf2dcadc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;