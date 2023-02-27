import React from 'react';
import './profileoverlay.css';
import { FaTimes } from 'react-icons/fa';
import { SecurityOverlay } from '../index.js';

const ProfileOverlay = ({ close, logoutUser }) => {
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
                <button type = 'button' onClick = { openSecurityOverlay }>Log out</button>
                <FaTimes onClick = { close } className = 'profileoverlay__content-close'></FaTimes>
            </div>
            { toggleSecurityOverlay && (<SecurityOverlay close = { closeSecurityOverlay } closeProfileOverlay = { close } logoutUser = { logoutUser }></SecurityOverlay>) }
        </div>
    );
}

export default ProfileOverlay;