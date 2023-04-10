import React from 'react';
import { useNavigate } from 'react-router-dom';
import './adminpage.css';
import { ProfileOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const AdminPage = () => {
    const navigate = useNavigate();
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    }

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    }
    
    return (
        <div className = 'adminpage'>
            <h1>Admin</h1>
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>Table01</h3>
            </div>
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } home = { true } library = { true }></ProfileOverlay>) }
        </div>
    );
}

export default AdminPage;