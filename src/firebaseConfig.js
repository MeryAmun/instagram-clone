// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import{ getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgekA5ubEwED0Numadil_00TUkg--5MAI",
  authDomain: "instagram-clone-e0fb1.firebaseapp.com",
  projectId: "instagram-clone-e0fb1",
  storageBucket: "instagram-clone-e0fb1.appspot.com",
  messagingSenderId: "692006857449",
  appId: "1:692006857449:web:4a4e5351554854e8955e78",
  measurementId: "G-ZFTVPD178Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
 const auth = getAuth();
 const storage = getStorage()


export  { db, auth,storage }