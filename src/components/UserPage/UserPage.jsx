import React from 'react';
import { useNavigate } from 'react-router-dom';
import './userpage.css';
import { ProfileOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const UserPage = () => {
    const navigate = useNavigate();
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    }

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    }

    return (
        <div className = 'userpage'>
            <div className = 'userpage__content'>
                <h1>Gold Bar</h1>
                <button type = 'button'>Order Shisha</button>
            </div>
            <div className = 'userpage__profile' onClick = { openProfileOverlay }>
                <FaUser className = 'userpage__profile-icon'></FaUser>
                <h3>Table01</h3>
            </div>
            <div className = 'userpage__librarylink'>
                <p onClick = {() => navigate('/library')}>Check out our tobacco library</p>
            </div>
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } logoutUser = { () => navigate('/') }></ProfileOverlay>) }
            <div className = 'boolean_switch'>
                <span onClick = { () => navigate('/admin') }>Admin</span>
                <span onClick = { () => navigate('/') }>Home</span>
            </div>
        </div>
    );
}

export default UserPage;