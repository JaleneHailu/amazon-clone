import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1um_GH50jSKFDjrXDwADJarMkhPWeeU4",
  authDomain: "clone-2725a.firebaseapp.com",
  projectId: "clone-2725a",
  storageBucket: "clone-2725a.appspot.com",
  messagingSenderId: "456602958079",
  appId: "1:456602958079:web:cd0fd551d92cebeab3b4ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
