import React from 'react';
import './registeroverlay.css';
import { SecurityCode } from '../index.js';
import { FaTimes } from 'react-icons/fa';

const RegisterOverlay = ({ close }) => {
    const [currentInputUsername,setCurrentInputUsername] = React.useState('');
    const [currentInputPassword,setCurrentInputPassword] = React.useState('');
    const [currentInputConfirmPassword,setCurrentInputConfirmPassword] = React.useState('');
    const [currentInputSecurity,setCurrentInputSecurity] = React.useState('');
    const [passwordMatchError, setPasswordMatchError] = React.useState(false);
    const [passwordSafetyError, setPasswordSafetyError] = React.useState(false);
    const [securityCodeError, setSecurityCodeError] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);

    let user = {
        username: null,
        passwword: null,
        type: null
    }

    const register = (username, password, confirmPassword, code) => {
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }

        if ((password.length < 8) || (password.search(/\d+/) === -1) || (password.search(/[A-Z]/) === -1) || (password.search(/[a-z]/) === -1)) {
            setPasswordSafetyError(true);
        } else {
            setPasswordSafetyError(false);
        }

        if (code !== SecurityCode) {
            setSecurityCodeError(true);
        } else {
            setSecurityCodeError(false);
        }

        if (isChecked === true) {
            user = {
                username: username,
                password: password,
                type: 'admin'
            };
        } else {
            user = {
                username: username,
                password: password,
                type: 'normal'
            };
        }

        if ((passwordSafetyError === false) && (passwordMatchError === false) && (securityCodeError === false)) {
            fetch('/api/reguser', {
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
        <div className = 'registeroverlay'>
            <h2>Register</h2>
            <input placeholder = 'Enter Username' value = { currentInputUsername } onChange = { (e) => setCurrentInputUsername(e.target.value) }></input>
            <input placeholder = 'Enter Password' type = 'password' value = { currentInputPassword } onChange = { (e) => setCurrentInputPassword(e.target.value) }></input>
            <input placeholder = 'Confirm Password' type = 'password' value = { currentInputConfirmPassword } onChange = { (e) => setCurrentInputConfirmPassword(e.target.value) }></input>
            <input placeholder = 'Enter Security Code' value = { currentInputSecurity } onChange = { (e) => setCurrentInputSecurity(e.target.value) }></input>
            <div className = 'registeroverlay__admin'>
                <label>Admin account</label>
                <input type = 'checkbox' checked = { isChecked } onChange = { () => setIsChecked(previsChecked => !previsChecked) }></input>
            </div>
            { passwordMatchError && (<p>Passwords don't match!</p>) }
            { passwordSafetyError && (<p>The password must be atleast 8 characters long and contain numbers, capital and lowercase letters!</p>) }
            { securityCodeError && (<p>Incorrect security code!</p>) }
            <button type = 'button' onClick = { () => register(currentInputUsername, currentInputPassword, currentInputConfirmPassword, currentInputSecurity) }>Register</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default RegisterOverlay;