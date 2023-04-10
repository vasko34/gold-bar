import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Firebase } from "../../global";
import { getAuth, signOut, onAuthStateChanged  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import './profileoverlay.css';
import { FaTimes } from 'react-icons/fa';
import { SecurityOverlay } from '../index.js';


const ProfileOverlay = ({ close, library, orders, home }) => {
    const navigate = useNavigate();
    const [toggleSecurityOverlay, setToggleSecurityOverlay] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [adminStatus, setAdminStatus] = React.useState(null);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, [auth]);
  
    React.useEffect(() => {
        const getAdminStatus = async () => {
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const adminStatus = userDoc.data().adminStatus;
            setAdminStatus(adminStatus);
        };
        getAdminStatus();
    }, [user]);

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
                { !home && (adminStatus ? (<p onClick = { () => navigate('/admin') }>Home</p>) : (<p onClick = { () => navigate('/user') }>Home</p>)) }
                <button type = 'button' onClick = { openSecurityOverlay }>Log out</button>
                <FaTimes onClick = { close } className = 'close'></FaTimes>
            </div>
            { toggleSecurityOverlay && (<SecurityOverlay close = { closeSecurityOverlay } closeProfileOverlay = { close } logoutUser = { handleLogOut }></SecurityOverlay>) }
        </div>
    );
}

export default ProfileOverlay;