// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-f291c.firebaseapp.com",
  projectId: "e-commerce-f291c",
  storageBucket: "e-commerce-f291c.appspot.com",
  messagingSenderId: "521444109243",
  appId: "1:521444109243:web:03d8b438412b81781f729e"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);