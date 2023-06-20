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
            <img src = { 'https://firebasestorage.googleapis.com/v0/b/gold-bar-4abbb.appspot.com/o/RotateNotification.png?alt=media&token=cbbbadf2-aa33-427f-8ed4-cf68a14ba9f6' } className = 'rotate_notification'></img>
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