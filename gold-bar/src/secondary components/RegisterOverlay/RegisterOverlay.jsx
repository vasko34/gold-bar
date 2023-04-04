import React from 'react';
import './registeroverlay.css';
import { SecurityCode } from '../index.js';
import { FaTimes } from 'react-icons/fa';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterOverlay = ({ close }) => {
    const [currentInputUsername, setCurrentInputUsername] = React.useState('');
    const [currentInputPassword, setCurrentInputPassword] = React.useState('');
    const [currentInputConfirmPassword, setCurrentInputConfirmPassword] = React.useState('');
    const [currentInputSecurity, setCurrentInputSecurity] = React.useState('');
    const [passwordMatchError, setPasswordMatchError] = React.useState(null);
    const [passwordSafetyError, setPasswordSafetyError] = React.useState(null);
    const [securityCodeError, setSecurityCodeError] = React.useState(null);
    const [isChecked, setIsChecked] = React.useState(false);

    const firebaseConfig = {
        apiKey: "AIzaSyDJfxJwSEkTH8jWQBBlMTbgGq7rWOeG3bE",
        authDomain: "gold-bar-4abbb.firebaseapp.com",
        databaseURL: "https://gold-bar-4abbb-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "gold-bar-4abbb",
        storageBucket: "gold-bar-4abbb.appspot.com",
        messagingSenderId: "388118576707",
        appId: "1:388118576707:web:a33a9a20927496b4ab5ef6",
        measurementId: "G-R8VXHFZ4TS"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    React.useEffect(() => {
        if (!passwordMatchError && !passwordSafetyError && !securityCodeError) {
          register(currentInputUsername, currentInputPassword);
        }
    }, [passwordMatchError, passwordSafetyError, securityCodeError]);

    const register = async (username, password) => {
        try {
            const auth = getAuth();
            const email = username + '@example.com';
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                password: password,
                adminStatus: isChecked
            });
            window.location.reload();
        } catch (error) {
            console.log(error.message);                
        }
    };

    const handleRegister = (password, confirmPassword, code) => {
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
    };

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
            <button type = 'button' onClick = { () => handleRegister(currentInputPassword, currentInputConfirmPassword, currentInputSecurity) }>Register</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default RegisterOverlay;