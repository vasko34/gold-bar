import React from 'react';
import './loginoverlay.css';
import { FaTimes } from 'react-icons/fa';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
 
const LoginOverlay = ({ close }) => {
    const navigate = useNavigate();
    const [currentInputUsername,setCurrentInputUsername] = React.useState('');
    const [currentInputPassword,setCurrentInputPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(null);

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
        if (passwordError === false) {
            login(currentInputUsername, currentInputPassword);
        }
    }, [passwordError]);

    const login = async (username, password) => {     
        try {
            const auth = getAuth();
            const email = username + '@example.com';
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const userDoc = await getDoc(doc(db, "users", uid));
            const adminStatus = userDoc.data().adminStatus;
            if (adminStatus) {
                navigate('/admin');
            } else {
                navigate('/user');
            }        
        } catch (error) {
            console.log(error.message);
            setPasswordError(true);
        }
    }

    const handleLogin = (username, password) => {
        if ((password.length < 8) || (password.search(/\d+/) === -1) || (password.search(/[A-Z]/) === -1) || (password.search(/[a-z]/) === -1) || (username[0].search(/[A-Z]/) === -1)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    return (
        <div className = 'loginoverlay'>
            <h2>Log in</h2>
            <input placeholder = 'Enter Username' value = { currentInputUsername } onChange = { (e) => setCurrentInputUsername(e.target.value) }></input>
            <input placeholder = 'Enter Password' type = 'password' value = { currentInputPassword } onChange = { (e) => setCurrentInputPassword(e.target.value) }></input>
            { passwordError && (<p>Invalid username or password!</p>) }
            <button type = 'button' onClick = { () => handleLogin(currentInputUsername, currentInputPassword) }>Log in</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
}

export default LoginOverlay;