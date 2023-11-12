import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnmn7Hj7V57kfLT18ixWAlMPL3t1N9ecc",
  authDomain: "streamit-79421.firebaseapp.com",
  projectId: "streamit-79421",
  storageBucket: "streamit-79421.appspot.com",
  messagingSenderId: "22322805142",
  appId: "1:22322805142:web:5ef2b82c75455d238485b7"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db };