import React from 'react';
import { Firebase } from "../../global";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, deleteDoc, collectionGroup } from "firebase/firestore";
import './orders.css';
import { ProfileOverlay, HookahBowl } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const Orders = () => {
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [hookahBowls, setHookahBowls] = React.useState([]);
    const [hookahBowlsSent, setHookahBowlsSent] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [detector, setDetector] = React.useState(true);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);


    const delBowl = async (bowl) => {
        const querySnapshot = await getDocs(collection(db, "ordersNotSent"));
        if (!querySnapshot.empty) {
            for (const doc of querySnapshot.docs) {
                const docData = doc.data();
                if (docData.username === username) {
                    const orders = JSON.parse(docData.orders);
                    const index = orders.findIndex(e => JSON.stringify(e) === JSON.stringify(bowl));
                    if (index !== -1) {
                        orders.splice(index, 1);
                    }
                    await setDoc(doc.ref, { orders: JSON.stringify(orders) }, { merge: true });
                }
            }
        }
        setDetector(prevDetector => !prevDetector);
    };

    const order = async () => {
        let notSentDocs;
        let sentDocs;
        let docRefNotSent;
        let docRefSent;
        const querySnapshot = await getDocs(collection(db, "ordersNotSent"));
        const querySnapshotSent = await getDocs(collection(db, "ordersSent"));
        if (!querySnapshot.empty) {
            for (const doc of querySnapshot.docs) {
                const docData = doc.data();
                if (docData.username === username) {
                    docRefNotSent = doc.ref
                    notSentDocs = docData.orders
                }
            }
        }
        if (!querySnapshotSent.empty) {
            for (const doc of querySnapshotSent.docs) {
                const docData = doc.data();
                if (docData.username === username) {
                    docRefSent = doc.ref
                    sentDocs = docData.orders
                }
            }
        }
        if (notSentDocs) {
            if (!sentDocs) {
                await setDoc(docRefSent, { orders: notSentDocs }, { merge: true });
            } else {
                const hookahBowlsTemp = JSON.parse(notSentDocs);
                const hookahBowlsSentTemp = JSON.parse(sentDocs);
                const newHookahBowls = hookahBowlsSentTemp.concat(hookahBowlsTemp);
                const newHookahBowlsToJSON = JSON.stringify(newHookahBowls);
                await setDoc(docRefSent, { orders: newHookahBowlsToJSON }, { merge: true });
            }            
            await deleteDoc(docRefNotSent);
        }
        setDetector(prevDetector => !prevDetector);
    };

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

    React.useEffect(() => {
        const getOrders = async () => {
            let bowlsSet = false;
            let bowlsSetSent = false;
            const querySnapshot = await getDocs(collection(db, "ordersNotSent"));
            const querySnapshotSent = await getDocs(collection(db, "ordersSent"));
            if (!querySnapshot.empty) {                
                for (const doc of querySnapshot.docs) {
                    const docData = doc.data();
                    if (docData.username === username) {                        
                        setHookahBowls(JSON.parse(docData.orders));
                        bowlsSet = true;                        
                    }
                }
                if (bowlsSet === false) {
                    setHookahBowls([]);
                }
            }
            if (!querySnapshotSent.empty) {
                for (const doc of querySnapshotSent.docs) {
                    const docData = doc.data();
                    if (docData.username === username) {
                        setHookahBowlsSent(JSON.parse(docData.orders));
                        bowlsSetSent = true;
                    }
                }
                if (bowlsSetSent === false) {
                    setHookahBowlsSent([]);
                }
            }
        };
        getOrders();
    }, [username, detector]);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    };

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    };

    return (
        <div className = 'orders'>
            <div className = 'orders__pending'>
                <h1>Awaiting finalization:</h1>
                <div className = 'orders__container'>
                    {
                        (hookahBowls !== null) ? ((hookahBowls.length > 0) ? (hookahBowls.map((e, i) => {
                            return (
                                <HookahBowl key = { i } currentBowl = { e } del = { true } delBowl = { bowl => delBowl(bowl) }></HookahBowl>
                            );
                        })) : (<p>Empty</p>)) : (<p>Empty</p>)
                    }
                </div>
                <button type = 'button' onClick = { order }>Order</button>
            </div>
            <div className = 'orders__sent'>
                <h1>Awaiting arrival:</h1>
                <div className = 'orders__container'>
                    {
                        (hookahBowlsSent !== null) ? ((hookahBowlsSent.length > 0) ? (hookahBowlsSent.map((e, i) => {
                            return (
                                <HookahBowl key = { i } currentBowl = { e }></HookahBowl>
                            );
                        })) : (<p>Empty</p>)) : (<p>Empty</p>)
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