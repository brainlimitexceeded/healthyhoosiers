import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXxGyOQOwM2TO_NI2rN5UxD_zoRi2Qjh4",
  authDomain: "chat-cb2d5.firebaseapp.com",
  projectId: "chat-cb2d5",
  storageBucket: "chat-cb2d5.appspot.com",
  messagingSenderId: "763723883180",
  appId: "1:763723883180:web:56e7084b519526f8d1b509"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();