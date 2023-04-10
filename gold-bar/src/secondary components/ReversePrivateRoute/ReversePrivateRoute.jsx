import React from "react";
import { useNavigate } from "react-router-dom";
import { Firebase } from "../../global";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ReversePrivateRoute = ({ element: Element, ...rest }) => {
    const [user, setUser] = React.useState(null);
    const [adminStatus, setAdminStatus] = React.useState(null);
    const navigate = useNavigate();
    const db = getFirestore(Firebase);
    const auth = getAuth(Firebase);
    const [isAuthenticated] = useAuthState(auth);
  
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, [auth]);
  
    React.useEffect(() => {
        const getAdminStatus = async () => {
            if (!user) return;
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const adminStatus = userDoc.data().adminStatus;
            setAdminStatus(adminStatus);
        };
        getAdminStatus();
    }, [user]);
  
    const handleNavigation = () => {
        if (adminStatus) {
            navigate("/admin");
        } else {
            navigate("/user");
        }
    };
  
    if ((isAuthenticated) && (adminStatus !== null)) {
        handleNavigation();
        return null;
    }

    return <Element {...rest} />;
};

export default ReversePrivateRoute;