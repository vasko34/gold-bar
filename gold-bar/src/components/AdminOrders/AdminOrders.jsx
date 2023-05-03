import React from 'react';
import './adminorders.css';
import { Firebase } from "../../global";
import { getFirestore, getDocs, collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HookahBowl } from '../../secondary components';
import { ProfileOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const AdminOrders = () => {
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [users, setUsers] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [emptyOrders, setEmptyOrders] = React.useState(true);
    const [detector, setDetector] = React.useState(true);
    const auth = getAuth(Firebase);
    const db = getFirestore(Firebase);

    const doneBowl = async (bowl, username) => {
        const querySnapshot = await getDocs(collection(db, "ordersSent"));
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
                    const bowlPlusDate = {
                        hookahBowl: bowl,
                        date: new Date().toLocaleDateString()
                    };
                    const querySnapshot2 = await getDocs(collection(db, "hookahBowlsSold"));
                    if (querySnapshot2.empty) {
                        await addDoc(collection(db, "hookahBowlsSold"), { hookahBowls: JSON.stringify([bowlPlusDate]) });
                    } else {
                        const tempArray = JSON.parse(querySnapshot2.docs[0].data().hookahBowls);
                        tempArray.push(bowlPlusDate);
                        await setDoc(querySnapshot2.docs[0].ref, { hookahBowls: JSON.stringify(tempArray) });
                    }                   
                }
            }
            setEmptyOrders(true);          
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
            const querySnapshot = await getDocs(collection(db, "ordersSent"));
            const data = querySnapshot.docs.map(doc => doc.data());
            const sortedUsers = data.sort((a, b) => {
                const usernameA = a.username.toLowerCase();
                const usernameB = b.username.toLowerCase();
                if (usernameA < usernameB) {
                  return -1;
                }
                if (usernameA > usernameB) {
                  return 1;
                }
                return 0;
            });
            setUsers(sortedUsers);
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
        <div className = 'adminorders'>
            <h1>Orders</h1>
            <div className = 'adminorders__content'>
                { (users !== null) ? ((users.length > 0) ? (users.map(user => {
                    if (JSON.parse(user.orders).length > 0) {
                        if (emptyOrders) {
                            setEmptyOrders(false);
                        }
                        return ( 
                            <div className = 'adminorders__content-table'>
                                <p>{ user.username }</p>
                                { JSON.parse(user.orders).map((e, i) => {
                                    return (
                                        <HookahBowl key = { i } currentBowl = { e } done = { true } delBowl = { (bowl) => doneBowl(bowl, user.username) }></HookahBowl>
                                    );
                                })}
                            </div>                  
                        );
                    }
                    return null;
                })) : null) : null }
                { emptyOrders ? (<p>There are no orders at the moment</p>) : null }
            </div>
            <div className = 'profile' onClick = { openProfileOverlay }>
                <FaUser className = 'profileicon'></FaUser>
                <h3>{ username }</h3>
            </div>
            { toggleProfileOverlay && (<ProfileOverlay close = { closeProfileOverlay } orders = { true }></ProfileOverlay>) }
        </div>
    );
}

export default AdminOrders;