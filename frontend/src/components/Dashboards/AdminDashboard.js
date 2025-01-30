import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/appContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS file for styling

const AdminDashboard = () => {
    const { role, userName, logout } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');  // Redirect to home if not admin
        }
    }, [role, navigate]);

    const handleNavigateToContactUs = () => {
        navigate('/contact'); 
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2 className="sidebar-title">Admin Dashboard</h2>
                <ul className="sidebar-links">
                    <li onClick={handleNavigateToContactUs}>Contact Us</li>
                    {/* Add more navigation links here as needed */}
                </ul>
            </div>

            <div className="dashboard-content">
                <h1>Welcome, {userName}!</h1>
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>
        </div>
    );
};

export default AdminDashboard;
