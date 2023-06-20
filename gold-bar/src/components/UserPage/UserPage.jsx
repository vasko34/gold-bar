import React from 'react';
import './userpage.css';
import { useNavigate } from 'react-router-dom';
import { Firebase, LoginTimeoutInMinutes } from "../../global";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { ProfileOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const UserPage = () => {
    const navigate = useNavigate();
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, [auth]);
  
    React.useEffect(() => {
        const getUsername = async () => {
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const username = userDoc.data().username;
            setUsername(username);
        };
        getUsername();
    }, [user]);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    };

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    };

    const handleLogOut = () => {
        signOut(auth);
        localStorage.removeItem('loginTime');
        navigate('/');
    };

    React.useEffect(() => {
        const loginTime = localStorage.getItem('loginTime');
        if (user && loginTime) {
            const timeoutMilliseconds = LoginTimeoutInMinutes * 60 * 1000;
            const elapsedTime = new Date().getTime() - parseInt(loginTime);
            if (elapsedTime < timeoutMilliseconds) {
                const timeoutId = setTimeout(handleLogOut, timeoutMilliseconds - elapsedTime);
                return () => clearTimeout(timeoutId);
            } else {
                handleLogOut();
            }
        }
    }, [user]);

    return (
        <div className = 'userpage'>
            <img src = { 'https://firebasestorage.googleapis.com/v0/b/gold-bar-4abbb.appspot.com/o/RotateNotification.png?alt=media&token=cbbbadf2-aa33-427f-8ed4-cf68a14ba9f6' } className = 'rotate_notification'></img>
            <div className = 'userpage__content'>
                <h1>Gold Bar</h1>
                <button type = 'button' onClick = { () => navigate('/library') }>Order Hookah</button>
            </div>
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } home = { true } library = { true }></ProfileOverlay>) }
        </div>
    );
};

export default UserPage;