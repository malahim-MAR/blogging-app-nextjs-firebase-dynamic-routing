// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration (updated with measurementId)
const firebaseConfig = {
  apiKey: "AIzaSyCBFK4EcBVsRi_FEs701yStbqv6YVrpad4",
  authDomain: "malahim-blogging-app.firebaseapp.com",
  projectId: "malahim-blogging-app",
  storageBucket: "malahim-blogging-app.firebasestorage.app",
  messagingSenderId: "442033379531",
  appId: "1:442033379531:web:3ced9ba51e33970550634e",
  measurementId: "G-D3QL3WK8ZS", // 🔁 Replace this with your actual Measurement ID from Firebase
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (browser only)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };
