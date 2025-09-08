// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZCtulM0uC_tzXjjzKrplE1oytuKSh6ko",
  authDomain: "login-acema.firebaseapp.com",
  projectId: "login-acema",
  storageBucket: "login-acema.firebasestorage.app",
  messagingSenderId: "106090524254",
  appId: "1:106090524254:web:02f9ac7db9098eb017cecf"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
// You can now use appFirebase to access Firebase services in your application.