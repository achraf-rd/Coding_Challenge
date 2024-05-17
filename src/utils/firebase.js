// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEDA_eZJQ5IMHFye6vgAFt0UUVnVblw8w",
  authDomain: "challenge-blog.firebaseapp.com",
  projectId: "challenge-blog",
  storageBucket: "challenge-blog.appspot.com",
  messagingSenderId: "180242069236",
  appId: "1:180242069236:web:9da4a9f65251e11fd0d0a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;