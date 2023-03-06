import React from 'react';
import './loginoverlay.css';
import { FaTimes } from 'react-icons/fa';
 
const LoginOverlay = ({ close }) => {
    const [currentInputUsername,setCurrentInputUsername] = React.useState('');
    const [currentInputPassword,setCurrentInputPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);

    const login = (username, password) => {
        if ((password.length < 8) || (password.search(/\d+/) === -1) || (password.search(/[A-Z]/) === -1) || (password.search(/[a-z]/) === -1)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        const user = {
            username: username,
            password: password
        };

        if (passwordError === false) {
            fetch('/api/loguser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        }
    }

    return (
        <div className = 'loginoverlay'>
            <h2>Log in</h2>
            <input placeholder = 'Enter Username' value = { currentInputUsername } onChange = { (e) => setCurrentInputUsername(e.target.value) }></input>
            <input placeholder = 'Enter Password' type = 'password' value = { currentInputPassword } onChange = { (e) => setCurrentInputPassword(e.target.value) }></input>
            { passwordError && (<p>Invalid username or password!</p>) }
            <button type = 'button' onClick = { () => login(currentInputUsername, currentInputPassword) }>Log in</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default LoginOverlay;