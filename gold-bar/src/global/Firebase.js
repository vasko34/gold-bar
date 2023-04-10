import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDJfxJwSEkTH8jWQBBlMTbgGq7rWOeG3bE",
    authDomain: "gold-bar-4abbb.firebaseapp.com",
    databaseURL: "https://gold-bar-4abbb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gold-bar-4abbb",
    storageBucket: "gold-bar-4abbb.appspot.com",
    messagingSenderId: "388118576707",
    appId: "1:388118576707:web:a33a9a20927496b4ab5ef6",
    measurementId: "G-R8VXHFZ4TS"
};
const Firebase = initializeApp(firebaseConfig);

export default Firebase;