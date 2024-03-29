import React from 'react';
import './profileoverlay.css';
import { useNavigate } from 'react-router-dom';
import { Firebase } from "../../global";
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
        localStorage.removeItem('loginTime');
        navigate('/');
    };

    return (
        <div className = 'profileoverlay'>
            <div className = 'profileoverlay__content'>
                <h2>Profile</h2>
                { !library && (adminStatus ? (<p onClick = { () => navigate('/adminlibrary') }>Library</p>) : (<p onClick = { () => navigate('/library') }>Library</p>)) }
                { !orders && (adminStatus ? (<p onClick = { () => navigate('/adminorders') }>Orders</p>) : (<p onClick = { () => navigate('/orders') }>Orders</p>)) }
                { !home && (adminStatus ? (<p onClick = { () => navigate('/admin') }>Home</p>) : (<p onClick = { () => navigate('/user') }>Home</p>)) }
                { (adminStatus ? (<button type = 'button' onClick = { handleLogOut }>Log out</button>) : (<button type = 'button' onClick = { openSecurityOverlay }>Log out</button>)) }              
                <FaTimes onClick = { close } className = 'close'></FaTimes>
            </div>            
            { toggleSecurityOverlay && (<SecurityOverlay close = { closeSecurityOverlay } closeProfileOverlay = { close } logoutUser = { handleLogOut }></SecurityOverlay>) }
        </div>
    );
};

export default ProfileOverlay;