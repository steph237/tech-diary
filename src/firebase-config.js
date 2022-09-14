import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAHDH0pE1jLimmsjc5SJdceUyQvFQbQYyM",
  authDomain: "tech-diary-8c04a.firebaseapp.com",
  projectId: "tech-diary-8c04a",
  storageBucket: "tech-diary-8c04a.appspot.com",
  messagingSenderId: "176255310295",
  appId: "1:176255310295:web:45fe70fb5e74f87ae8d392",
  measurementId: "G-JWYQV6ZD3V",
};

// Initialize Firebasecon

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
