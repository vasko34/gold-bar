import React from 'react';
import './changesecuritycodeoverlay.css';
import { Firebase } from "../../global";
import { getFirestore, setDoc, getDocs, collection } from "firebase/firestore";
import { FaTimes } from 'react-icons/fa';

const ChangeSecurityCodeOverlay = ({ close }) => {
    const [currentInputCurrentSecurityCode, setCurrentInputCurrentSecurityCode] = React.useState('');
    const [currentInputNewSecurityCode, setCurrentInputNewSecurityCode] = React.useState('');
    const [securityCodeError, setSecurityCodeError] = React.useState(false);
    const [successfulChange, setSuccessfulChange] = React.useState(false);
    const db = getFirestore(Firebase);

    const change = async (currentCode, newCode) => {
        setSecurityCodeError(false);
        setSuccessfulChange(false);
        const querySnapshot = await getDocs(collection(db, "securityCode"));
        if (currentCode !== querySnapshot.docs[0].data().securityCode) {
            setSecurityCodeError(true);
        } else {
            await setDoc(querySnapshot.docs[0].ref, { securityCode: newCode });
            setSuccessfulChange(true);
            setCurrentInputCurrentSecurityCode('');
            setCurrentInputNewSecurityCode('');
        }
    };

    return (
        <div className = 'changesecuritycodeoverlay'>
            <h1>Change Security Code</h1>
            <input placeholder = 'Enter Current Security Code' type = 'password' value = { currentInputCurrentSecurityCode } onChange = { (e) => setCurrentInputCurrentSecurityCode(e.target.value) }></input>
            <input placeholder = 'Enter New Security Code' type = 'password' value = { currentInputNewSecurityCode } onChange = { (e) => setCurrentInputNewSecurityCode(e.target.value) }></input>
            { securityCodeError && (<p>Incorrect security code!</p>) }
            { successfulChange && (<span>Security code changed successfully!</span>) }
            <button type = 'button' onClick = { () => change(currentInputCurrentSecurityCode, currentInputNewSecurityCode) }>Change</button>
            <FaTimes onClick = { close } className = 'close'></FaTimes>
        </div>
    );
};

export default ChangeSecurityCodeOverlay;