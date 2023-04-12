// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOLpY8JeYlOO_E8vA09ljbiGHm7qXOX7k",
    authDomain: "spaced-repetition-a7207.firebaseapp.com",
    projectId: "spaced-repetition-a7207",
    storageBucket: "spaced-repetition-a7207.appspot.com",
    messagingSenderId: "756515527392",
    appId: "1:756515527392:web:ea6eb376fe2bb7fa148e85",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
