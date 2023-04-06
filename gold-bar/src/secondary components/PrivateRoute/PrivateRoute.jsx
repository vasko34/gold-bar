import React from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const navigate = useNavigate();
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
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [isAuthenticated] = useAuthState(auth);
  
    if (!isAuthenticated) {
      navigate('/');
      return null;
    }
    return <Element {...rest} />;
};

export default PrivateRoute;