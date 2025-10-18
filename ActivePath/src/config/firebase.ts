// Firebase configuration and initialization
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnzKC2U1URv7T_yLJQi3QgNqY4fniZe3E",
  authDomain: "fit5032-week6-c741f.firebaseapp.com",
  projectId: "fit5032-week6-c741f",
  storageBucket: "fit5032-week6-c741f.firebasestorage.app",
  messagingSenderId: "1037083171896",
  appId: "1:1037083171896:web:9906554e26cc3700b89acd",
  measurementId: "G-D23WM3GLVF"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

export default app
