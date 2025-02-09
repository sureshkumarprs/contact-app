import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "kk-contact-app.firebaseapp.com",
  projectId: "kk-contact-app",
  storageBucket: "kk-contact-app.firebasestorage.app",
  messagingSenderId: "657586423122",
  appId: "1:657586423122:web:44bc87f83169dbde9de68b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const db = getFirestore(app);
export { app, auth, storage, ref, db}