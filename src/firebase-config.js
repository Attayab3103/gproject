// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIBUNwyopKM5kcVOREh16OYZbO-4ybeZc",
  authDomain: "gproject-a6864.firebaseapp.com",
  databaseURL: "https://gproject-a6864-default-rtdb.firebaseio.com",
  projectId: "gproject-a6864",
  storageBucket: "gproject-a6864.firebasestorage.app",
  messagingSenderId: "108578584775",
  appId: "1:108578584775:web:b65f4a97a1b39a9a77a6e2",
  measurementId: "G-LZE970KDM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }; 