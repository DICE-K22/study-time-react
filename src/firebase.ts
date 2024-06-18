// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpaCNpKL_SokZUb34HCzaPh7Cmw3gjoMw",
  authDomain: "study-time-react-7ef1d.firebaseapp.com",
  projectId: "study-time-react-7ef1d",
  storageBucket: "study-time-react-7ef1d.appspot.com",
  messagingSenderId: "370243247722",
  appId: "1:370243247722:web:19bd33cf2d69a148f03413",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
