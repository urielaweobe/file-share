import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "file-share-9b962.firebaseapp.com",
  projectId: "file-share-9b962",
  storageBucket: "file-share-9b962.appspot.com",
  messagingSenderId: "979494842062",
  appId: "1:979494842062:web:5d01334472db68f923aa9f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage(app);
export const gAuth = new GoogleAuthProvider();
export const gitAuth = new GithubAuthProvider();