// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH5h484mqs3xmKwBUzvgSgYQXJTAQzP-M",
  authDomain: "fir-crud-2fbb5.firebaseapp.com",
  projectId: "fir-crud-2fbb5",
  storageBucket: "fir-crud-2fbb5.firebasestorage.app",
  messagingSenderId: "153938342738",
  appId: "1:153938342738:web:ecb13209cb7c58eff8c08b",
  measurementId: "G-CF4MXHCDSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);








