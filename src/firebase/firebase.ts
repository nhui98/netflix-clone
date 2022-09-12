import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMIEMmxNkDHDyCm7CrbVOHAIVKABMFFR0",
  authDomain: "netflix-clone-89b74.firebaseapp.com",
  projectId: "netflix-clone-89b74",
  storageBucket: "netflix-clone-89b74.appspot.com",
  messagingSenderId: "912961691176",
  appId: "1:912961691176:web:31e389671b2b5980e1df1d",
  measurementId: "G-7W3HN66RYF",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
