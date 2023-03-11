// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import firebaseAPIKey from "./apiKeys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: "restaurantsapp-6f48a.firebaseapp.com",
  projectId: "restaurantsapp-6f48a",
  storageBucket: "restaurantsapp-6f48a.appspot.com",
  messagingSenderId: "532528690685",
  appId: "1:532528690685:web:7910280bbe8d372cfb5594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);