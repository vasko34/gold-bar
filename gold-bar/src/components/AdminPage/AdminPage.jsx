import React from 'react';
import { useNavigate } from 'react-router-dom';
import './adminpage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    return (
        <div className = 'adminpage'>
            <h1>Admin</h1>
            <div className = 'boolean_switch'>
                <span onClick = { () => navigate('/') }>Home</span>
                <span onClick = { () => navigate('/user') }>User</span>
            </div>
        </div>
    );
}

export default AdminPage;