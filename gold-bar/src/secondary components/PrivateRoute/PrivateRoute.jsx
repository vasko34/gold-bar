import React from "react";
import { useNavigate } from "react-router-dom";
import { Firebase } from "../../global";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();
  const auth = getAuth(Firebase);
  const [isAuthenticated] = useAuthState(auth);
  
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }
  
  return <Element {...rest}/>;
};

export default PrivateRoute;