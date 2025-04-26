// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJXzDws0-mCBfkl0sPd07phBC9NqsdZcY",
  authDomain: "pruebas-firebase-76b9b.firebaseapp.com",
  projectId: "pruebas-firebase-76b9b",
  storageBucket: "pruebas-firebase-76b9b.firebasestorage.app",
  messagingSenderId: "1059260458681",
  appId: "1:1059260458681:web:ad626276d882541de75d68",
  measurementId: "G-CBGFKF7PK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);