// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY3zmVE7I8lOzt9JyhUkExMxp-HMr8t7c",
  authDomain: "edykiosko.firebaseapp.com",
  projectId: "edykiosko",
  storageBucket: "edykiosko.firebasestorage.app",
  messagingSenderId: "379257547195",
  appId: "1:379257547195:web:13d1a9dfcea6ea8e9efc9e",
  measurementId: "G-0L0NE3N1XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

