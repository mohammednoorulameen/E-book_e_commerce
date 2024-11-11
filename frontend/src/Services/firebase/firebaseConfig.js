// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnwWHVPr8MECh7RtA0jWxFivXHGO2Hk88",
  authDomain: "e-book-2aca9.firebaseapp.com",
  projectId: "e-book-2aca9",
  storageBucket: "e-book-2aca9.firebasestorage.app",
  messagingSenderId: "548130025430",
  appId: "1:548130025430:web:0c3a8b687a3d12ee13be77",
  measurementId: "G-XCLHX3S8HC"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Correctly export the auth instance.
export default app;
// const app = initializeApp(firebaseConfig);
// export const  analytics = getAnalytics(app);
// export default app