import React from 'react';
import { useNavigate } from 'react-router-dom';
import './profileoverlay.css';
import { FaTimes } from 'react-icons/fa';
import { SecurityOverlay } from '../index.js';

const ProfileOverlay = ({ close, logoutUser, library, orders, home }) => {
    const navigate = useNavigate();
    const [toggleSecurityOverlay, setToggleSecurityOverlay] = React.useState(null);

    const openSecurityOverlay = () => {
        setToggleSecurityOverlay(true);
    }

    const closeSecurityOverlay = () => {
        setToggleSecurityOverlay(false);
    }

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
            { toggleSecurityOverlay && (<SecurityOverlay close = { closeSecurityOverlay } closeProfileOverlay = { close } logoutUser = { logoutUser }></SecurityOverlay>) }
        </div>
    );
}

export default ProfileOverlay;