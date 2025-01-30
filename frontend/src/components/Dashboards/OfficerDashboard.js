import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './officerDashboard.css';

const OfficerDashboard = () => {
    const [officerData, setOfficerData] = useState({ name: '', role: '' });
    const navigate = useNavigate();

    // Load officer data from localStorage (this would normally come from a backend)
    useEffect(() => {
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');

        if (role !== 'officer') {
            navigate('/'); 
        }

        setOfficerData({ name, role });
    }, [navigate]);

    const handleLogout = () => {
        // Clear the local storage on logout
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div className="officer-dashboard">
            <h1>Welcome, Officer {officerData.name}!</h1>
            <p>Role: {officerData.role}</p>

            <div className="dashboard-actions">
                <button onClick={() => navigate('/officer-tasks')} className="action-button">
                    View Tasks
                </button>
                <button onClick={() => navigate('/officer-profile')} className="action-button">
                    View Profile
                </button>
                <button onClick={handleLogout} className="action-button logout-button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default OfficerDashboard;
