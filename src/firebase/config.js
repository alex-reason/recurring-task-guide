import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPDS2IEMritsAD1yt6BbCmO-xV7Lbss7I",
  authDomain: "case-guides.firebaseapp.com",
  projectId: "case-guides",
  storageBucket: "case-guides.appspot.com",
  messagingSenderId: "986059658420",
  appId: "1:986059658420:web:f0e92438204e8a24f1b3e1"
};

// initialize app 
initializeApp(firebaseConfig);
// initialize firestore
const db = getFirestore();
const auth = getAuth();

export { db, auth };