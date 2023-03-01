import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import { LoginOverlay, RegisterOverlay } from '../../secondary components';

const Home = () => {
    const navigate = useNavigate();
    const [toggleLoginOverlay, setToggleLoginOverlay] = React.useState(null);
    const [toggleRegisterOverlay, setToggleRegisterOverlay] = React.useState(null);

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

    return (
        <div className = 'home'>
            <div className = 'home__content'>
                <h1>Gold Bar</h1>
                <button type = 'button' onClick = { openLoginOverlay }>Log in</button>
                <button type = 'button' onClick = { openRegisterOverlay }>Register</button>
            </div>
            { toggleLoginOverlay && (<LoginOverlay close = { closeLoginOverlay }></LoginOverlay>) }
            { toggleRegisterOverlay && (<RegisterOverlay close = { closeRegisterOverlay }></RegisterOverlay>) }
            <div className = 'boolean_switch'>
                <span onClick = { () => navigate('/admin') }>Admin</span>
                <span onClick = { () => navigate('/user') }>User</span>
            </div>
        </div>
    );
}

export default Home;