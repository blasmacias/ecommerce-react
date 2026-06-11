// Firebase configuration
// Replace these values with your own Firebase project credentials
// You can find them in your Firebase Console > Project Settings > General

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfwK-pbeWBbWD2Bt2W6PzZ0Q9fC8PeKbE",
  authDomain: "ecommerce-app-5bba6.firebaseapp.com",
  projectId: "ecommerce-app-5bba6",
  storageBucket: "ecommerce-app-5bba6.firebasestorage.app",
  messagingSenderId: "804400709991",
  appId: "1:804400709991:web:37c448ed4cfb07d551efc2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);