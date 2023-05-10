import React from 'react';
import './securityoverlay.css';
import { Firebase } from "../../global";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { FaTimes } from 'react-icons/fa';

const SecurityOverlay = ({ close, closeProfileOverlay, logoutUser }) => {
    const [currentInput,setCurrentInput] = React.useState('');
    const [securityCode, setSecurityCode] = React.useState(null);
    const [securityCodeError, setSecurityCodeError] = React.useState(null);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const getSecurityCode = async () => {
            const querySnapshot = await getDocs(collection(db, "securityCode"));
            setSecurityCode(querySnapshot.docs[0].data().securityCode);
        };
        getSecurityCode();
    }, []);

    const logout = (code) => {
        if (code !== securityCode) {
            setSecurityCodeError(true);
        } else {
            setSecurityCodeError(false);
            close();
            closeProfileOverlay();
            logoutUser();
        }
    };    

    return (
        <div className = 'securityoverlay'>
            <h2>Security Check</h2>
            <input placeholder = 'Enter Security Code' value = { currentInput } onChange = { (e) => setCurrentInput(e.target.value) }></input>
            { securityCodeError && (<p>Incorrect security code!</p>) }
            <button type = 'button' onClick = { () => logout(currentInput) }>Log out</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
};

export default SecurityOverlay;