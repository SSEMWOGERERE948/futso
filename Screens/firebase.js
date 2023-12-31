import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getMessaging } from 'firebase/messaging'; // Add this line for Firebase Messaging

const firebaseConfig = {
    apiKey: "AIzaSyC5jMyxIZhGKnCKIBTTJV7OxROs_NSK0gQ", // from "api_key" under "client"
    authDomain: "futso-b202b.firebaseapp.com", // auto-generated by Firebase
    projectId: "futso-b202b", // from "project_id" under "project_info"
    storageBucket: "futso-b202b.appspot.com", // from "storage_bucket" under "project_info"
    messagingSenderId: "644182716697", // from "project_number" under "project_info"
    appId: "1:644182716697:android:3ac3e7a5317f220c43d588", // from "mobilesdk_app_id" under "client_info"
    measurementId: "", // Measurement ID if you have it (optional)
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);
// const messaging = getMessaging(app); // Initialize Firebase Messaging service

export { db };
