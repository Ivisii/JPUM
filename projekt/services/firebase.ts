// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKgo4qRkUpxQgHL6a2nuGLMw48z-W2eJU",
  authDomain: "projekt11-add5c.firebaseapp.com",
  projectId: "projekt11-add5c",
  storageBucket: "projekt11-add5c.firebasestorage.app",
  messagingSenderId: "657053166286",
  appId: "1:657053166286:web:a4c082ee539e2af872be9f",
  measurementId: "G-N159XCYRCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);