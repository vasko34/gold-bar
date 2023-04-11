import React from 'react';
import { Firebase } from "../../global";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import './orders.css';
import { ProfileOverlay, HookahBowl } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const Orders = () => {
    const container1Ref = React.useRef(null);
    const container2Ref = React.useRef(null);
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [hookahBowls, setHookahBowls] = React.useState([]);
    const [hookahBowlsSent, setHookahBowlsSent] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, [auth]);
  
    React.useEffect(() => {
        const getUsername = async () => {
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const username = userDoc.data().username;
            setUsername(username);
        };
        getUsername();
    }, [user]);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    }

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    }

    const order = () => {
        const hookahBowlsAsJSON = localStorage.getItem('HookahBowls');
        const hookahBowlsSentAsJSON = localStorage.getItem('HookahBowlsSent');
        if (hookahBowlsAsJSON !== null) {
            if (hookahBowlsSentAsJSON === null) {
                const hookahBowlsTemp = JSON.parse(hookahBowlsAsJSON);
                const hookahBowlsTempToJSON = JSON.stringify(hookahBowlsTemp);
                localStorage.setItem('HookahBowlsSent', hookahBowlsTempToJSON);
            } else {
                const hookahBowlsTemp = JSON.parse(hookahBowlsAsJSON);
                const hookahBowlsSentTemp = JSON.parse(hookahBowlsSentAsJSON);
                const newHookahBowls = hookahBowlsSentTemp.concat(hookahBowlsTemp);
                const newHookahBowlsToJSON = JSON.stringify(newHookahBowls);
                localStorage.setItem('HookahBowlsSent', newHookahBowlsToJSON);
            }
            localStorage.removeItem('HookahBowls');
        }
    };

    React.useEffect(() => {
        const hookahBowlsAsJSON = localStorage.getItem('HookahBowls');
        setHookahBowls(JSON.parse(hookahBowlsAsJSON));
        const hookahBowlsSentAsJSON = localStorage.getItem('HookahBowlsSent');
        setHookahBowlsSent(JSON.parse(hookahBowlsSentAsJSON));
    }, [hookahBowls, hookahBowlsSent]);

    return (
        <div className = 'orders'>
            <div className = 'orders__pending'>
                <h1>Awaiting finalization:</h1>
                <div className = 'orders__container' ref = { container1Ref }>
                    {
                        (hookahBowls !== null) ? (hookahBowls.map((e, i) => {
                            return (
                                <HookahBowl key = { i } currentBowl = { e }></HookahBowl>
                            );
                        })) : (<p>Empty</p>)
                    }
                </div>
                <button type = 'button' onClick = { order }>Order</button>
            </div>
            <div className = 'orders__sent'>
                <h1>Awaiting arrival:</h1>
                <div className = 'orders__container' ref = { container2Ref }>
                    {
                        (hookahBowlsSent !== null) ? (hookahBowlsSent.map((e, i) => {
                            return (
                                <HookahBowl key = { i } currentBowl = { e }></HookahBowl>
                            );
                        })) : (<p>Empty</p>)
                    }
                </div>
            </div>
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } orders = { true }></ProfileOverlay>) }
        </div>
    );
}

export default Orders;