
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDH5h484mqs3xmKwBUzvgSgYQXJTAQzP-M",
  authDomain: "fir-crud-2fbb5.firebaseapp.com",
  projectId: "fir-crud-2fbb5",
  storageBucket: "fir-crud-2fbb5.firebasestorage.app",
  messagingSenderId: "153938342738",
  appId: "1:153938342738:web:ecb13209cb7c58eff8c08b",
  measurementId: "G-CF4MXHCDSF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();








