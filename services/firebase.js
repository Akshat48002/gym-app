
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCnQm_g4cX7d-lOvnm8AzX2BmFlUgQEWBU",
  authDomain: "gym-app-3c867.firebaseapp.com",
  projectId: "gym-app-3c867",
  storageBucket: "gym-app-3c867.firebasestorage.app",
  messagingSenderId: "699041865001",
  appId: "1:699041865001:web:673dbb318d9ba4cafaeb38",
  measurementId: "G-D3CET77F2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
