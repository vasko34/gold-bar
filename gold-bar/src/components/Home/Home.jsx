import React from 'react';
import './home.css';
import { LoginOverlay, RegisterOverlay } from '../../secondary components';

const Home = () => {
    const [toggleLoginOverlay, setToggleLoginOverlay] = React.useState(null);
    const [toggleRegisterOverlay, setToggleRegisterOverlay] = React.useState(null);

    const openLoginOverlay = () => {
        setToggleRegisterOverlay(false);
        setToggleLoginOverlay(true);
    };

    const closeLoginOverlay = () => {
        setToggleLoginOverlay(false);
    };

    const openRegisterOverlay = () => {
        setToggleLoginOverlay(false);
        setToggleRegisterOverlay(true);
    };

    const closeRegisterOverlay = () => {
        setToggleRegisterOverlay(false);
    };

    return (
        <div className = 'home'>
            <div className = 'home__content'>
                <h1>Gold Bar</h1>
                <button type = 'button' onClick = { openLoginOverlay }>Log in</button>
                <button type = 'button' onClick = { openRegisterOverlay }>Register</button>
            </div>
            { toggleLoginOverlay && (<LoginOverlay close = { closeLoginOverlay }></LoginOverlay>) }
            { toggleRegisterOverlay && (<RegisterOverlay close = { closeRegisterOverlay }></RegisterOverlay>) }
        </div>
    );
};

export default Home;