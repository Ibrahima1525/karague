// app/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4FdXDLbafwrxUx9oy3UX5oWkBGwHJP0c",
  authDomain: "karangue-5096e.firebaseapp.com",
  projectId: "karangue-5096e",
  storageBucket: "karangue-5096e.firebasestorage.app",
  messagingSenderId: "146099214184",
  appId: "1:146099214184:web:3075a83330598d7975a8dd",
  measurementId: "G-X0GXV1C10Z",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Export correct de Firestore
export const db = getFirestore(app);
