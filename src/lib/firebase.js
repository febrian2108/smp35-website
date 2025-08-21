// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v9-compat and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCyEl7c_xpAblbnlDFQFk7BqOhN3PsBp0",
  authDomain: "website-smpn35.firebaseapp.com",
  projectId: "website-smpn35",
  storageBucket: "website-smpn35.firebasestorage.app",
  messagingSenderId: "184482933234",
  appId: "1:184482933234:web:1639169aa21716500aa36b",
  measurementId: "G-Y8QDZ37YH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export default app;

