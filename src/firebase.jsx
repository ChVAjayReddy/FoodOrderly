// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx08RUNWbDgiM3vahTddjiqv3DbnZ7WG0",
  authDomain: "foodorderly-5f572.firebaseapp.com",
  projectId: "foodorderly-5f572",
  storageBucket: "foodorderly-5f572.firebasestorage.app",
  messagingSenderId: "301754689438",
  appId: "1:301754689438:web:a7796db65b806b6240988f",
  measurementId: "G-5M960RBPG7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
