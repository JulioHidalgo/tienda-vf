// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqAevYTrTBhUQD8jbwUyeSnGz2LLEYNsw",
  authDomain: "tienda-vf.firebaseapp.com",
  projectId: "tienda-vf",
  storageBucket: "tienda-vf.appspot.com",
  messagingSenderId: "386950393556",
  appId: "1:386950393556:web:622d4a5a16309c1c395541",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);