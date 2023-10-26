// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAZdDRvVChXbBXDqcb3dpRPZALxahA1JjQ",
  authDomain: "fir-tutor-6596f.firebaseapp.com",
  projectId: "fir-tutor-6596f",
  storageBucket: "fir-tutor-6596f.appspot.com",
  messagingSenderId: "189874473017",
  appId: "1:189874473017:web:0159162c3d24950ecce5e8",
  measurementId: "G-RELQHHHDZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProdvider= new GoogleAuthProvider()
export const db = getFirestore(app)
