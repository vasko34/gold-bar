import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Firebase } from "../../global";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import './adminpage.css';
import { ProfileOverlay, AddTobaccoOverlay, StatsOverlay, ChangeSecurityCodeOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const AdminPage = () => {
    const navigate = useNavigate();
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [toggleAddTobaccoOverlay, setToggleAddTobaccoOverlay] = React.useState(null);
    const [toggleStatsOverlay, setToggleStatsOverlay] = React.useState(null);
    const [toggleChangeSecurityCodeOverlay, setToggleChangeSecurityCodeOverlay] = React.useState(null);
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
        setToggleAddTobaccoOverlay(false);
        setToggleStatsOverlay(false);
        setToggleChangeSecurityCodeOverlay(false);
    };

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    };

    const openAddTobaccoOverlay = () => {
        setToggleAddTobaccoOverlay(true);
        setToggleProfileOverlay(false);
        setToggleStatsOverlay(false);
        setToggleChangeSecurityCodeOverlay(false);
    };

    const closeAddTobaccoOverlay = () => {
        setToggleAddTobaccoOverlay(false);
    };

    const openStatsOverlay = () => {
        setToggleStatsOverlay(true);
        setToggleProfileOverlay(false);
        setToggleAddTobaccoOverlay(false);
        setToggleChangeSecurityCodeOverlay(false);
    };

    const closeStatsOverlay = () => {
        setToggleStatsOverlay(false);
    };

    const openChangeSecurityCodeOverlay = () => {
        setToggleChangeSecurityCodeOverlay(true);
        setToggleProfileOverlay(false);
        setToggleAddTobaccoOverlay(false);
        setToggleStatsOverlay(false);
    };

    const closeChangeSecurityCodeOverlay = () => {
        setToggleChangeSecurityCodeOverlay(false);
    };
    
    return (
        <div className = 'adminpage'>
            <div className = 'adminpage__content'>
                <h1>Gold Bar</h1>
                <button type = 'button' onClick = { () => navigate('/adminorders') }>View Orders</button>
                <button type = 'button' onClick = { () => navigate('/adminlibrary') }>Update Stock</button>
                <button type = 'button' onClick = { openAddTobaccoOverlay }>Add Tobacco</button>
                <button type = 'button' onClick = { openStatsOverlay }>Check Stats</button>
                <button type = 'button' onClick = { openChangeSecurityCodeOverlay }>Change Security Code</button>
            </div>
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } home = { true } library = { true }></ProfileOverlay>) }
            { toggleAddTobaccoOverlay && (<AddTobaccoOverlay close = { closeAddTobaccoOverlay }></AddTobaccoOverlay>) }
            { toggleStatsOverlay && (<StatsOverlay close = { closeStatsOverlay }></StatsOverlay>) }
            { toggleChangeSecurityCodeOverlay && (<ChangeSecurityCodeOverlay close = { closeChangeSecurityCodeOverlay }></ChangeSecurityCodeOverlay>) }
        </div>
    );
}

export default AdminPage;