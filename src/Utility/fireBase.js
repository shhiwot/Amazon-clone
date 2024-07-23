// Import the functions you need from the SDKs you need
// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD49IOvpyTC-WOFvz_Tx9QVHJZCvYq8Do0",
  authDomain: "clone-627ee.firebaseapp.com",
  projectId: "clone-627ee",
  storageBucket: "clone-627ee.appspot.com",
  messagingSenderId: "1042340684229",
  appId: "1:1042340684229:web:db2a2a17f8ae42b74febac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
