import React from 'react';
import './home.css';
import { LoginOverlay, RegisterOverlay, ProfileOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [admin, setAdmin] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [toggleLoginOverlay, setToggleLoginOverlay] = React.useState(null);
    const [toggleRegisterOverlay, setToggleRegisterOverlay] = React.useState(null);
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);

    const logoutUser = () => {
        setUser(false);
    }

    const openLoginOverlay = () => {
        setToggleRegisterOverlay(false);
        setToggleLoginOverlay(true);
    }

    const closeLoginOverlay = () => {
        setToggleLoginOverlay(false);
    }

    const openRegisterOverlay = () => {
        setToggleLoginOverlay(false);
        setToggleRegisterOverlay(true);
    }

    const closeRegisterOverlay = () => {
        setToggleRegisterOverlay(false);
    }

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    }

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    }

    return (
        <div className = 'home'>
            { admin && (
                <div className = 'home__admin'>
                    <h1>Admin</h1>
                    <div className = 'boolean_switch'>
                        <span onClick = { () => setAdmin(prevadmin => !prevadmin) }>Admin</span>
                        <span onClick = { () => setUser(prevuser => !prevuser) }>User</span>
                    </div>
                </div>
            )}
            { user && (
                <div className = 'home__user'>
                    <div className = 'home__user-content'>
                        <h1>Gold Bar</h1>
                        <button type = 'button'>Order Shisha</button>
                    </div>
                    <div className = 'home__user-profile' onClick = { openProfileOverlay }>
                        <FaUser className = 'home__user-profile_icon'></FaUser>
                        <h3>Table01</h3>
                    </div>
                    <div className = 'home__user-librarylink'>
                        <p onClick = {() => navigate('/library')}>Check out our tobacco library</p>
                    </div>
                    { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } logoutUser = { logoutUser }></ProfileOverlay>) }
                    <div className = 'boolean_switch'>
                        <span onClick = { () => setAdmin(prevadmin => !prevadmin) }>Admin</span>
                        <span onClick = { () => setUser(prevuser => !prevuser) }>User</span>
                    </div>
                </div>
            )}
            <div className = 'home__login'>
                <div className = 'home__login-content'>
                    <h1>Gold Bar</h1>
                    <button type = 'button' onClick = { openLoginOverlay }>Log in</button>
                    <button type = 'button' onClick = { openRegisterOverlay }>Register</button>
                </div>
                { toggleLoginOverlay && (<LoginOverlay close = { closeLoginOverlay }></LoginOverlay>) }
                { toggleRegisterOverlay && (<RegisterOverlay close = { closeRegisterOverlay }></RegisterOverlay>) }
                <div className = 'boolean_switch'>
                    <span onClick = { () => setAdmin(prevadmin => !prevadmin) }>Admin</span>
                    <span onClick = { () => setUser(prevuser => !prevuser) }>User</span>
                </div>
            </div>
        </div>
    );
}

export default Home;