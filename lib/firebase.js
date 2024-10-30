// lib/firebase.js
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDR5e8pgoTLVM_LxnGqTBxi5EY3uZjNRkc",
    authDomain: "invoice-fivver.firebaseapp.com",
    projectId: "invoice-fivver",
    storageBucket: "invoice-fivver.appspot.com",
    messagingSenderId: "834202130914",
    appId: "1:834202130914:web:f8bc0b8a65ba53c82d41bb",
    measurementId: "G-2RMR4GQ990"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth ,app, storage };
