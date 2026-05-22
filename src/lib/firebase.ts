// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3_Jv7q24HRr7wdpUXuNJK7HZzmZ11NV0",
  authDomain: "ai-farm-assis.firebaseapp.com",
  projectId: "ai-farm-assis",
  storageBucket: "ai-farm-assis.firebasestorage.app",
  messagingSenderId: "352569427863",
  appId: "1:352569427863:web:ea95da05c57c7974cb26d2",
  measurementId: "G-4FRTLGZDJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
