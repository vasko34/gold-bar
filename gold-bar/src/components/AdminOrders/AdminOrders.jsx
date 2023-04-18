import React from 'react';
import './adminorders.css';
import { Firebase } from "../../global";
import { getFirestore, getDocs, collection, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { HookahBowl } from '../../secondary components';
import { ProfileOverlay } from '../../secondary components';
import { FaUser } from 'react-icons/fa';

const AdminOrders = () => {
    const [toggleProfileOverlay, setToggleProfileOverlay] = React.useState(null);
    const [users, setUsers] = React.useState(null);
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
    }, []);

    const openProfileOverlay = () => {
        setToggleProfileOverlay(true);
    }

    const closeProfileOverlay = () => {
        setToggleProfileOverlay(false);
    }

    return (
        <div className = 'adminorders'>
            <h1>Orders</h1>
            <div className = 'adminorders__content'>
                { (users !== null) ? ((users.length > 0) ? (users.map(user => {
                    return ( 
                        <div className = 'adminorders__content-table'>
                            <p>{ user.username }</p>
                            { JSON.parse(user.orders).map((e, i) => {
                                return (
                                    <HookahBowl key = { i } currentBowl = { e }></HookahBowl>
                                );
                            }) }
                        </div>                  
                    );
                })) : (<p>There are no orders at the moment</p>)) : null }
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