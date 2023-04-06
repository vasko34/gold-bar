import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signOut  } from 'firebase/auth';
import './profileoverlay.css';
import { FaTimes } from 'react-icons/fa';
import { SecurityOverlay } from '../index.js';


const ProfileOverlay = ({ close, library, orders, home }) => {
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

    const navigate = useNavigate();
    const [toggleSecurityOverlay, setToggleSecurityOverlay] = React.useState(null);

    const openSecurityOverlay = () => {
        setToggleSecurityOverlay(true);
    };

    const closeSecurityOverlay = () => {
        setToggleSecurityOverlay(false);
    };

    const handleLogOut = () => {
        signOut(auth);
        navigate('/');
    };

    return (
        <div className = 'profileoverlay'>
            <div className = 'profileoverlay__content'>
                <h2>Profile</h2>
                { !library && (<p onClick = { () => navigate('/library') }>Library</p>) }
                { !orders && (<p onClick = { () => navigate('/orders') }>Orders</p>) }
                { !home && (<p onClick = { () => navigate('/user') }>Home</p>) }
                <button type = 'button' onClick = { openSecurityOverlay }>Log out</button>
                <FaTimes onClick = { close } className = 'close'></FaTimes>
            </div>
            { toggleSecurityOverlay && (<SecurityOverlay close = { closeSecurityOverlay } closeProfileOverlay = { close } logoutUser = { handleLogOut }></SecurityOverlay>) }
        </div>
    );
}

export default ProfileOverlay;